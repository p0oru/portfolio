import { useParams, Link } from 'react-router-dom'
import { marked } from 'marked'
import { usePost } from '../hooks/usePosts'
import styles from './BlogPost.module.scss'

export default function BlogPost() {
  const { slug } = useParams()
  const { post, loading } = usePost(slug)

  if (loading) return <div className="container" style={{ paddingTop: 40, color: 'var(--muted)' }}>Loading…</div>
  if (!post) return <div className="container" style={{ paddingTop: 40 }}><p>Post not found.</p><Link to="/blog" className="btn-ghost">Back</Link></div>

  return (
    <div className="container">
      <article className={styles.article}>
        <Link to="/blog" className={styles.back}>← Blog</Link>
        <div className={styles.meta}>
          <span className={styles.date}>{post.published_at}</span>
          <div className={styles.tags}>
            {(post.tags || []).map((t) => <span key={t} className="chip">{t}</span>)}
          </div>
        </div>
        <h1 className={styles.title}>{post.title}</h1>
        <div className="divider" />
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: marked.parse(post.content || '') }} />
      </article>
    </div>
  )
}
