import type { Metadata } from 'next';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: 'About — Kennedy Auto Sales',
  description: 'Learn about Kennedy Auto Sales — your trusted car dealership in Scarborough, Ontario serving the GTA since 2015.',
};

interface Stat {
  num: string;
  label: string;
}

interface Value {
  title: string;
  desc: string;
}

interface TeamMember {
  name: string;
  role: string;
  img: string;
}

const stats: Stat[] = [
  { num: '12K+', label: 'Vehicles in Stock' },
  { num: '840', label: 'Cars Sold This Month' },
  { num: '38', label: 'Locations Nationwide' },
  { num: '4.9★', label: 'Customer Satisfaction' },
];

const values: Value[] = [
  { title: 'Transparency', desc: 'No hidden fees, no surprise charges. What you see is what you pay — always.' },
  { title: 'Quality', desc: 'Every vehicle passes our 150-point inspection. If it doesn\'t meet our standards, it doesn\'t make the lot.' },
  { title: 'Community', desc: 'Proudly serving Scarborough and the GTA since 2015. We\'re your neighbours, not just a dealership.' },
  { title: 'Convenience', desc: 'From online financing to home delivery, we make car buying fit your schedule — not the other way around.' },
];

const team: TeamMember[] = [
  { name: 'Michael Kennedy', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80' },
  { name: 'Sarah Chen', role: 'Head of Sales', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
  { name: 'David Okafor', role: 'Finance Director', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
  { name: 'Priya Patel', role: 'Service Manager', img: 'https://images.unsplash.com/photo-1580489944761-15a32d82e8d7?auto=format&fit=crop&w=400&q=80' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <section className="subpage-section">
        <div className="subpage-header">
          <span className="section-eyebrow">OUR STORY</span>
          <h1 className="subpage-title">About Kennedy Auto</h1>
          <p className="subpage-subtitle">A family-owned dealership built on trust, quality, and community — serving Scarborough and the GTA since 2015.</p>
        </div>

        <div className="about-story glass-card">
          <p>
            Kennedy Auto Sales started with a simple idea: car buying shouldn&apos;t be stressful. What began as a single lot on Kennedy Road in Scarborough has grown into one of the GTA&apos;s most trusted dealerships, with 38 locations nationwide and 12,000+ vehicles in stock.
          </p>
          <p>
            We believe in transparency, quality, and treating every customer like family. That&apos;s why every vehicle we sell goes through our rigorous 150-point inspection, and why we offer free home delivery across the Greater Toronto Area. Whether you&apos;re buying your first car or your tenth, we&apos;re here to make it easy.
          </p>
        </div>

        <div className="about-stats">
          {stats.map((s, i) => (
            <div key={i} className="about-stat glass-card">
              <span className="about-stat-num">{s.num}</span>
              <span className="about-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="about-section-title">
          <h2>Our Values</h2>
        </div>
        <div className="values-grid">
          {values.map((v, i) => (
            <div key={i} className="value-card glass-card">
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="about-section-title">
          <h2>Meet the Team</h2>
        </div>
        <div className="team-grid">
          {team.map((m, i) => (
            <div key={i} className="team-card glass-card">
              <div className="team-img">
                <img src={m.img} alt={m.name} loading="lazy" decoding="async" />
              </div>
              <h3 className="team-name">{m.name}</h3>
              <span className="team-role">{m.role}</span>
            </div>
          ))}
        </div>

        <div className="about-cta">
          <h2>Visit Our Showroom</h2>
          <p>1425 Kennedy Rd, Kennedy &amp; Ellesmere</p>
          <p>Mon-Sat 9AM-8PM · Sun 11AM-6PM</p>
          <a href="/" className="cta-main-btn">Back to Home →</a>
        </div>
      </section>

      <Footer />
    </>
  );
}
