const router = require('express').Router()
const { getDb } = require('../db')

function serialize(row) {
  return { ...row, honors: JSON.parse(row.honors || '[]') }
}

router.get('/', (req, res) => res.json(getDb().prepare('SELECT * FROM education ORDER BY display_order, id').all().map(serialize)))

router.post('/', (req, res) => {
  const { institution, degree, field, start_date, end_date, gpa, honors, display_order } = req.body
  const info = getDb().prepare('INSERT INTO education (institution, degree, field, start_date, end_date, gpa, honors, display_order) VALUES (?,?,?,?,?,?,?,?)')
    .run(institution, degree, field, start_date, end_date, gpa, JSON.stringify(honors || []), display_order || 0)
  res.status(201).json(serialize(getDb().prepare('SELECT * FROM education WHERE id = ?').get(info.lastInsertRowid)))
})

router.put('/:id', (req, res) => {
  const { institution, degree, field, start_date, end_date, gpa, honors, display_order } = req.body
  getDb().prepare('UPDATE education SET institution=?, degree=?, field=?, start_date=?, end_date=?, gpa=?, honors=?, display_order=? WHERE id=?')
    .run(institution, degree, field, start_date, end_date, gpa, JSON.stringify(honors || []), display_order || 0, req.params.id)
  res.json(serialize(getDb().prepare('SELECT * FROM education WHERE id = ?').get(req.params.id)))
})

router.delete('/:id', (req, res) => {
  getDb().prepare('DELETE FROM education WHERE id = ?').run(req.params.id)
  res.status(204).end()
})

module.exports = router
