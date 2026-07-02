"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Pagination from "../../components/Pagination";
import { fetchBlogs, type BlogItem } from "../../lib/api";
import { stripTags } from "../../lib/sanitize";

const POSTS_PER_PAGE = 6;

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchBlogs({ limit: 100, sortBy: "published_at", sortOrder: "desc" })
      .then((res) => {
        if (!cancelled) {
          const list = Array.isArray(res) ? res : (res.blogs ?? res.data ?? []);
          list.sort((a, b) => {
            const da = new Date(a.published_at || a.created_at || 0).getTime();
            const db = new Date(b.published_at || b.created_at || 0).getTime();
            return db - da;
          });
          setBlogs(list);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || "Failed to load blogs");
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, []);

  const totalPages = Math.ceil(blogs.length / POSTS_PER_PAGE);
  const paginatedPosts = blogs.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const formatDate = (iso: string | null) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <>
      <Navbar />

      <section className="subpage-section">
        <div className="subpage-header">
          <span className="section-eyebrow">KENNEDY AUTO BLOG</span>
          <h1 className="subpage-title">Insights &amp; Guides</h1>
          <p className="subpage-subtitle">Expert tips, reviews, and dealership news to help you make informed car decisions.</p>
        </div>

        {error && (
          <div className="inv-error-state">
            <p>Failed to load blogs: {error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        )}

        {loading ? (
          <div className="inv-loading-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="inv-card-skeleton">
                <div className="skeleton-img" />
                <div className="skeleton-body">
                  <div className="skeleton-line w-60" />
                  <div className="skeleton-line w-40" />
                  <div className="skeleton-line w-80" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="blog-grid">
            {paginatedPosts.map((post) => (
              <article key={post.id} className="blog-card glass-card">
                <div className="blog-card-img">
                  <img
                    src={post.thumbnail || "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80"}
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
                  <p className="blog-excerpt">{stripTags(post.excerpt || "")}</p>
                  {post.read_time && (
                    <span className="blog-read-time">{post.read_time} min read</span>
                  )}
                  <Link href={`/blogs/${post.slug}`} className="blog-read-more">Read more →</Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && blogs.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </section>

      <Footer />
    </>
  );
}
