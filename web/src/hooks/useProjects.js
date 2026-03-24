import { useState, useEffect } from 'react'

const BASE = import.meta.env.VITE_API_URL || 'https://api.puru.live'

export function useProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${BASE}/api/public/projects`)
      .then((r) => r.json())
      .then(setProjects)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { projects, loading, error }
}

export function useProject(slug) {
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return
    fetch(`${BASE}/api/public/projects/${slug}`)
      .then((r) => r.ok ? r.json() : Promise.reject(new Error('Not found')))
      .then(setProject)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [slug])

  return { project, loading, error }
}
