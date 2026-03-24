import { useState, useEffect } from 'react'

const BASE = import.meta.env.VITE_API_URL || 'https://api.puru.live'

export function usePosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch(`${BASE}/api/public/posts`).then(r => r.json()).then(setPosts).finally(() => setLoading(false))
  }, [])
  return { posts, loading }
}

export function usePost(slug) {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (!slug) return
    fetch(`${BASE}/api/public/posts/${slug}`).then(r => r.ok ? r.json() : null).then(setPost).finally(() => setLoading(false))
  }, [slug])
  return { post, loading }
}
