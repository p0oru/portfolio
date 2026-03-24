import { useState, useEffect } from 'react'
const BASE = import.meta.env.VITE_API_URL || 'https://api.puru.live'
export function useSettings() {
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch(`${BASE}/api/public/settings`).then(r => r.json()).then(setSettings).finally(() => setLoading(false))
  }, [])
  return { settings, loading }
}
