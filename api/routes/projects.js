const router = require('express').Router()
const { getDb } = require('../db')

function parseJSON(val, fb) { try { return JSON.parse(val) } catch { return fb } }
function serialize(row) {
  return { ...row, tech_stack: parseJSON(row.tech_stack, []), links: parseJSON(row.links, {}), featured: Boolean(row.featured), visible: Boolean(row.visible) }
}

router.get('/', (req, res) => {
  const rows = getDb().prepare('SELECT * FROM projects ORDER BY display_order, id').all()
  res.json(rows.map(serialize))
})

router.get('/:id', (req, res) => {
  const row = getDb().prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id)
  if (!row) return res.status(404).json({ error: 'Not found' })
  res.json(serialize(row))
})

router.post('/', (req, res) => {
  const { slug, title, tagline, short_desc, long_desc, tech_stack, links, featured, visible, display_order } = req.body
  const stmt = getDb().prepare(`INSERT INTO projects (slug, title, tagline, short_desc, long_desc, tech_stack, links, featured, visible, display_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
  const info = stmt.run(slug, title, tagline, short_desc, long_desc,
    JSON.stringify(tech_stack || []), JSON.stringify(links || {}),
    featured ? 1 : 0, visible !== false ? 1 : 0, display_order || 0)
  const row = getDb().prepare('SELECT * FROM projects WHERE id = ?').get(info.lastInsertRowid)
  res.status(201).json(serialize(row))
})

router.put('/:id', (req, res) => {
  const { slug, title, tagline, short_desc, long_desc, tech_stack, links, featured, visible, display_order } = req.body
  getDb().prepare(`UPDATE projects SET slug=?, title=?, tagline=?, short_desc=?, long_desc=?, tech_stack=?, links=?, featured=?, visible=?, display_order=?, updated_at=datetime('now') WHERE id=?`)
    .run(slug, title, tagline, short_desc, long_desc,
      JSON.stringify(tech_stack || []), JSON.stringify(links || {}),
      featured ? 1 : 0, visible !== false ? 1 : 0, display_order || 0, req.params.id)
  const row = getDb().prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id)
  if (!row) return res.status(404).json({ error: 'Not found' })
  res.json(serialize(row))
})

router.delete('/:id', (req, res) => {
  getDb().prepare('DELETE FROM projects WHERE id = ?').run(req.params.id)
  res.status(204).end()
})

router.patch('/:id/order', (req, res) => {
  const { display_order } = req.body
  getDb().prepare('UPDATE projects SET display_order = ? WHERE id = ?').run(display_order, req.params.id)
  res.json({ ok: true })
})

module.exports = router
