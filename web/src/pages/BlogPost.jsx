import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import matter from 'gray-matter'
import { marked } from 'marked'

export default function BlogPost() {
  const { slug } = useParams()
  const [content, setContent] = useState('')
  const [frontmatter, setFrontmatter] = useState({ title: '', date: '', tags: [] })

  useEffect(() => {
    async function load() {
      const file = await import(`../posts/${slug}.md?raw`).catch(() => null)
      if (!file) return
      const raw = file.default || file
      const { data, content } = matter(raw)
      setFrontmatter(data)
      setContent(marked.parse(content))
    }
    load()
  }, [slug])

  return (
    <div className="container">
      <article className="glass" style={{ padding: 24, borderRadius: 14 }}>
        <h1>{frontmatter.title}</h1>
        {frontmatter.date && (
          <p style={{ color: 'var(--muted)' }}>{new Date(frontmatter.date).toDateString()}</p>
        )}
        <div className="mt-24 neon-divider" />
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          {(frontmatter.tags || []).map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
        <div className="mt-24" dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </div>
  )
}




