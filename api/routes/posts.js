const router = require('express').Router()
const { getDb } = require('../db')

function serialize(row) {
  return { ...row, tags: JSON.parse(row.tags || '[]'), published: Boolean(row.published) }
}

router.get('/', (req, res) => res.json(getDb().prepare('SELECT * FROM blog_posts ORDER BY published_at DESC, id DESC').all().map(serialize)))

router.get('/:id', (req, res) => {
  const row = getDb().prepare('SELECT * FROM blog_posts WHERE id = ?').get(req.params.id)
  if (!row) return res.status(404).json({ error: 'Not found' })
  res.json(serialize(row))
})

router.post('/', (req, res) => {
  const { slug, title, content, excerpt, tags, published, published_at } = req.body
  const info = getDb().prepare('INSERT INTO blog_posts (slug, title, content, excerpt, tags, published, published_at) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .run(slug, title, content, excerpt, JSON.stringify(tags || []), published ? 1 : 0, published_at || null)
  res.status(201).json(serialize(getDb().prepare('SELECT * FROM blog_posts WHERE id = ?').get(info.lastInsertRowid)))
})

router.put('/:id', (req, res) => {
  const { slug, title, content, excerpt, tags, published, published_at } = req.body
  getDb().prepare(`UPDATE blog_posts SET slug=?, title=?, content=?, excerpt=?, tags=?, published=?, published_at=?, updated_at=datetime('now') WHERE id=?`)
    .run(slug, title, content, excerpt, JSON.stringify(tags || []), published ? 1 : 0, published_at || null, req.params.id)
  const row = getDb().prepare('SELECT * FROM blog_posts WHERE id = ?').get(req.params.id)
  if (!row) return res.status(404).json({ error: 'Not found' })
  res.json(serialize(row))
})

router.delete('/:id', (req, res) => {
  getDb().prepare('DELETE FROM blog_posts WHERE id = ?').run(req.params.id)
  res.status(204).end()
})

module.exports = router
