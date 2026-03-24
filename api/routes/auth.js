const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { getDb } = require('../db')

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { password } = req.body
  if (!password) return res.status(400).json({ error: 'Password required' })

  const db = getDb()
  const row = db.prepare("SELECT value FROM settings WHERE key = 'password_hash'").get()
  if (!row) return res.status(500).json({ error: 'Admin password not configured' })

  if (!bcrypt.compareSync(password, row.value)) {
    return res.status(401).json({ error: 'Wrong password' })
  }

  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' })
  res.json({ token })
})

module.exports = router
