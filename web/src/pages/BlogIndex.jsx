import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import matter from 'gray-matter'

export default function BlogIndex() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function load() {
      // Dynamically import all markdown files in /posts
      const modules = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default' })
      const entries = await Promise.all(
        Object.entries(modules).map(async ([path, loader]) => {
          const raw = await loader()
          const { data } = matter(raw)
          const slug = path.split('/').pop().replace(/\.md$/, '')
          return { slug, ...data }
        })
      )
      // sort by date desc
      entries.sort((a, b) => new Date(b.date) - new Date(a.date))
      setPosts(entries)
    }
    load()
  }, [])

  return (
    <div className="container">
      <h1>Blog</h1>
      <p className="mb-16">Coming soon.</p>
      {/* Keeping dynamic loading ready for future posts, but not showing the list now */}
    </div>
  )
}


