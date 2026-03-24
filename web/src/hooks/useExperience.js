import { useState, useEffect } from 'react'
const BASE = import.meta.env.VITE_API_URL || 'https://api.puru.live'
export function useExperience() {
  const [experience, setExperience] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch(`${BASE}/api/public/experience`).then(r => r.json()).then(setExperience).finally(() => setLoading(false))
  }, [])
  return { experience, loading }
}
