"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CAR_SCALE = 0.97;
const FOOTER_SCALE = 0.5;
const SECTIONS = {
  hero:   { x: 0.5,   y: -0.45, z: 0,    scale: CAR_SCALE   },
  stats:  { x: 2.2,   y: -0.3,  z: 0.55, scale: CAR_SCALE   },
  how:    { x: -2.2,  y:  0.0,  z: 0,    scale: CAR_SCALE   },
  footer: { x: 2.5,   y: -1.3,  z: -2.0, scale: FOOTER_SCALE },
};

function lerp(a, b, t) { return a + (b - a) * t; }
function easeInOut(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }
function depthOffset(y) { return Math.min(0, y) * 0.3; }

export default function CarScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let momentumRAF = null;
    let scrollTriggers = [];

    // ─── RENDERER ───────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.64;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // ─── SCENE & CAMERA ─────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 0, 5.5);

    // ─── REFLECTION ENVIRONMENT ─────────────────────────────────
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;

    // ─── LIGHTING ───────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xfff0dd, 0.55));
    const keyLight = new THREE.DirectionalLight(0xffeedd, 1.6);
    keyLight.position.set(-2, 4, 5);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xf5e8d0, 0.35);
    fillLight.position.set(4, 1, -2);
    scene.add(fillLight);
    scene.add(new THREE.HemisphereLight(0xfff0dd, 0xcfc0ae, 0.4));

    // ─── CONTACT SHADOW PLANE ──────────────────────────────────
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 512; shadowCanvas.height = 512;
    const sctx = shadowCanvas.getContext('2d');

    // Layer 1: wide soft outer falloff
    sctx.save();
    sctx.translate(256, 256);
    sctx.scale(1.6, 1.0);
    const outerGrad = sctx.createRadialGradient(0, 0, 0, 0, 0, 200);
    outerGrad.addColorStop(0, 'rgba(0,0,0,0.35)');
    outerGrad.addColorStop(0.3, 'rgba(0,0,0,0.22)');
    outerGrad.addColorStop(0.6, 'rgba(0,0,0,0.08)');
    outerGrad.addColorStop(1, 'rgba(0,0,0,0)');
    sctx.fillStyle = outerGrad;
    sctx.fillRect(-256, -256, 512, 512);
    sctx.restore();

    // Layer 2: tighter inner core (darker, car-shaped)
    sctx.save();
    sctx.translate(256, 256);
    sctx.scale(1.3, 0.85);
    const innerGrad = sctx.createRadialGradient(0, 0, 0, 0, 0, 140);
    innerGrad.addColorStop(0, 'rgba(0,0,0,0.4)');
    innerGrad.addColorStop(0.4, 'rgba(0,0,0,0.18)');
    innerGrad.addColorStop(0.8, 'rgba(0,0,0,0.04)');
    innerGrad.addColorStop(1, 'rgba(0,0,0,0)');
    sctx.fillStyle = innerGrad;
    sctx.fillRect(-256, -256, 512, 512);
    sctx.restore();

    // Layer 3: dark center under car body
    sctx.save();
    sctx.translate(256, 256);
    sctx.scale(0.9, 0.6);
    const coreGrad = sctx.createRadialGradient(0, 0, 0, 0, 0, 100);
    coreGrad.addColorStop(0, 'rgba(0,0,0,0.3)');
    coreGrad.addColorStop(0.5, 'rgba(0,0,0,0.1)');
    coreGrad.addColorStop(1, 'rgba(0,0,0,0)');
    sctx.fillStyle = coreGrad;
    sctx.fillRect(-256, -256, 512, 512);
    sctx.restore();

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex, transparent: true, depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.15;
    shadowPlane.renderOrder = -1;
    scene.add(shadowPlane);

    function updateShadow() {
      if (!car) return;
      // Offset toward key light direction (left) for realistic directional shadow
      shadowPlane.position.x = car.position.x - 0.2;
      shadowPlane.position.z = car.position.z + 0.1;
      shadowPlane.position.y = car.position.y - 0.65;
      // Shadow grows and softens as car rises
      const heightFactor = 1 + Math.max(0, -car.position.y) * 0.15;
      shadowPlane.scale.set(heightFactor, heightFactor, 1);
    }

    // ─── CAR STATE ─────────────────────────────────────────────
    let car = null;
    let carLoaded = false;
    let baseScale = 1;
    let currentSection = "hero";
    let statsProgress = 0;
    let howProgress = 0;
    let statsAligned = false;
    let howAligned = false;

    // ─── LOAD CAR ──────────────────────────────────────────────
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    function carEntrance() {
      if (!car) return;
      const targetS = baseScale * SECTIONS.hero.scale;
      car.scale.setScalar(targetS * 0.25);

      gsap.to(car.scale, {
        x: targetS, y: targetS, z: targetS,
        duration: 1.3, ease: 'expo.out', delay: 0.5,
        onComplete: () => enableDrag()
      });
      gsap.fromTo(car.position,
        { y: SECTIONS.hero.y - 0.8 },
        { y: SECTIONS.hero.y, duration: 1.3, ease: 'expo.out', delay: 0.5 }
      );
    }

    loader.load('/models/2021_ford_bronco_2-door.glb', (gltf) => {
      car = gltf.scene;

      car.traverse((child) => {
        if (child.isMesh) {
          child.material.transparent = true;
          child.material.opacity = 1;
        }
      });

      const box = new THREE.Box3().setFromObject(car);
      const center = box.getCenter(new THREE.Vector3());
      car.position.sub(center);

      const size = box.getSize(new THREE.Vector3());
      baseScale = 2.4 / Math.max(size.x, size.y, size.z);
      car.scale.setScalar(baseScale * SECTIONS.hero.scale);
      car.position.set(SECTIONS.hero.x, SECTIONS.hero.y, SECTIONS.hero.z);

      scene.add(car);
      carLoaded = true;
      carEntrance();
      ScrollTrigger.refresh();
    }, undefined, (err) => console.error('GLB Error:', err));

    // ─── DRAG PHYSICS ───────────────────────────────────────────
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let velocity = { x: 0, y: 0 };
    const DAMPING = 0.94;
    const BASE_SPEED = 0.003;
    let autoVel = {
      x: (Math.random() - 0.5) * 0.003,
      y: BASE_SPEED + Math.random() * 0.002,
    };

    function enableDrag()  { canvas.classList.add('drag-enabled'); }
    function disableDrag() { canvas.classList.remove('drag-enabled'); }

    function getPos(e) {
      if (e.touches && e.touches.length) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
      return { x: e.clientX, y: e.clientY };
    }

    function onDragStart(e) {
      if (!carLoaded || currentSection !== "hero") return;
      isDragging = true;
      prevMouse = getPos(e);
      velocity = { x: 0, y: 0 };
      if (momentumRAF) cancelAnimationFrame(momentumRAF);
    }
    function onDragMove(e) {
      if (!isDragging || !car) return;
      if (e.cancelable) e.preventDefault();
      const pos = getPos(e);
      velocity.x = (pos.y - prevMouse.y) * 0.006;
      velocity.y = (pos.x - prevMouse.x) * 0.006;
      car.rotation.x += velocity.x;
      car.rotation.y += velocity.y;
      prevMouse = { ...pos };
    }
    function onDragEnd() {
      if (!isDragging) return;
      isDragging = false;
      applyMomentum();
    }
    function applyMomentum() {
      if (!car) return;
      if ((statsProgress > 0.85 && howProgress < 0.15) || (howProgress > 0.85)) {
        velocity = { x: 0, y: 0 };
        return;
      }
      velocity.x *= DAMPING;
      velocity.y *= DAMPING;
      car.rotation.x += velocity.x;
      car.rotation.y += velocity.y;
      if (Math.abs(velocity.x) + Math.abs(velocity.y) > 0.0003) {
        momentumRAF = requestAnimationFrame(applyMomentum);
      } else {
        const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
        if (speed > 0.00005) {
          autoVel = { x: velocity.x / speed * BASE_SPEED, y: velocity.y / speed * BASE_SPEED };
        }
        velocity = { x: 0, y: 0 };
      }
    }

    canvas.addEventListener('mousedown', onDragStart);
    window.addEventListener('mousemove', onDragMove);
    window.addEventListener('mouseup', onDragEnd);
    canvas.addEventListener('touchstart', onDragStart, { passive: false });
    window.addEventListener('touchmove', onDragMove, { passive: false });
    window.addEventListener('touchend', onDragEnd);

    // ─── SCROLL-DRIVEN CAR POSITIONING ─────────────────────────
    function setupScrollCar() {
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: '#stats-section',
          start: 'top bottom', end: 'top top', scrub: 2,
          onUpdate: (self) => {
            if (!car || isDragging) return;
            statsProgress = self.progress;
            const t = self.progress;
            const ly = lerp(SECTIONS.hero.y, SECTIONS.stats.y, easeInOut(t));
            car.position.x = lerp(SECTIONS.hero.x, SECTIONS.stats.x, t);
            car.position.y = ly;
            car.position.z = lerp(SECTIONS.hero.z, SECTIONS.stats.z, t) + depthOffset(ly);
            car.scale.setScalar(lerp(baseScale * SECTIONS.hero.scale, baseScale * SECTIONS.stats.scale, t));
            if (statsProgress > 0.85 && !statsAligned) {
              statsAligned = true;
              gsap.to(car.rotation, { x: 0, y: -0.8, z: 0, duration: 1.2, ease: 'power2.out' });
            }
          },
          onEnter: () => { disableDrag(); currentSection = 'stats'; shadowMat.opacity = 0; },
          onLeaveBack: () => { currentSection = 'hero'; enableDrag(); statsProgress = 0; statsAligned = false; shadowMat.opacity = 1; }
        })
      );

      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: '#how-section',
          start: 'top bottom', end: 'top top', scrub: 2,
          onUpdate: (self) => {
            if (!car || isDragging) return;
            howProgress = self.progress;
            const t = self.progress;
            const ly = lerp(SECTIONS.stats.y, SECTIONS.how.y, easeInOut(t));
            car.position.x = lerp(SECTIONS.stats.x, SECTIONS.how.x, t);
            car.position.y = ly;
            car.position.z = lerp(SECTIONS.stats.z, SECTIONS.how.z, t) + depthOffset(ly);
            car.scale.setScalar(lerp(baseScale * SECTIONS.stats.scale, baseScale * SECTIONS.how.scale, t));
            if (howProgress > 0.85 && !howAligned) {
              howAligned = true;
              gsap.to(car.rotation, { x: 0.20, y: 0.8, z: 0, duration: 1.2, ease: 'power2.out' });
            }
          },
          onEnter:     () => { currentSection = 'how'; },
          onLeaveBack: () => { currentSection = 'stats'; howProgress = 0; howAligned = false; statsAligned = false; if (car) gsap.to(car.rotation, { x: 0, y: -0.8, z: 0, duration: 1.2, ease: 'power2.out' }); shadowMat.opacity = 0; }
        })
      );

      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: '#site-footer',
          start: 'top bottom', end: 'top top', scrub: 2,
          onUpdate: (self) => {
            if (!car || isDragging) return;
            const t = self.progress;
            const ly = lerp(SECTIONS.how.y, SECTIONS.footer.y, easeInOut(t));
            car.position.x = lerp(SECTIONS.how.x, SECTIONS.footer.x, t);
            car.position.y = ly;
            car.position.z = lerp(SECTIONS.how.z, SECTIONS.footer.z, t) + depthOffset(ly);
            car.scale.setScalar(lerp(baseScale * SECTIONS.how.scale, baseScale * SECTIONS.footer.scale, t));
            const fadeT = Math.min(1, t / 0.5);
            const opacity = 1 - easeInOut(fadeT);
            car.traverse((child) => {
              if (child.isMesh) child.material.opacity = opacity;
            });
            shadowMat.opacity = 0;
          },
          onEnter:     () => { currentSection = 'footer'; },
          onLeaveBack: () => { currentSection = 'how'; howAligned = false; if (car) car.traverse((child) => { if (child.isMesh) child.material.opacity = 1; }); }
        })
      );
    }

    // ─── UI ENTRANCE ANIMATIONS ─────────────────────────────────
    const navTL = gsap.timeline({ delay: 0.15 });
    navTL
      .to('.nav-logo',    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.1)
      .to('.nav-links',   { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.15)
      .to('.profile-btn', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.2)
      .to('#ph-badge',    { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out'   }, 0.4)
      .to('#event-card',  { opacity: 1, x: 0, duration: 1.1, ease: 'expo.out'   }, 0.55)
      .to('#hero-text',   { opacity: 1, x: 0, duration: 1.1, ease: 'expo.out'   }, 0.65)
      .to('#nav-arrow',   { opacity: 1,        duration: 0.5, ease: 'power2.out' }, 1.1)
      .to('#sig-wrap',    { opacity: 1, y: 0,  duration: 0.4, ease: 'power2.out' }, 1.2)
      .to('.sp1',         { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' }, 1.2)
      .to('.sp2',         { strokeDashoffset: 0, duration: 1.0, ease: 'power2.inOut' }, 1.8)
      .to('.sp3',         { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, 2.0);

    scrollTriggers.push(
      ScrollTrigger.create({
        trigger: '#stats-section', start: 'top 75%',
        onEnter: () => {
          gsap.to('.stat-card', { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.1, delay: 0.1 });
        }
      })
    );

    scrollTriggers.push(
      ScrollTrigger.create({
        trigger: '#how-section', start: 'top 70%',
        onEnter: () => {
          gsap.to('.step-item', { opacity: 1, x: 0, duration: 0.9, ease: 'expo.out', stagger: 0.15, delay: 0.1 });
        }
      })
    );

    // ─── NAVBAR GLASS ON SCROLL ─────────────────────────────────
    const navEl = document.getElementById('navbar');
    function onScroll() {
      if (navEl) navEl.classList.toggle('scrolled', window.scrollY > 80);
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    // ─── EVENT CARD HOVER ───────────────────────────────────────
    const eventCardEl = document.getElementById('event-card');
    function onCardEnter() {
      gsap.to(eventCardEl, { scale: 1.035, y: -6, duration: 0.55, ease: 'power3.out', overwrite: 'auto' });
    }
    function onCardLeave() {
      gsap.to(eventCardEl, { scale: 1.0, y: 0, duration: 0.55, ease: 'power3.out', overwrite: 'auto' });
    }
    if (eventCardEl) {
      eventCardEl.addEventListener('mouseenter', onCardEnter);
      eventCardEl.addEventListener('mouseleave', onCardLeave);
    }

    // ─── RESIZE ─────────────────────────────────────────────────
    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
    window.addEventListener('resize', onResize);

    // ─── RENDER LOOP ────────────────────────────────────────────
    // Tied to GSAP ticker so ScrollTrigger and WebGL stay in sync.
    function animate() {
      if (car && !isDragging) {
        if ((statsProgress < 0.85 || howProgress > 0.15) && howProgress < 0.85) {
          car.rotation.x += autoVel.x;
          car.rotation.y += autoVel.y;
        }
      }
      updateShadow();
      renderer.render(scene, camera);
    }
    gsap.ticker.add(animate);

    function onLoad() {
      setupScrollCar();
      ScrollTrigger.refresh();
    }
    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad);
    }

    // ─── CLEANUP ────────────────────────────────────────────────
    return () => {
      gsap.ticker.remove(animate);
      if (momentumRAF) cancelAnimationFrame(momentumRAF);
      window.removeEventListener('mousemove', onDragMove);
      window.removeEventListener('mouseup', onDragEnd);
      window.removeEventListener('touchmove', onDragMove);
      window.removeEventListener('touchend', onDragEnd);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onLoad);
      canvas.removeEventListener('mousedown', onDragStart);
      canvas.removeEventListener('touchstart', onDragStart);
      if (eventCardEl) {
        eventCardEl.removeEventListener('mouseenter', onCardEnter);
        eventCardEl.removeEventListener('mouseleave', onCardLeave);
      }
      scrollTriggers.forEach(st => st.kill());
      navTL.kill();
      gsap.killTweensOf('*');
      ScrollTrigger.getAll().forEach(st => st.kill());
      renderer.dispose();
      pmrem.dispose();
      dracoLoader.dispose();
    };
  }, []);

  return <canvas id="hero-canvas" ref={canvasRef} />;
}
