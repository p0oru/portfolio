const BASE = import.meta.env.VITE_API_URL || 'https://api.puru.live'

function getToken() {
  return localStorage.getItem('admin_token')
}

async function request(path, options = {}) {
  const token = getToken()
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  })
  if (res.status === 204) return null
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`)
  return data
}

export const api = {
  // Auth
  login: (password) => request('/api/auth/login', { method: 'POST', body: JSON.stringify({ password }) }),

  // Projects
  getProjects: () => request('/api/projects'),
  createProject: (data) => request('/api/projects', { method: 'POST', body: JSON.stringify(data) }),
  updateProject: (id, data) => request(`/api/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProject: (id) => request(`/api/projects/${id}`, { method: 'DELETE' }),

  // Posts
  getPosts: () => request('/api/posts'),
  createPost: (data) => request('/api/posts', { method: 'POST', body: JSON.stringify(data) }),
  updatePost: (id, data) => request(`/api/posts/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletePost: (id) => request(`/api/posts/${id}`, { method: 'DELETE' }),

  // Experience
  getExperience: () => request('/api/experience'),
  createExperience: (data) => request('/api/experience', { method: 'POST', body: JSON.stringify(data) }),
  updateExperience: (id, data) => request(`/api/experience/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteExperience: (id) => request(`/api/experience/${id}`, { method: 'DELETE' }),

  // Education
  getEducation: () => request('/api/education'),
  createEducation: (data) => request('/api/education', { method: 'POST', body: JSON.stringify(data) }),
  updateEducation: (id, data) => request(`/api/education/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteEducation: (id) => request(`/api/education/${id}`, { method: 'DELETE' }),

  // Skills
  getSkills: () => request('/api/skills'),
  createSkill: (data) => request('/api/skills', { method: 'POST', body: JSON.stringify(data) }),
  updateSkill: (id, data) => request(`/api/skills/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteSkill: (id) => request(`/api/skills/${id}`, { method: 'DELETE' }),

  // Media
  getMedia: () => request('/api/media'),
  deleteMedia: (id) => request(`/api/media/${id}`, { method: 'DELETE' }),
  uploadMedia: (file) => {
    const token = getToken()
    const form = new FormData()
    form.append('file', file)
    return fetch(`${BASE}/api/media/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: form,
    }).then(r => r.json())
  },

  // Settings
  getSettings: () => request('/api/settings'),
  updateSettings: (data) => request('/api/settings', { method: 'PUT', body: JSON.stringify(data) }),
  changePassword: (current_password, new_password) =>
    request('/api/settings/password', { method: 'PUT', body: JSON.stringify({ current_password, new_password }) }),
}
