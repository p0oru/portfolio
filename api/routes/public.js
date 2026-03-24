const router = require('express').Router()
const { getDb } = require('../db')

function parseJSON(val, fallback) {
  try { return JSON.parse(val) } catch { return fallback }
}

function projectRow(row) {
  return {
    ...row,
    tech_stack: parseJSON(row.tech_stack, []),
    links: parseJSON(row.links, {}),
    featured: Boolean(row.featured),
    visible: Boolean(row.visible),
  }
}

// GET /api/public/projects
router.get('/projects', (req, res) => {
  const rows = getDb()
    .prepare('SELECT * FROM projects WHERE visible = 1 ORDER BY display_order, id')
    .all()
  res.json(rows.map(projectRow))
})

// GET /api/public/projects/:slug
router.get('/projects/:slug', (req, res) => {
  const row = getDb()
    .prepare('SELECT * FROM projects WHERE slug = ? AND visible = 1')
    .get(req.params.slug)
  if (!row) return res.status(404).json({ error: 'Not found' })
  res.json(projectRow(row))
})

// GET /api/public/posts
router.get('/posts', (req, res) => {
  const rows = getDb()
    .prepare('SELECT id, slug, title, excerpt, tags, published_at FROM blog_posts WHERE published = 1 ORDER BY published_at DESC')
    .all()
  res.json(rows.map(r => ({ ...r, tags: parseJSON(r.tags, []) })))
})

// GET /api/public/posts/:slug
router.get('/posts/:slug', (req, res) => {
  const row = getDb()
    .prepare('SELECT * FROM blog_posts WHERE slug = ? AND published = 1')
    .get(req.params.slug)
  if (!row) return res.status(404).json({ error: 'Not found' })
  res.json({ ...row, tags: parseJSON(row.tags, []) })
})

// GET /api/public/experience
router.get('/experience', (req, res) => {
  const rows = getDb()
    .prepare('SELECT * FROM experience ORDER BY display_order, id')
    .all()
  res.json(rows.map(r => ({ ...r, tech_tags: parseJSON(r.tech_tags, []), is_current: Boolean(r.is_current) })))
})

// GET /api/public/education
router.get('/education', (req, res) => {
  const rows = getDb()
    .prepare('SELECT * FROM education ORDER BY display_order, id')
    .all()
  res.json(rows.map(r => ({ ...r, honors: parseJSON(r.honors, []) })))
})

// GET /api/public/skills
router.get('/skills', (req, res) => {
  const rows = getDb()
    .prepare('SELECT * FROM skills ORDER BY category, display_order, id')
    .all()
  // group by category
  const grouped = rows.reduce((acc, r) => {
    if (!acc[r.category]) acc[r.category] = []
    acc[r.category].push(r)
    return acc
  }, {})
  res.json(grouped)
})

// GET /api/public/settings
router.get('/settings', (req, res) => {
  const publicKeys = ['name', 'tagline', 'bio', 'email', 'github_url', 'linkedin_url', 'location', 'open_to_work', 'resume_url']
  const rows = getDb()
    .prepare(`SELECT key, value FROM settings WHERE key IN (${publicKeys.map(() => '?').join(',')})`)
    .all(...publicKeys)
  const result = Object.fromEntries(rows.map(r => [r.key, r.value]))
  res.json(result)
})

module.exports = router
