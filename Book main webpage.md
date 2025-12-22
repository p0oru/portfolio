## Hemant Jha Learning Platform — Project Summary

### Executive Summary
An end-to-end learning and content platform that blends editorial content (articles, videos, reels, podcasts) with structured learning (courses and live courses), an AI assistant for context-aware discovery, and a personalization engine that generates customized book chapters based on user preferences. The system comprises a Node.js/Express backend, a React SPA frontend, a MySQL database, AWS S3 for media, and LLM integrations (OpenAI, Gemini, Groq) with ChromaDB for semantic search.

### Key Capabilities
- **Content hub**: Articles, videos, reels, podcasts with categories, search, and bookmarking.
- **Learning**: On-demand courses and live courses (detail, payment flow, registration complete page).
- **AI assistant**: Context-aware chat using GPT-4o augmented with vector search over article content (ChromaDB).
- **Personalized book**: AI-powered book customization and chapter generation tailored to a user’s profile and learning goals.
- **Admin console**: Web-based management for content, courses, live courses, categories, users, comments, books, and analytics.
- **Rich media uploads**: Large media files handled via multer + AWS S3 with increased limits.
- **Notifications & email**: Centralized email service (Zoho SMTP) and notification utilities.

---

## Architecture Overview
- **Frontend**: React SPA with React Router, role-based route guards, and a responsive layout optimized for mobile.
- **Backend**: Express API with layered controllers/services, JWT auth middleware, cache-busting headers, and static serving of the SPA build.
- **Database**: MySQL (mysql2 pool) for users, content, relationships, and AI chat history.
- **Storage**: AWS S3 for media asset storage and retrieval.
- **AI & Search**:
  - OpenAI (GPT-4o) for AI chat and content generation.
  - Google Gemini and Groq (Llama 3) available for admin-triggered generation flows.
  - ChromaDB for vector search over article embeddings to ground AI responses.

### High-Level Flow
- Users authenticate via Google (Firebase on the client), the backend issues a JWT. The frontend stores the app token and includes it in API calls.
- The React app consumes REST endpoints to browse content, enroll in courses, chat with the AI assistant, and manage bookmarks.
- For AI chat, the backend queries ChromaDB for relevant articles, appends context to the prompt, and uses GPT-4o to generate grounded responses. Interactions are stored in `ai_chat_history`.
- Admins manage content via a protected dashboard that calls privileged API routes.

---

## Backend (Node.js/Express)
Location: `Backend/src`

### Core
- Entry: `server.js` starts HTTP server; `app.js` wires middleware, cache headers, request size limits, static serving, and API routes.
- Middleware: `cors`, `morgan`, strict cache control headers, increased body limits (`750mb`) for media-heavy operations.
- Auth: `middleware/AuthMiddleware.js` verifies application JWTs; selective role checks for admin/reviewer access.

### Notable Modules
- Controllers/Services for: Articles, Videos, Reels, Podcasts, Categories, Bookmarks, Users, Courses, Live Courses, Notifications, Books, and Customized Books.
- Media uploads: `routes/Media.js` uses `multer.memoryStorage` and uploads to AWS S3 with a 750MB file limit, protected by JWT.
- AI chat: `controllers/AiChatController.js` uses OpenAI (GPT-4o), consults `ChromaService` for relevant articles, and persists chat history to MySQL.
- Vector search: `services/ChromaService.js` with `config/chromaConfig.js`; a migration utility exists in `utils/migrateArticlesToChroma.js`.
- Email: `utils/emailService.js` centralizes SMTP via Zoho for transactional messaging.

### Selected API Surface (non-exhaustive)
- Users: `POST /api/users/login` (Google identity → app JWT), `GET /api/users/my-courses`
- Articles: `GET /api/articles`, `GET /api/articles/categories`, admin CRUD under `/api/admin`
- Videos/Reels/Podcasts: Public listings and detail pages; admin CRUD variants
- Bookmarks: `GET/POST/DELETE /api/bookmarks` (JWT protected)
- Courses: `GET /api/courses` (public); player endpoints under auth
- Live Courses: `GET /api/live-courses` (public listing), `GET /api/live-courses/:id`
- Categories/Summary: `GET /api/summary`, `GET /api/summary/search`, `GET /api/admin/categories`
- Media: `POST /api/media/...` S3 operations (JWT protected)
- AI Chat: `POST /api/ai-chat/send` (returns AI response + suggested articles)
- Books (Personalization): Routes for original/customized book flows and chapter generation (JWT protected; admin/reviewer gated endpoints where applicable)

Note: Admin routes are mounted under `/api/admin/*` and protected via JWT + role checks in controllers/route guards.

---

## Frontend (React SPA)
Location: `frontend/src`

### App Shell & Routing
- `App.js` defines routes and a layout with top header, bottom navbar, and an adaptive menu.
- Route wrappers:
  - `ProtectedRoute` and `UserAuthWrapper` for authenticated pages.
  - `AdminOnlyRoute` for admin-only surfaces (e.g., courses authoring).
  - `GuestPromptWrapper` for gently gating content while allowing exploration.

### Major Pages
- Public: Home, Resources, Articles (list/detail/by category), Videos (list/detail/by category), Reels, Podcasts, Public Profile, Marathon Profile.
- Authenticated: Settings, My Bookmarks, My Courses, AI Chat, Book Preview, Customized Book (and generated chapter routes).
- Live Courses: Public detail + payment flow and a registration complete page.

### Admin Console
- `AdminPage` hosts a responsive sidebar navigation with groups: Content, Courses, Users, and Other.
- Managers: Articles, Raw Thoughts (with AI-assisted conversion), Videos, Reels, Podcasts, Books, Courses, Live Courses, Categories, Users, Comments.
- Dashboard surfaces stats and monthly analytics; uses environment-configured API base URL.

### Frontend API Layer
- `utils/api.js` builds an Axios instance with dynamic base URL resolution (supports local dev, same-origin in prod), attaches the app JWT, and adds cache-busting to GET requests.

---

## AI & Personalization
- **AI Assistant (GPT-4o)**: Chat endpoint takes the user’s query, searches ChromaDB for relevant articles, injects results as context, and generates a grounded response. The UI renders message bubbles and clickable article suggestions.
- **Admin AI Generation**: Admin can programmatically generate content ideas/outlines using providers (Gemini, Groq, OpenAI) depending on selection.
- **Personalized Book**: Users fill in profile preferences and goals; the backend orchestrates AI chapter generation and maintains an original vs customized view with navigation and comments. The UI provides a preview, customization progress, and chapter generation pages.

---

## Data & Integrations
- **Database**: MySQL via `mysql2` pool. Example tables include: `users`, `articles`, `videos`, `reels`, `podcasts`, `categories`, `bookmarks`, `courses`, `live_courses`, `ai_chat_history`, plus book/customization tables.
- **Storage**: AWS S3 for media. Uploads are JWT-protected and use memory buffering then S3 PUT with UUID-based keys.
- **Email**: Zoho SMTP for transactional emails (e.g., registration confirmations, test emails from admin dashboard).
- **Auth**: Client uses Firebase Google sign-in; server issues and validates its own JWT for API access. Role-based checks present for admin/reviewer flows.
- **Vector DB**: ChromaDB stores embeddings for articles; used to retrieve top-k relevant content for grounding AI responses.
- **LLM Providers**: OpenAI (GPT-4o) for chat and generation; Gemini and Groq available in admin generation endpoints.

---

## Security & Reliability
- **JWT auth** for protected routes; role checks for admin-only operations.
- **Cache-busting headers** applied globally to mitigate stale asset/API caching issues.
- **CORS** enabled; frontend attaches tokens via Axios interceptor.
- **Upload limits** tuned for large media (750MB); AWS S3 offloads storage from the app server.
- Recommended operational practices (deployment dependent): Rate limiting, WAF, key rotation, secret storage via environment/secret manager.

---

## Performance & Scalability
- Horizontal scaling of stateless API nodes behind a load balancer; shared MySQL and S3.
- Heavy media upload path streams to S3; static frontend assets are served by Express with caching disabled for correctness.
- Vector search offloaded to a dedicated ChromaDB service.

---

## Local Development
1. Backend
   - `cd Backend`
   - `npm install`
   - Create `.env` (see Variables below)
   - `node src/server.js` (or use `nodemon`)
2. Frontend
   - `cd frontend`
   - `npm install`
   - Create `.env` for the SPA (e.g., `REACT_APP_API_BASE_URL`)
   - `npm start`

### Environment Variables (reference)
- Backend (`Backend/.env`)
  - Database: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
  - App: `PORT`, `JWT_SECRET`
  - AWS/S3: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `S3_BUCKET_NAME`
  - AI: `OPENAI_API_KEY`, `GEMINI_API_KEY`, `GROQ_API_KEY`
  - Integrations: `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`, `LINKEDIN_REDIRECT_URI`, `YOUTUBE_CLIENT_ID`, `YOUTUBE_CLIENT_SECRET`, `YOUTUBE_REDIRECT_URI`
  - Email (Zoho): `ZOHO_EMAIL_USER`, `ZOHO_EMAIL_PASS`, `ZOHO_SENDER_NAME`, `ZOHO_SMTP_HOST`, `ZOHO_SMTP_PORT`
  - Vector DB: `CHROMA_HOST`, `CHROMA_PORT`, `CHROMA_SSL`
  - Frontend URL: `FRONTEND_URL`
- Frontend (`frontend/.env`)
  - `REACT_APP_API_BASE_URL` (optional; falls back to same-origin/localhost)

---

## Notable Implementations
- **Grounded AI chat**: Retrieval-augmented generation pipeline using ChromaDB top-k results to reduce hallucinations and make responses actionable with links.
- **Personalized content generation**: Multi-provider (OpenAI/Gemini/Groq) support to generate outlines, chapters, and articles tailored to user profiles.
- **Admin productivity**: Rich, mobile-aware admin console with managers for each content type and combined analytics on the dashboard.
- **Media pipeline**: Large, memory-backed uploads with UUID keys and S3 object storage; suitable for high-fidelity video and audio.

---

## What I Built/Owned
- End-to-end architecture and implementation of the React SPA + Express API.
- AI assistant integration (prompting, RAG with ChromaDB, persistence of chat history).
- Personalized book generation flow and corresponding UI/UX.
- Admin console with content orchestration, analytics, and media management.
- Dev experience and deployment scripts; cache-busting/static serving strategy.

---

## Future Enhancements
- Add per-route rate limiting and audit logging.
- Migrate to streaming uploads/direct-to-S3 presigned URLs to reduce app server memory usage for very large files.
- Background jobs for AI generation and media processing (e.g., via a worker queue) to improve responsiveness.
- Expand test coverage and add E2E tests for admin workflows and AI chat.
- Observability (structured logging, tracing, dashboards) and autoscaling guidance.

---

## Screenshots (placeholders)
- Home and Resources
- Admin Dashboard and Managers
- AI Chat and Suggested Articles
- Book Preview and Customized Chapter Generation
- Live Course Detail and Payment Flow


