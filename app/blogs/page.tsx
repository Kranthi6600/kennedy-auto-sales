"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Pagination from "../../components/Pagination";
import { blogPosts } from "../../lib/blogData";

const POSTS_PER_PAGE = 6;

export default function BlogsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = blogPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <>
      <Navbar />

      <section className="subpage-section">
        <div className="subpage-header">
          <span className="section-eyebrow">KENNEDY AUTO BLOG</span>
          <h1 className="subpage-title">Insights &amp; Guides</h1>
          <p className="subpage-subtitle">Expert tips, reviews, and dealership news to help you make informed car decisions.</p>
        </div>

        <div className="blog-grid">
          {paginatedPosts.map((post) => (
            <article key={post.id} className="blog-card glass-card">
              <div className="blog-card-img">
                <img src={post.img} alt={post.title} loading="lazy" decoding="async" />
                <span className="blog-category">{post.category}</span>
              </div>
              <div className="blog-card-body">
                <span className="blog-date">{post.date}</span>
                <Link href={`/blogs/${post.id}`} className="blog-title-link">
                  <h3 className="blog-title">{post.title}</h3>
                </Link>
                <p className="blog-excerpt">{post.excerpt}</p>
                <Link href={`/blogs/${post.id}`} className="blog-read-more">Read more →</Link>
              </div>
            </article>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </section>

      <Footer />
    </>
  );
}
