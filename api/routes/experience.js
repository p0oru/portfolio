const router = require('express').Router()
const { getDb } = require('../db')

function serialize(row) {
  return { ...row, tech_tags: JSON.parse(row.tech_tags || '[]'), is_current: Boolean(row.is_current) }
}

router.get('/', (req, res) => res.json(getDb().prepare('SELECT * FROM experience ORDER BY display_order, id').all().map(serialize)))

router.post('/', (req, res) => {
  const { company, role, start_date, end_date, is_current, description, tech_tags, type, display_order } = req.body
  const info = getDb().prepare('INSERT INTO experience (company, role, start_date, end_date, is_current, description, tech_tags, type, display_order) VALUES (?,?,?,?,?,?,?,?,?)')
    .run(company, role, start_date, end_date, is_current ? 1 : 0, description, JSON.stringify(tech_tags || []), type || 'work', display_order || 0)
  res.status(201).json(serialize(getDb().prepare('SELECT * FROM experience WHERE id = ?').get(info.lastInsertRowid)))
})

router.put('/:id', (req, res) => {
  const { company, role, start_date, end_date, is_current, description, tech_tags, type, display_order } = req.body
  getDb().prepare('UPDATE experience SET company=?, role=?, start_date=?, end_date=?, is_current=?, description=?, tech_tags=?, type=?, display_order=? WHERE id=?')
    .run(company, role, start_date, end_date, is_current ? 1 : 0, description, JSON.stringify(tech_tags || []), type || 'work', display_order || 0, req.params.id)
  res.json(serialize(getDb().prepare('SELECT * FROM experience WHERE id = ?').get(req.params.id)))
})

router.delete('/:id', (req, res) => {
  getDb().prepare('DELETE FROM experience WHERE id = ?').run(req.params.id)
  res.status(204).end()
})

router.patch('/:id/order', (req, res) => {
  getDb().prepare('UPDATE experience SET display_order = ? WHERE id = ?').run(req.body.display_order, req.params.id)
  res.json({ ok: true })
})

module.exports = router
