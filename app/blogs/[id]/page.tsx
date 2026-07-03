"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import JsonLd from "../../../components/JsonLd";
import Seo from "../../../components/Seo";
import { fetchBlogBySlug, fetchBlogs, likeBlog, type BlogDetailItem, type BlogItem } from "../../../lib/api";
import { sanitizeHtml, stripTags } from "../../../lib/sanitize";

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [slug, setSlug] = useState<string>("");
  const [blog, setBlog] = useState<BlogDetailItem | null>(null);
  const [blogSchema, setBlogSchema] = useState<object | null>(null);
  const [breadcrumbSchema, setBreadcrumbSchema] = useState<object | null>(null);
  const [otherBlogs, setOtherBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [liking, setLiking] = useState(false);

  useEffect(() => {
    params.then((p) => setSlug(p.id));
  }, [params]);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchBlogBySlug(slug)
      .then((res) => {
        if (!cancelled) {
          const blogData = res.blog ?? res.data ?? res;
          setBlog(blogData);
          setBlogSchema(res.blog_schema ?? blogData.blog_schema ?? null);
          setBreadcrumbSchema(res.breadcrumb_schema ?? blogData.breadcrumb_schema ?? null);
          setLikeCount(blogData.likes ?? 0);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || "Failed to load blog");
          setLoading(false);
        }
      });
    fetchBlogs({ limit: 100 })
      .then((res) => {
        if (!cancelled) {
          const list = Array.isArray(res) ? res : (res.blogs ?? res.data ?? []);
          setOtherBlogs(list.filter((b) => b.slug !== slug).slice(0, 3));
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [slug]);

  const formatDate = (iso: string | null) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  if (loading || !slug) {
    return (
      <>
        <Navbar />
        <section className="subpage-section">
          <div className="car-detail-loading">
            <div className="car-detail-skeleton">
              <div className="skeleton-img skeleton-large" />
              <div className="skeleton-body">
                <div className="skeleton-line w-60" />
                <div className="skeleton-line w-40" />
                <div className="skeleton-line w-80" />
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  if (error || !blog) {
    return (
      <>
        <Navbar />
        <section className="subpage-section">
          <div className="inv-error-state">
            <p>{error || "Blog post not found."}</p>
            <Link href="/blogs" className="cta-main-btn">Back to Blog →</Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  const handleLike = async () => {
    if (liked || liking || !blog) return;
    setLiking(true);
    try {
      const res = await likeBlog(slug);
      setLiked(true);
      setLikeCount(res.likes ?? likeCount + 1);
    } catch {
    } finally {
      setLiking(false);
    }
  };

  return (
    <>
      <Seo
        title={blog.meta_title || blog.title}
        description={blog.meta_description || blog.excerpt}
        keywords={blog.meta_keywords}
        ogTitle={blog.open_graph_title || blog.title}
        ogDescription={blog.open_graph_description || blog.excerpt}
        ogImage={blog.open_graph_image || blog.thumbnail}
        twitterTitle={blog.twitter_title || blog.title}
        twitterDescription={blog.twitter_description || blog.excerpt}
        twitterImage={blog.twitter_image || blog.thumbnail}
        canonicalUrl={blog.canonical_url || undefined}
        canonicalPath={`/blogs/${slug}`}
        robotsMeta={blog.robots_meta}
      />
      <JsonLd schema={blogSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={blog.faq_schema} />

      <Navbar />

      <div className="blog-detail-layout">
        <aside className="blog-sidebar blog-sidebar-left">
          <div className="blog-sidebar-card glass-card">
            <h3 className="blog-sidebar-title">Quick Links</h3>
            <nav className="blog-toc">
              <a href="#blog-content" className="blog-toc-link">Article</a>
              {blog.faqs && blog.faqs.length > 0 && (
                <a href="#blog-faqs" className="blog-toc-link">FAQs</a>
              )}
              {blog.related_services && blog.related_services.length > 0 && (
                <a href="#blog-related" className="blog-toc-link">Related Services</a>
              )}
              <a href="#blog-share" className="blog-toc-link">Share</a>
            </nav>
          </div>
          <div className="blog-sidebar-card glass-card">
            <h3 className="blog-sidebar-title">Share</h3>
            <div className="blog-sidebar-share">
              <button className="blog-sidebar-share-btn" onClick={() => { navigator.clipboard?.writeText(window.location.href); }}>Copy Link</button>
              <Link href="/blogs" className="blog-sidebar-share-btn">More Articles</Link>
            </div>
          </div>
          <div className="blog-sidebar-card blog-sidebar-cta">
            <h3>Need Help?</h3>
            <p>Visit our showroom or call us for expert advice.</p>
            <Link href="/contact" className="cta-main-btn">Contact Us →</Link>
          </div>
        </aside>

      <article className="blog-detail">
        <div className="blog-detail-header">
          <Link href="/blogs" className="blog-detail-back">← Back to Blog</Link>
          {blog.wehoware_blog_categories && (
            <span className="blog-detail-category">{blog.wehoware_blog_categories.name}</span>
          )}
          <h1 className="blog-detail-title">{blog.title}</h1>
          <div className="blog-detail-meta">
            <div className="blog-detail-info">
              <span>{formatDate(blog.published_at || blog.created_at)}</span>
              {blog.read_time && (
                <>
                  <span className="blog-detail-dot">·</span>
                  <span>{blog.read_time} min read</span>
                </>
              )}
              <span className="blog-detail-dot">·</span>
              <span>{blog.views} views</span>
              <span className="blog-detail-dot">·</span>
              <button
                className={`blog-like-btn ${liked ? 'liked' : ''}`}
                onClick={handleLike}
                disabled={liked || liking}
              >
                {liked ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M12 21s-6.5-4.35-9.5-8.5C.5 9 2 5 5.5 5c2 0 3.5 1.5 4.5 3 1-1.5 2.5-3 4.5-3C18 5 19.5 9 17.5 12.5 14.5 16.65 12 21 12 21z" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                )} {likeCount}
              </button>
            </div>
          </div>
        </div>

        {blog.thumbnail && (
          <div className="blog-detail-hero">
            <img
              src={blog.thumbnail}
              alt={blog.thumbnail_alt || blog.title}
              fetchPriority="high"
              decoding="async"
            />
          </div>
        )}

        {blog.excerpt && (
          <div className="blog-detail-excerpt">
            <p>{stripTags(blog.excerpt)}</p>
          </div>
        )}

        {blog.content && (
          <div
            id="blog-content"
            className="blog-detail-content"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(blog.content) }}
          />
        )}

        {blog.tags && blog.tags.length > 0 && (
          <div className="blog-detail-tags">
            {blog.tags.map((tag) => (
              <span key={tag} className="blog-detail-tag">{tag}</span>
            ))}
          </div>
        )}

        {blog.faqs && blog.faqs.length > 0 && (
          <div id="blog-faqs" className="blog-detail-faqs">
            <h2>Frequently Asked Questions</h2>
            <div className="service-faq-list">
              {blog.faqs.map((faq, i) => (
                <div key={faq.id || i} className="service-faq-item">
                  <button
                    className={`service-faq-q ${openFaq === i ? 'open' : ''}`}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {faq.question}
                    <span className="service-faq-toggle">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  {openFaq === i && (
                    <div className="service-faq-a">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {blog.related_services && blog.related_services.length > 0 && (
          <div id="blog-related" className="blog-detail-related-services">
            <h2>Related Services</h2>
            <div className="service-related-grid">
              {blog.related_services.map((svc) => (
                <Link key={svc.id} href={`/services/${svc.slug}`} className="service-related-card glass-card">
                  {svc.thumbnail && (
                    <img src={svc.thumbnail} alt={svc.title} loading="lazy" decoding="async" />
                  )}
                  <h3>{svc.title}</h3>
                  {svc.description && <p>{stripTags(svc.description)}</p>}
                </Link>
              ))}
            </div>
          </div>
        )}

        {blog.cta_heading && (
          <div className="blog-detail-cta glass-card">
            <h2>{blog.cta_heading}</h2>
            {blog.cta_body && <p>{blog.cta_body}</p>}
            <Link
              href={blog.cta_button_url || "/contact"}
              className="cta-main-btn"
            >
              {blog.cta_button_text || "Get in Touch →"}
            </Link>
          </div>
        )}

        <div id="blog-share" className="blog-detail-share">
          <span className="blog-detail-share-label">Share this article:</span>
          <div className="blog-detail-share-btns">
            <button className="blog-detail-share-btn">Copy Link</button>
            <Link href="/blogs" className="blog-detail-share-btn">More Articles</Link>
          </div>
        </div>
      </article>

        <aside className="blog-sidebar blog-sidebar-right">
          {otherBlogs.length > 0 && (
            <div className="blog-sidebar-card glass-card">
              <h3 className="blog-sidebar-title">More Articles</h3>
              <div className="blog-sidebar-articles">
                {otherBlogs.map((rp) => (
                  <Link key={rp.id} href={`/blogs/${rp.slug}`} className="blog-sidebar-article">
                    {rp.thumbnail && <img src={rp.thumbnail} alt={rp.thumbnail_alt || rp.title} loading="lazy" />}
                    <div>
                      <span className="blog-sidebar-article-date">{formatDate(rp.published_at || rp.created_at)}</span>
                      <h4>{rp.title}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {otherBlogs.length > 0 && (
        <section className="blog-detail-related">
          <h2 className="blog-detail-related-title">Related Articles</h2>
          <div className="blog-grid">
            {otherBlogs.map((rp) => (
              <article key={rp.id} className="blog-card glass-card">
                <div className="blog-card-img">
                  <img
                    src={rp.thumbnail || "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80"}
                    alt={rp.thumbnail_alt || rp.title}
                    loading="lazy"
                    decoding="async"
                  />
                  {rp.wehoware_blog_categories && (
                    <span className="blog-category">{rp.wehoware_blog_categories.name}</span>
                  )}
                </div>
                <div className="blog-card-body">
                  <span className="blog-date">{formatDate(rp.published_at || rp.created_at)}</span>
                  <Link href={`/blogs/${rp.slug}`} className="blog-title-link">
                    <h3 className="blog-title">{rp.title}</h3>
                  </Link>
                  <p className="blog-excerpt">{stripTags(rp.excerpt || "")}</p>
                  <Link href={`/blogs/${rp.slug}`} className="blog-read-more">Read more →</Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
