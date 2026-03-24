import { useState, useEffect } from 'react'
const BASE = import.meta.env.VITE_API_URL || 'https://api.puru.live'
export function useSkills() {
  const [skills, setSkills] = useState({}) // grouped by category
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch(`${BASE}/api/public/skills`).then(r => r.json()).then(setSkills).finally(() => setLoading(false))
  }, [])
  return { skills, loading }
}
