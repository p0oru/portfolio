## Stayora — AI-Powered Hospitality Analytics Platform

A full‑stack platform that turns hotel operational data and guest reviews into actionable insights using GenAI, vector search, and role‑aware dashboards. Built with React, Node.js/Express, MySQL, ChromaDB, and a Python FastAPI microservice for review retrieval.

### Why it matters
- **Decision acceleration**: Converts natural‑language questions into SQL and narrative answers for GMs, Owners, and Finance teams.
- **Evidence‑based insights**: Uses RAG over hotel metrics and guest reviews to ground AI responses in your own data.
- **Operational visibility**: Role‑specific dashboards surface KPIs, trends, and exceptions.

### Product highlights
- **AI Text‑to‑SQL assistant**: Natural language → safe SELECT SQL → live MySQL → narrative summary.
- **AI contextual chat (RAG)**: Vector search over hotel metrics and events in ChromaDB; context expansion by relevant dates before prompting the LLM.
- **Review insights**: FastAPI service retrieves top‑K similar guest reviews and synthesizes findings.
- **Role‑aware dashboards**: GM, Owner, F&B, Marketing views; superadmin can simulate roles.
- **Prompt Library**: Curated, searchable prompts by category to jump‑start analysis.
- **Data upload pipeline**: Upload CSV/XLSX/JSON to populate normalized SQL tables (daily metrics, F&B, marketing).
- **User & Hotel admin**: Superadmin manages user roles and hotel collections; adds properties and seeds vector stores.
- **Google SSO**: OAuth 2.0 login with session management and MySQL session store.

### Architecture
```mermaid
graph TD
  A[Frontend<br/>React + Vite + Tailwind] -->|HTTPS (cookies)| B[Backend API<br/>Node.js + Express]
  B --> C[(MySQL)]
  B --> D[(ChromaDB)]
  B --> E[OpenAI API]
  B --> F[Review Search API<br/>FastAPI]
  F --> D

  subgraph Admin
    G[User Management]
    H[Hotel Management]
    I[Data Upload]
  end
  A -->|Role‑based routes| G
  A --> H
  A --> I
```

### Core features in detail
- **Text‑to‑SQL workflow**
  - Validates user prompt; crafts SQL prompt with explicit schema and role context.
  - Generates a single read‑only SELECT using OpenAI `gpt-4o`.
  - Executes via MySQL; if rows exist, requests a narrative summary from the LLM.
  - Returns human‑readable insights back to chat.

- **RAG over hotel data**
  - Metrics and events are transformed into natural language facts and embedded (`text-embedding-ada-002`).
  - Stored in ChromaDB collections per hotel (`hotel-<hotelId>`).
  - Query flow expands context by unique dates from initial hits, then composes a constrained system prompt for the LLM.

- **Review intelligence**
  - Python FastAPI service indexes `reviews_cleaned.jsonl` into ChromaDB.
  - Given a question, embeds it, retrieves top‑K reviews, and returns both a summary and citations.
  - Node backend can proxy this service or the frontend can call it directly in development.

- **Role‑aware dashboards**
  - GM: occupancy, ADR, RevPAR, revenue vs expenses, labor %, guest sentiment, daily briefings.
  - Owner: MTD GOP/EBITDA, revenue vs budget, YoY placeholders, asset snapshot.
  - F&B and Marketing routes return aggregated trends and KPIs over configurable ranges.

- **Admin tooling**
  - User Management: list users, update roles (superadmin‑only).
  - Hotel Management: add hotels; creates or reuses Chroma collections.
  - Data Upload: multi‑file CSV/XLSX/JSON ingest to `daily_metrics` with upsert semantics.

### Notable engineering choices
- **Safety guardrails**: Only `SELECT` queries from Text‑to‑SQL are executed; others are rejected.
- **Session‑based auth**: Google OAuth via Passport; MySQL‑backed `express-session` for persistence.
- **Context expansion for RAG**: Uses date‑based expansion to capture surrounding facts for better answers.
- **Scalable ingestion**: Batch embeddings; consistent doc IDs and metadata for traceability.

### Tech stack
- **Frontend**: React 18, Vite, React Router, Recharts, Tailwind CSS.
- **Backend**: Node.js, Express, Passport (Google OAuth), MySQL (mysql2), Multer, CSV/XLSX parsers, OpenAI SDK, ChromaDB client.
- **AI/Vector**: OpenAI `gpt-4o` (chat) and `text-embedding-ada-002` (embeddings), ChromaDB.
- **Review service**: Python, FastAPI, ChromaDB, OpenAI.
- **Infra**: AWS guide for hosting ChromaDB on EC2; local dev via Docker or native.

### Key API routes
- Auth: `GET /auth/google`, `GET /auth/google/callback`, `GET /auth/current_user`, `GET /auth/logout`
- Users (superadmin): `GET /api/users`, `PUT /api/users/:id/role`
- Hotels (superadmin): `GET /api/hotels`, `POST /api/hotels`, `DELETE /api/hotels/:hotelId/data`
- Data Upload: `POST /api/data/upload` (multipart: CSV/XLSX/JSON)
- Prompts: `GET /api/prompts?category=&search=` (authenticated)
- Dashboard: `GET /api/dashboard[?role=gm|owner|...]`, `GET /api/dashboard/dates`
- Text‑to‑SQL: `POST /api/query/sql`
- AI Chat (RAG): `POST /api/ai/query`
- Review Insights: `POST /api/ai/review-insights` or direct `GET http://127.0.0.1:8000/search_reviews`

### Database highlights
- `users`: Google SSO identities with roles (`superadmin`, `gm`, `finance`, `owner`, `asset_manager`, `commercial`, `corporate`, `user`).
- `hotels`: canonical properties; `hotel_id` ties to ChromaDB collections.
- `daily_metrics`: normalized operational metrics with `(hotel_id, date)` basis.
- `marketing_metrics`, `fnb_metrics`: domain‑specific aggregates with unique `(hotel_id, date)`.
- `prompt_library`: curated prompts by category; surfaced in the chat UI.

### Frontend experience
- Protected routes via a `PrivateRoute` component and an `AuthContext` that checks `/auth/current_user`.
- Sidebar + TopNav layout, responsive, with modern micro‑interactions.
- Pages:
  - Dashboard with KPIs, charts, table, calendar picker, and role simulation (for superadmin).
  - AI Chat with Prompt Library and a Review Insights tab with inline citations.
  - Admin: User Management, Hotel Management, Data Upload.
  - CMI page (prototype) demonstrating additional analytics components.

### Environment configuration
- Backend `.env` (examples)
  - `PORT=5000`
  - `SESSION_SECRET=...`
  - `DB_HOST=...`, `DB_USER=...`, `DB_PASSWORD=...`, `DB_NAME=...`
  - `GOOGLE_CLIENT_ID=...`, `GOOGLE_CLIENT_SECRET=...`
  - `OPENAI_API_KEY=...`
  - `CHROMADB_HOST=http://localhost:8000`
- Frontend `.env`
  - `VITE_BACKEND_URL=http://localhost:5000`
- Review service `.env`
  - `OPENAI_API_KEY=...`
  - `CHROMADB_HOST=http://localhost:8000`
  - `CHROMA_COLLECTION=hotel_reviews`
  - `REVIEWS_FILE=reviews_cleaned.jsonl`

### Local development
- Backend: `cd stayora-backend && npm install && npm run dev`
- Frontend: `cd stayora-frontend && npm install && npm run dev`
- Review service: `python stayora-backend/review_search_service.py` (requires `fastapi`, `uvicorn`, `chromadb`, `openai`, `python-dotenv`, `tqdm`)
- ChromaDB: local Docker (`docker run -p 8000:8000 chromadb/chroma`) or use the AWS EC2 guide in `aws-setup/`.

### Deployment notes
- ChromaDB on AWS EC2 with persistent volume and open port 8000 (see `aws-setup/README.md`).
- Configure `CHROMADB_HOST` to the EC2 IP or domain.
- Consider HTTPS, IP allow‑listing, and cost monitoring via AWS Budgets.

### Security and privacy
- Google OAuth with session cookies; CORS configured for the frontend origin.
- Server‑side RBAC guards admin routes.
- Text‑to‑SQL executes only `SELECT` statements to avoid mutation.
- No sensitive fields are returned from `/auth/current_user`.

### What I’d improve next
- Add streaming responses for chat.
- Expand dashboards for Finance and Commercial roles.
- Add unit/integration tests and CI.
- Introduce background jobs for scheduled data ingestion and re‑indexing.
- Move to managed MySQL (e.g., RDS) and containerize all services with docker‑compose.

### Repository map
- `stayora-frontend/`: React app (Auth, Dashboard, Chat, Admin pages, CMI prototype).
- `stayora-backend/`: Express API (Auth, Users, Hotels, Data, Prompts, Dashboard, Query, AI controllers).
- `stayora-backend/review_search_service.py`: Review retrieval and summarization service.
- `aws-setup/`: EC2 bootstrap scripts and migration helpers for ChromaDB.
- `chroma_data/`: Local ChromaDB artifacts for development.

### Screenshots or demo
Add a short loom/video and 2–4 screenshots: Login, Dashboard (GM), AI Chat with an example prompt + response (with citations), Admin → Data Upload.


