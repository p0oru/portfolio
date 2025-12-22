## Agentic Food — AI-Assisted Domain Modeling and UCD Workbench

### One‑liner
An end-to-end workbench that turns product understanding into a live domain model. Teams capture Lean Canvas, personas, features, and use cases, then generate entities, types, relationships, DSM matrices, UML positions, and type combinations with AI assistance.

### What this project does
- **UCD workspace**: Lean Canvas sections, user personas, a MoSCoW feature list, external systems, and three dependency matrices:
  - **Functionality–Functionality**, **Actor–Functionality**, **External System–Functionality**
- **Domain modeling**: CRUD for entities, entity types, and relationships with a **Design Structure Matrix (DSM)** and **UML layout persistence**
- **Type combinations at scale**: Generate all entity-type cross products, deduplicate by hash, and use AI to flag “special” vs “impossible” combinations
- **Domain‑level use cases**: Full lifecycle with tabs for General, Actors, Inputs, Output flows and definitions, Preconditions, Postconditions, Triggers, Links, and Feature linkage
- **AI assistance** (Gemini 1.5):
  - Generate Lean Canvas items, personas (with sections), features grouped by MoSCoW, external systems
  - Generate use-case tabs (actors/inputs/output flows+definitions/preconditions/postconditions/triggers) with reasoning
  - Generate/merge a comprehensive domain model directly from UCD and use-case data

## Architecture

### Frontend (React + Vite + Material UI)
- **Routing**: `react-router-dom` with guarded routes; unauthenticated users are redirected to `Login`
- **Screens**
  - `ProjectList` and `ProjectWorkspace` orchestrate UCD, Domain, Domain‑level Use Cases, and Settings tabs
  - Domain tab: `DEContent` (entities), `DETContent` (entity types), `DSMContent`, `TypeCombinations`, `UMLDiagram`
  - UCD tab: `LeanCanvasSections`, `ActorsTab`, `FunctionalityListSections`, `ExternalSystemsTab`, matrices
  - Use case detail: per‑tab editors plus AI‑powered generation actions and reasoning
- **UX**: Modern MUI styling, scrollable tab strips, responsive cards/tables, sticky side navigation, optimistic feedback via snackbars and alerts

### Backend (Node.js + Express + MySQL)
- **Server**: `backend/index.js` with CORS, JSON parsing, request logging, connection pooling
- **Modules**
  - `routes/ucd.js` — projects, sections, personas(+sections), features(+pages), external systems, feedback, matrices
  - `routes/domain.js` — entities, entity types, relationships, DSM relationships, UML positions, AI domain generation and type combinations
  - `routes/domain-usecases.js` — domain‑level use cases (CRUD), actors, inputs, outputs (flows + definitions), preconditions, postconditions, triggers, use case ↔ feature links
  - `routes/auth.js` — JWT auth, password change, admin‑only user management, first‑run admin bootstrap
- **Static SPA**: Serves built frontend (production) from `backend/public`

### Data model (representative tables)
- UCD: `projects`, `project_sections`, `personas`, `persona_sections`, `features`, `feature_pages`, `external_systems`
- Matrices: `feature_feature_dependencies`, `actor_feature_dependencies`, `external_feature_dependencies`
- Domain: `entities`, `entity_types`, `relationships`, `dsm_relationships`, `uml_entity_positions`, `type_combinations`
- Use cases: `domain_level_usecases` and related: `_actors`, `_inputs`, `_output_flows`, `_output_definitions`, `_output_info`, `_links`/`_usecases`, `_preconditions`, `_postconditions`, `_triggers`, `domain_usecase_features`
- Auth: `auth_users`
- Logs/feedback: `ai_generation_logs`, `feedback`

## AI integration
- **Provider**: Google Generative AI (Gemini 1.5 Pro)
- **Prompted generators**
  - Project‑level: Lean Canvas sections, external systems, personas (+Pain Points/Motivations/Key Solutions), MoSCoW‑grouped feature lists
  - Use case‑level: actors, inputs, output flow (+information definitions), preconditions, postconditions, triggers
  - Domain‑level: entire domain model (entities/types/relationships) synthesized from UCD + use‑case data, merged with any uploaded items
  - Type combinations: batch‑labels combinations as “special” or “impossible” with confidence; persisted for review and bulk approval/rejection
- **Resilience**: Batched requests, JSON parsing and sanitization, deduplication via combination hash, upserts for idempotence

## Security & auth
- **JWT** with 7‑day sessions; `Authorization: Bearer <token>` enforced on protected routes
- **Password hashing** with bcrypt; default password enforced to change on first login
- **Roles**: `admin` (create/list/delete users) and `user`
- **Bootstrap**: First run auto‑creates admin: username `admin`, password `domainflow`

## Notable APIs (grouped by module)
- ### Auth (`/api/auth`)
  - `POST /login`, `POST /change-password`, `GET /me`, admin: `GET/POST/DELETE /users`
- ### Projects & UCD (`/api`)
  - Projects CRUD: `/projects`, `/projects/:id`
  - Sections CRUD and per‑item CRUD: `/projects/:id/sections`, `/projects/:id/sections/:sectionId/items`
  - AI: `/projects/:id/lean-canvas/ai-generate`, `/projects/:id/personas/generate`, `/projects/:projectId/features/generate`, `/projects/:projectId/external-systems/ai-generate`
  - Lists: `/projects/:id/personas`, `/projects/:projectId/features`, `/features/pages`, `/projects/:projectId/external-systems`
  - Matrices: feature‑feature, actor‑feature, external‑feature (get/add/delete dependency)
- ### Domain (`/api`)
  - Entities/types/relationships CRUD: `/entities`, `/entities/:id/types`, `/relationships`
  - DSM: `/dsm-relationships`, `/dsm-matrix`
  - UML positions: `GET/POST /uml-positions`, `POST /uml-positions/reset`
  - AI: `/projects/:projectId/domain/ai-generate` (entities/types/relationships), `/generate-type-combinations` with `type_combinations` review endpoints
- ### Domain‑level Use Cases (`/api`)
  - Use cases CRUD: `/projects/:projectId/domain-usecases`, `/domain-usecases/:id`
  - Tabs:
    - Actors: list/add/remove and AI `/domain-usecases/:id/actors/generate`
    - Inputs: CRUD and AI `/domain-usecases/:id/inputs/generate`
    - Outputs: flows CRUD, definitions CRUD, AI `/domain-usecases/:id/outputs/generate`
    - Preconditions/Postconditions: CRUD, AI `/domain-usecases/:id/preconditions|postconditions/generate`
    - Triggers: CRUD, AI `/domain-usecases/:id/triggers/generate`
    - Links & Features: link use case ↔ use case and use case ↔ feature

## Implementation highlights
- **Robust CRUD + AI merge**: Uploaded/manual items are merged with AI output by name and persisted idempotently
- **Scaling combinatorics**: Cartesian products for type combinations are deduped with SHA‑256 hashes and inserted with `INSERT IGNORE` to avoid duplicates
- **Batch AI calls**: Type combination labeling in batches of 100 to balance latency and rate limits
- **UML layout persistence**: Node stores per‑entity coordinates to preserve diagram positioning
- **MySQL pool**: High‑throughput reads/writes via `mysql2/promise` pool with transactions for multi‑step operations

## Tech stack
- **Frontend**: React, Vite, Material UI
- **Backend**: Node.js, Express, Morgan
- **Database**: MySQL (InnoDB)
- **Auth**: JWT + bcrypt
- **AI**: Google Generative AI (Gemini 1.5 Pro)

## How to run
- **Prerequisites**: Node 18+, npm, MySQL
- **Environment (.env in `backend/`)**
  - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` (e.g., DomainFlow)
  - `PORT` (default 4000)
  - `GEMINI_API_KEY`
  - `JWT_SECRET`
- **Backend**
  - `cd backend && npm install && npm start`
- **Frontend**
  - `cd frontend && npm install && npm run dev`
- **Auth table**: Create `auth_users` table (see `AUTHENTICATION_SETUP.md` / `auth_users_table.sql`). First run bootstraps the `admin` user.

## Guided demo (happy path)
1. Create a project with title and description
2. Generate Lean Canvas, personas, external systems, and features with AI
3. Curate items; add dependencies across the three matrices
4. Create domain‑level use cases; link features
5. Use AI to propose Actors, Inputs, Output flow + Definitions, Preconditions, Postconditions, and Triggers per use case
6. Generate the Domain Model from UCD + use cases; review entities, types, relationships
7. Fine‑tune DSM and UML layout; persist positions
8. Generate Type Combinations, filter by AI labels, approve/reject in bulk

## Roadmap ideas
- Granular permissions/teams, audit trails
- Vectorized knowledge grounding for prompts (docs, tickets, telemetry)
- Advanced UML editing and export
- Scenario simulation from triggers through outputs
- PostgreSQL support and Prisma migration layer

### Why it’s portfolio‑worthy
- **Bridges discovery to design**: Connects business understanding to a concrete, navigable domain model
- **Human‑in‑the‑loop AI**: AI proposes; users curate and persist, with full CRUD everywhere
- **Scales with complexity**: Handles combinatorial growth (type combos), batching, and deduplication cleanly
- **Production‑minded**: Auth, roles, pooled DB, SPA hosting, structured logs
