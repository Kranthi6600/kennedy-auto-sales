"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchBlogs, type BlogItem } from '../lib/api';
import { stripTags } from '../lib/sanitize';

function formatDate(iso: string | null) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function HomeBlogs() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchBlogs({ limit: 3, sortBy: 'published_at', sortOrder: 'desc' })
      .then((res) => {
        if (!cancelled) {
          const list = Array.isArray(res) ? res : (res.blogs ?? res.data ?? []);
          list.sort((a, b) => {
            const da = new Date(a.published_at || a.created_at || 0).getTime();
            const db = new Date(b.published_at || b.created_at || 0).getTime();
            return db - da;
          });
          setBlogs(list.slice(0, 3));
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <section className="home-blogs-section" id="home-blogs">
        <div className="home-blogs-header">
          <span className="section-eyebrow">LATEST ARTICLES</span>
          <h2 className="home-blogs-heading">Auto Insights &amp; Guides</h2>
        </div>
        <div className="home-blogs-grid">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="blog-card glass-card">
              <div className="blog-card-img" style={{ background: 'rgba(0,0,0,0.04)' }} />
              <div className="blog-card-body">
                <div style={{ height: '0.8rem', width: '40%', background: 'rgba(0,0,0,0.06)', borderRadius: 4, marginBottom: '0.75rem' }} />
                <div style={{ height: '1.3rem', width: '80%', background: 'rgba(0,0,0,0.08)', borderRadius: 4, marginBottom: '0.5rem' }} />
                <div style={{ height: '0.9rem', width: '90%', background: 'rgba(0,0,0,0.04)', borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (blogs.length === 0) return null;

  return (
    <section className="home-blogs-section" id="home-blogs">
      <div className="home-blogs-header">
        <span className="section-eyebrow">LATEST ARTICLES</span>
        <h2 className="home-blogs-heading">Auto Insights &amp; Guides</h2>
        <Link href="/blogs" className="home-blogs-view-all">View All →</Link>
      </div>
      <div className="home-blogs-grid">
        {blogs.map((post) => (
          <article key={post.id} className="blog-card glass-card">
            <div className="blog-card-img">
              <img
                src={post.thumbnail || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80'}
                alt={post.thumbnail_alt || post.title}
                loading="lazy"
                decoding="async"
              />
              {post.wehoware_blog_categories && (
                <span className="blog-category">{post.wehoware_blog_categories.name}</span>
              )}
            </div>
            <div className="blog-card-body">
              <span className="blog-date">{formatDate(post.published_at || post.created_at)}</span>
              <Link href={`/blogs/${post.slug}`} className="blog-title-link">
                <h3 className="blog-title">{post.title}</h3>
              </Link>
              <p className="blog-excerpt">{stripTags(post.excerpt || '')}</p>
              {post.read_time && (
                <span className="blog-read-time">{post.read_time} min read</span>
              )}
              <Link href={`/blogs/${post.slug}`} className="blog-read-more">Read more →</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
