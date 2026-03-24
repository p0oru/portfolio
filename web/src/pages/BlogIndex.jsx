import { Link } from 'react-router-dom'
import { usePosts } from '../hooks/usePosts'
import styles from './BlogIndex.module.scss'

export default function BlogIndex() {
  const { posts, loading } = usePosts()

  return (
    <div className="container">
      <div className={styles.header}>
        <h1>Blog</h1>
        <p className={styles.sub}>Notes on what I'm learning and building</p>
      </div>
      {loading ? <p style={{ color: 'var(--muted)' }}>Loading…</p> : posts.length === 0 ? (
        <p style={{ color: 'var(--muted)' }}>No posts yet.</p>
      ) : (
        <div className={styles.list}>
          {posts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className={styles.card}>
              <div className={styles.meta}>
                <span className={styles.date}>{post.published_at}</span>
                <div className={styles.tags}>
                  {(post.tags || []).map((t) => <span key={t} className="chip">{t}</span>)}
                </div>
              </div>
              <h2 className={styles.title}>{post.title}</h2>
              {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
