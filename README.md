# Puru Singh — Portfolio

Personal portfolio site running on a Raspberry Pi 5, self-hosted with a full backend API and analytics.

**Live:** [puru.live](https://puru.live)

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, Vite 7, React Router DOM 7, Framer Motion, SCSS Modules |
| Backend | Node.js, Express, better-sqlite3, JWT auth |
| Infrastructure | Raspberry Pi 5, Docker Compose, Cloudflare Tunnel |
| Analytics | Self-hosted Umami |

---

## Project Structure

```
portfolio/
├── web/                  # React frontend
│   ├── src/
│   │   ├── pages/        # Route components (Home, Projects, Blog, etc.)
│   │   ├── components/   # Layout, ProjectCard
│   │   ├── hooks/        # Data fetching hooks (useProjects, usePosts, etc.)
│   │   └── styles/       # global.scss (design tokens)
│   └── index.html
├── api/                  # Express backend
│   ├── routes/           # public, projects, posts, experience, education, skills, media, settings
│   ├── middleware/        # JWT verification
│   ├── db.js             # SQLite schema + init
│   └── index.js          # Entry point
└── README.md
```

---

## Frontend Pages

| Route | Page |
|---|---|
| `/` | Home — hero, featured projects |
| `/projects` | All projects grid |
| `/projects/:slug` | Project detail with markdown |
| `/blog` | Blog post list |
| `/blog/:slug` | Blog post with markdown |
| `/about` | Bio, contact, skills |
| `/skills` | Skills by category |
| `/resume` | Experience + education timeline |

---

## Backend API

Base URL: `https://api.puru.live`

### Public Routes (no auth)

```
GET  /api/public/projects         All visible projects
GET  /api/public/projects/:slug   Single project
GET  /api/public/posts            Published blog posts (no content, just metadata)
GET  /api/public/posts/:slug      Full post with content
GET  /api/public/experience       Work/experience entries
GET  /api/public/education        Education entries
GET  /api/public/skills           Skills grouped by category
GET  /api/public/settings         Public profile settings (name, bio, links, etc.)
```

### Settings Keys

| Key | Description |
|---|---|
| `name` | Your name |
| `tagline` | One-liner under your name |
| `bio` | About page bio (markdown supported) |
| `email` | Contact email |
| `github_url` | GitHub profile URL |
| `linkedin_url` | LinkedIn profile URL |
| `location` | City / location string |
| `open_to_work` | `"true"` or `"false"` |
| `resume_url` | Link to resume PDF |

---

## Local Development

### Frontend

```bash
cd web
npm install
npm run dev        # dev server on :3000
npm run build      # production build → dist/
npm run preview    # preview the production build
npm run lint       # ESLint
```

### Backend

```bash
cd api
npm install
npm run dev        # Express server on :4000
```

Set the following environment variables (or create `api/.env`):

```env
JWT_SECRET=your_secret_here
ADMIN_PASSWORD=your_password
DB_PATH=./portfolio.db
UPLOADS_PATH=./uploads
UPLOADS_URL_BASE=http://localhost:4000/uploads
```

---

## Infrastructure

### Services

| URL | Service | Port |
|---|---|---|
| `puru.live` | Portfolio (Nginx → React dist) | 3000 |
| `api.puru.live` | Express API | 4000 |
| `metrics.puru.live` | Umami analytics | 3001 |
| `watch.puru.live` | Jellyfin media server | 8096 |
| `upload.puru.live` | File Browser | 8080 |
| `share.puru.live` | Pingvin Share | 3002 |

All services run in Docker on a Raspberry Pi 5 and are exposed via a Cloudflare Tunnel (no open ports required).

### Auto-Deploy

Every push to `main` triggers an automatic deploy:

```
git push origin main
  → GitHub webhook → Pi
  → git pull && npm install && npm run build
  → Nginx serves updated dist/
```

### Docker Compose

All services are defined in `~/media-server/docker-compose.yml` on the Pi. To manage:

```bash
cd ~/media-server

docker compose ps                     # list running services
docker compose logs portfolio-api     # logs for API
docker compose restart portfolio-api  # restart a service
docker compose pull && docker compose up -d  # update images
```

### Manual Deploy (if auto-deploy fails)

```bash
ssh admin@<pi-ip>
cd ~/portfolio
git pull
cd web && npm install && npm run build
```

### Cloudflare Tunnel

Config lives at `/etc/cloudflared/config.yml` on the Pi. To add a new subdomain:

1. Add an ingress rule to the config:
   ```yaml
   - hostname: newservice.puru.live
     service: http://localhost:PORT
   ```
2. Add a CNAME in Cloudflare DNS pointing to the tunnel
3. Restart: `sudo systemctl restart cloudflared`
