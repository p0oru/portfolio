const router = require('express').Router()
const bcrypt = require('bcryptjs')
const { getDb } = require('../db')

router.get('/', (req, res) => {
  const rows = getDb().prepare('SELECT key, value FROM settings').all()
  const result = Object.fromEntries(rows.filter(r => r.key !== 'password_hash').map(r => [r.key, r.value]))
  res.json(result)
})

router.put('/', (req, res) => {
  const db = getDb()
  const upsert = db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)")
  const upsertMany = db.transaction((pairs) => {
    for (const [k, v] of pairs) {
      if (k === 'password_hash') continue // not settable via bulk update
      upsert.run(k, String(v))
    }
  })
  upsertMany(Object.entries(req.body))
  res.json({ ok: true })
})

router.put('/password', (req, res) => {
  const { current_password, new_password } = req.body
  const db = getDb()
  const row = db.prepare("SELECT value FROM settings WHERE key = 'password_hash'").get()
  if (!row || !bcrypt.compareSync(current_password, row.value)) {
    return res.status(401).json({ error: 'Current password is wrong' })
  }
  const hash = bcrypt.hashSync(new_password, 10)
  db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES ('password_hash', ?)").run(hash)
  res.json({ ok: true })
})

module.exports = router
