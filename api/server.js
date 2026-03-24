require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const { requireAuth } = require('./middleware/auth')

const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())

// Serve uploads statically
const UPLOADS_PATH = process.env.UPLOADS_PATH || path.join(__dirname, 'uploads')
app.use('/uploads', express.static(UPLOADS_PATH))

// Public routes (no auth)
app.use('/api/public', require('./routes/public'))
app.use('/api/auth', require('./routes/auth'))

// Admin routes (JWT required)
app.use('/api/projects',   requireAuth, require('./routes/projects'))
app.use('/api/posts',      requireAuth, require('./routes/posts'))
app.use('/api/experience', requireAuth, require('./routes/experience'))
app.use('/api/education',  requireAuth, require('./routes/education'))
app.use('/api/skills',     requireAuth, require('./routes/skills'))
app.use('/api/media',      requireAuth, require('./routes/media'))
app.use('/api/settings',   requireAuth, require('./routes/settings'))

// Health check
app.get('/health', (req, res) => res.json({ ok: true }))

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`API listening on port ${PORT}`))
