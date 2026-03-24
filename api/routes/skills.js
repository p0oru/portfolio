const router = require('express').Router()
const { getDb } = require('../db')

router.get('/', (req, res) => res.json(getDb().prepare('SELECT * FROM skills ORDER BY category, display_order, id').all()))

router.post('/', (req, res) => {
  const { category, name, icon_name, proficiency, display_order } = req.body
  const info = getDb().prepare('INSERT INTO skills (category, name, icon_name, proficiency, display_order) VALUES (?,?,?,?,?)')
    .run(category, name, icon_name, proficiency || 3, display_order || 0)
  res.status(201).json(getDb().prepare('SELECT * FROM skills WHERE id = ?').get(info.lastInsertRowid))
})

router.put('/:id', (req, res) => {
  const { category, name, icon_name, proficiency, display_order } = req.body
  getDb().prepare('UPDATE skills SET category=?, name=?, icon_name=?, proficiency=?, display_order=? WHERE id=?')
    .run(category, name, icon_name, proficiency || 3, display_order || 0, req.params.id)
  res.json(getDb().prepare('SELECT * FROM skills WHERE id = ?').get(req.params.id))
})

router.delete('/:id', (req, res) => {
  getDb().prepare('DELETE FROM skills WHERE id = ?').run(req.params.id)
  res.status(204).end()
})

module.exports = router
