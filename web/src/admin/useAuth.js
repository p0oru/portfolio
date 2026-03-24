import { useState, useCallback } from 'react'
import { api } from './api'

export function useAuth() {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token'))

  const login = useCallback(async (password) => {
    const data = await api.login(password)
    localStorage.setItem('admin_token', data.token)
    setToken(data.token)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('admin_token')
    setToken(null)
  }, [])

  return { isAuthenticated: Boolean(token), login, logout }
}
