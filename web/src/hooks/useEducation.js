import { useState, useEffect } from 'react'
const BASE = import.meta.env.VITE_API_URL || 'https://api.puru.live'
export function useEducation() {
  const [education, setEducation] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch(`${BASE}/api/public/education`).then(r => r.json()).then(setEducation).finally(() => setLoading(false))
  }, [])
  return { education, loading }
}
