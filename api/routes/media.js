const router = require('express').Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { getDb } = require('../db')

const UPLOADS_PATH = process.env.UPLOADS_PATH || path.join(__dirname, '../uploads')
const UPLOADS_URL_BASE = process.env.UPLOADS_URL_BASE || 'http://localhost:4000/uploads'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync(UPLOADS_PATH, { recursive: true })
    cb(null, UPLOADS_PATH)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`)
  },
})

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } })

router.get('/', (req, res) => {
  res.json(getDb().prepare('SELECT * FROM media ORDER BY created_at DESC').all())
})

router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' })
  const url_path = `${UPLOADS_URL_BASE}/${req.file.filename}`
  const info = getDb().prepare('INSERT INTO media (filename, original_name, mime_type, size_bytes, url_path) VALUES (?,?,?,?,?)')
    .run(req.file.filename, req.file.originalname, req.file.mimetype, req.file.size, url_path)
  res.status(201).json(getDb().prepare('SELECT * FROM media WHERE id = ?').get(info.lastInsertRowid))
})

router.delete('/:id', (req, res) => {
  const row = getDb().prepare('SELECT * FROM media WHERE id = ?').get(req.params.id)
  if (row) {
    const filePath = path.join(UPLOADS_PATH, row.filename)
    fs.unlink(filePath, () => {}) // ignore missing file
    getDb().prepare('DELETE FROM media WHERE id = ?').run(req.params.id)
  }
  res.status(204).end()
})

module.exports = router
