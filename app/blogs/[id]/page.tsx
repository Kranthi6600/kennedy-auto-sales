import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { blogPosts, getPostById, getRelatedPosts } from '../../../lib/blogData';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ id: String(post.id) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = getPostById(Number(id));
  if (!post) return { title: 'Post Not Found — Kennedy Auto Sales' };
  return {
    title: `${post.title} — Kennedy Auto Sales`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { id } = await params;
  const post = getPostById(Number(id));
  if (!post) notFound();

  const related = getRelatedPosts(post.id);

  return (
    <>
      <Navbar />

      <article className="blog-detail">
        <div className="blog-detail-header">
          <Link href="/blogs" className="blog-detail-back">← Back to Blog</Link>
          <span className="blog-detail-category">{post.category}</span>
          <h1 className="blog-detail-title">{post.title}</h1>
          <div className="blog-detail-meta">
            <div className="blog-detail-author">
              <div className="blog-detail-avatar">{post.author.charAt(0)}</div>
              <div className="blog-detail-author-info">
                <span className="blog-detail-author-name">{post.author}</span>
                <span className="blog-detail-author-role">{post.authorRole}</span>
              </div>
            </div>
            <div className="blog-detail-info">
              <span>{post.date}</span>
              <span className="blog-detail-dot">·</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        <div className="blog-detail-hero">
          <img src={post.img} alt={post.title} fetchPriority="high" decoding="async" />
        </div>

        <div className="blog-detail-content">
          {post.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="blog-detail-share">
          <span className="blog-detail-share-label">Share this article:</span>
          <div className="blog-detail-share-btns">
            <button className="blog-detail-share-btn">Copy Link</button>
            <Link href="/blogs" className="blog-detail-share-btn">More Articles</Link>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="blog-detail-related">
          <h2 className="blog-detail-related-title">Related Articles</h2>
          <div className="blog-grid">
            {related.map((rp) => (
              <article key={rp.id} className="blog-card glass-card">
                <div className="blog-card-img">
                  <img src={rp.img} alt={rp.title} loading="lazy" decoding="async" />
                  <span className="blog-category">{rp.category}</span>
                </div>
                <div className="blog-card-body">
                  <span className="blog-date">{rp.date}</span>
                  <Link href={`/blogs/${rp.id}`} className="blog-title-link">
                    <h3 className="blog-title">{rp.title}</h3>
                  </Link>
                  <p className="blog-excerpt">{rp.excerpt}</p>
                  <Link href={`/blogs/${rp.id}`} className="blog-read-more">Read more →</Link>
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
