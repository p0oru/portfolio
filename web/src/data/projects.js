export const projects = [
  {
    slug: 'domainflow',
    title: 'DomainFlow',
    blurb: 'AI‑powered domain modeling and use case documentation platform that transforms business requirements into comprehensive domain models, UML diagrams, and structured use cases.',
    description:
      'DomainFlow is a comprehensive, AI-powered domain modeling and use case documentation platform designed to assist business analysts and software engineers in creating, managing, and visualizing complex domain models, use cases, and system requirements. The application leverages advanced AI models (OpenAI GPT-4o and Google Gemini) to automate the generation of domain entities, relationships, use cases, personas, features, and various documentation artifacts.',
    bullets: [
      'Complete UCD workspace: Lean Canvas sections, personas with AI generation, features with MoSCoW prioritization, and dependency matrices',
      'Domain modeling: Entities, entity types, relationships, DSM matrices, UML diagram visualization with drag-and-drop positioning',
      'Type combinations: Cartesian product generation with AI validation to identify special and impossible combinations',
      'Domain-level use cases: Comprehensive use case documentation with AI-assisted generation of actors, inputs, outputs, preconditions, postconditions, and triggers',
    ],
    sections: [
      {
        title: 'Architecture',
        items: [
          'Frontend: React 18.2.0 + Vite 5.2.0 + Material-UI 5.15.0 with modern UX and optimistic feedback',
          'Backend: Node.js + Express.js 4.18.2 + MySQL 8.0 (AWS RDS) with connection pooling',
          'Data model: 30+ tables supporting UCD, domain modeling, use cases, and AI generation logs',
          'Canvas visualization: Konva.js + React-Konva for interactive UML diagram with persisted positions',
        ],
      },
      {
        title: 'AI Integration',
        items: [
          'OpenAI GPT-4o: Domain model generation, Lean Canvas sections, features (MoSCoW), type combinations validation, external systems',
          'Google Gemini 1.5 Pro: Personas generation, use case components (actors, inputs, outputs, preconditions, postconditions, triggers)',
          'Context-aware generation: Uses project description, existing data, user edit logs, and feedback for intelligent regeneration',
          'Batch processing: Handles 100 type combinations per batch with AI validation and confidence scoring',
        ],
      },
      {
        title: 'Key Features',
        items: [
          'Project-based isolation: Multi-project support with complete data separation',
          'AI generation logging: Comprehensive audit trail of all AI-generated content with reasoning',
          'Upsert logic: Intelligent merging of AI-generated and user-uploaded data',
          'Type combination workflow: Generate → AI validate → User review → Approve/Reject with search and pagination',
        ],
      },
      {
        title: 'Security & Auth',
        items: [
          'JWT authentication with 7-day expiration and bcrypt password hashing (10 rounds)',
          'Role-based access control: Admin and User roles with protected routes',
          'Password change enforcement for new users on first login',
          'Admin user management: Create, delete users with self-protection (admins cannot delete themselves)',
        ],
      },
      {
        title: 'Database Design',
        items: [
          'MySQL 8.0 on AWS RDS (ap-south-1) with utf8mb4 character set',
          'Foreign key constraints with cascade deletes for data integrity',
          'Strategic indexes on foreign keys and frequently queried columns',
          'JSON storage for flexible data structures (persona sections, type combinations)',
          'Project isolation: All tables include project_id for multi-tenancy',
        ],
      },
      {
        title: 'API Architecture',
        items: [
          '100+ RESTful endpoints organized by feature (auth, projects, UCD, domain, use cases)',
          'Consistent error handling with proper HTTP status codes',
          'Protected routes via authenticateToken middleware',
          'Admin-only endpoints with requireAdmin middleware',
        ],
      },
      {
        title: 'Why it's portfolio‑worthy',
        items: [
          'Demonstrates full-stack expertise: Complete application from database design to UI',
          'Advanced AI integration: Successfully integrated multiple AI models with context-aware generation',
          'Complex data modeling: Designed and implemented sophisticated relational database schema with 30+ tables',
          'Production-ready: Security, performance optimizations, error handling, and comprehensive logging',
        ],
      },
    ],
    tech: ['React', 'Vite', 'Material-UI', 'Konva.js', 'Node.js', 'Express', 'MySQL', 'AWS RDS', 'OpenAI GPT-4o', 'Google Gemini 1.5 Pro', 'JWT', 'bcrypt'],
    links: { github: '', live: '' },
    cover: '',
  },
  {
    slug: 'stayora',
    title: 'Stayora',
    blurb: 'Real-time hotel intelligence platform with AI-powered analytics, natural language querying, and role-specific dashboards for luxury hotels.',
    description:
      'Stayora is a comprehensive, real-time hotel intelligence platform that transforms raw operational data into actionable, role-specific insights. The platform serves luxury hotels by providing AI-powered analytics, natural language querying, and multi-dimensional data visualization. Processes real luxury hotel data (CHF 45M+ annual revenue properties) and supports multiple properties with hotel-specific data isolation.',
    bullets: [
      'Multi-role dashboard system: 6 unique role-specific dashboards (GM, Owner, Finance, Commercial, F&B, Marketing) with real-time KPI cards and interactive charts',
      'AI-powered chat: Text-to-SQL conversion with role-aware query generation, RAG over hotel metrics with date-aware context expansion, and review insights via semantic search',
      'Hybrid database architecture: MySQL for structured metrics + ChromaDB vector store for semantic search and RAG',
      'Real-time data processing: Live updates as events occur (check-ins, bookings, cancellations) with efficient aggregation',
    ],
    sections: [
      {
        title: 'Architecture',
        items: [
          'Frontend: React 18.3.1 + Vite 5.3.1 + TailwindCSS 3.4.4 + Recharts 2.15.3',
          'Backend: Node.js + Express.js 4.19.2 + MySQL2 3.10.1 with connection pooling',
          'Vector database: ChromaDB 1.5.7 (Dockerized on AWS EC2) for semantic search and RAG',
          'Python service: FastAPI microservice for review search with separate ChromaDB collection',
        ],
      },
      {
        title: 'AI/ML Integration',
        items: [
          'OpenAI GPT-4o: Text-to-SQL conversion with role-aware prompts, chat responses with RAG, natural language summaries',
          'Embeddings (text-embedding-ada-002): Document embeddings for ChromaDB, batch processing (1000 items per batch)',
          'RAG implementation: Two-step retrieval (initial search + date-based context expansion), GPT-4o synthesis with conversation history',
          'Review insights: Python FastAPI service with ChromaDB for guest review semantic search and sentiment analysis',
        ],
      },
      {
        title: 'Data Processing Pipeline',
        items: [
          'File upload: Accepts CSV/XLSX files via Multer middleware with validation',
          'Data transformation: Converts metrics to document format with hotel_id context and consistent date formatting',
          'Embedding generation: Batch processing (1000 items) with OpenAI embeddings API, error handling and retries',
          'ChromaDB storage: Creates/updates collections, upserts documents with embeddings and metadata for filtering',
        ],
      },
      {
        title: 'Dashboard Features',
        items: [
          'Time range filtering: Daily, weekly, monthly, 6-monthly, yearly with efficient SQL aggregation',
          'Role-specific KPIs: Customized metrics per role (GM: operational, Finance: P&L, Owner: portfolio, etc.)',
          'Interactive charts: Line, bar, and pie charts using Recharts with real-time data updates',
          'Date-specific queries: Select specific dates for historical analysis',
        ],
      },
      {
        title: 'Security & Authentication',
        items: [
          'Google OAuth 2.0: Passport.js with Google OAuth20 strategy for seamless authentication',
          'Session management: Express sessions with MySQL store, 24-hour duration, HttpOnly cookies',
          'Role-based access control: 8 roles (superadmin, gm, finance, owner, asset_manager, commercial, corporate, user)',
          'Route protection: Middleware for authentication and role-based authorization',
        ],
      },
      {
        title: 'Database Design',
        items: [
          'Core tables: users, hotels, daily_metrics, marketing_metrics, fnb_metrics, prompt_library',
          'Daily metrics: 20+ operational metrics (occupancy, ADR, RevPAR, GOP, EBITDA, sentiment, etc.)',
          'Unique constraints: hotel_id + date combinations prevent duplicates',
          'Indexing strategy: Date-based queries optimized with strategic indexes',
        ],
      },
      {
        title: 'Performance Optimizations',
        items: [
          'Connection pooling: MySQL connection pool for efficient database access',
          'Batch processing: Embedding generation in batches of 1000 items',
          'Query optimization: Efficient SQL queries with proper indexing',
          'Frontend optimizations: React.memo, code splitting, lazy loading, request debouncing',
        ],
      },
      {
        title: 'Why it's portfolio‑worthy',
        items: [
          'Production-ready platform: Handles real luxury hotel data (CHF 45M+ annual revenue)',
          'Hybrid architecture: Successfully combines relational (MySQL) and vector (ChromaDB) databases',
          'Advanced AI integration: Multiple AI use cases (text-to-SQL, RAG, semantic search) with context awareness',
          'Role-based system: Flexible authorization with 6 unique role-specific dashboards and personalized experiences',
        ],
      },
    ],
    tech: ['React', 'Vite', 'TailwindCSS', 'Recharts', 'Node.js', 'Express', 'MySQL', 'ChromaDB', 'OpenAI GPT-4o', 'FastAPI', 'Python', 'Passport.js', 'OAuth', 'Docker', 'AWS EC2'],
    links: { github: '', live: '' },
    cover: '',
  },
  {
    slug: 'whatsapp-rag',
    title: 'WhatsApp RAG — Fully Local Retrieval‑Augmented Generation on Windows',
    blurb:
      'Private, fully local Q&A over WhatsApp chats: parser → chunker → embeddings → Chroma → optional reranker → llama.cpp LLM → Gradio UI with inline citations.',
    description:
      'End‑to‑end local RAG system for WhatsApp group chat exports. Parses raw logs to JSONL, builds a Chroma vector index with local embeddings, optionally reranks with a local cross‑encoder, and answers with a local LLM. Nothing leaves the machine. Tested on Windows 10/11 with RTX 4060 (8GB VRAM).',
    bullets: [
      'Accurate WhatsApp parser with Unicode‑safe timestamps, system‑message filtering, and multi‑line merging',
      'Conversational chunking that preserves topic coherence and tracks inline citations',
      'Local embeddings (BAAI/bge‑large‑en‑v1.5) + ChromaDB persistence; optional cross‑encoder reranking',
      'Local LLM via llama‑cpp‑python (Llama 3.1 8B GGUF) with grounded, cited answers in 2–3 sentences',
    ],
    sections: [
      {
        title: 'Architecture',
        items: [
          'Data: WhatsApp .txt → normalized JSONL (one message per line)',
          'Indexing: JSONL → conversational chunks → embeddings → Chroma persistent store (citations in metadata)',
          'Retrieval: embed query → retrieve top‑k → optional cross‑encoder rerank',
          'Generation: grounded prompt → local LLM answers concisely with inline citations',
          'Presentation: Gradio UI with citations list and collapsible top contexts',
        ],
      },
      {
        title: 'Data Pipeline & Parsing',
        items: [
          'Regex handles M/D/YY(YY), 12‑hour am/pm, Unicode thin/nb spaces, varied dash styles',
          'Skips system messages (E2EE, created/added/removed, icon/subject changes, joins, etc.)',
          'Multi‑line handling: lines without timestamps append to previous message',
          'Normalization: dates → MM/DD/YY; times → H:MM AM/PM; sender aliasing and exclusions',
          'Output: JSONL with date, time, sender, text',
        ],
      },
      {
        title: 'Indexing & Vector Store',
        items: [
          'Chunking favors same‑sender runs; ~2000 chars / ~500 tokens hard limits',
          'Embeddings: SentenceTransformers BAAI/bge‑large‑en‑v1.5 (cosine; normalized vectors)',
          'Chroma PersistentClient (HNSW, cosine); anonymized telemetry disabled',
          'Stores citations in metadata; batched add/delete to avoid duplicates',
          'Controls: --limit_messages, --limit_chunks, --batch_size, --chunk_chars, --chunk_tokens, --recreate, --dry_run, --chroma_batch_size',
        ],
      },
      {
        title: 'Retrieval & Answering',
        items: [
          'Top‑k retrieval (default 6) with same embedder; optional rerank via cross‑encoder/ms‑marco‑MiniLM‑L‑6‑v2',
          'Instruction enforces grounded, 2–3 sentence answers with inline citations or explicit “don’t know”',
          'Local inference via llama‑cpp‑python (configurable ctx, gpu_layers, temperature)',
          'Output cleaned to remove repetition; “Answer”, “Citations”, and collapsible “Top Contexts” sections',
        ],
      },
      {
        title: 'UI & CLI',
        items: [
          'Gradio app: question input, Markdown answer+citation output, minor CSS for readability',
          'CLI mode: --cli and --query for one‑shot or interactive Q&A with context previews',
          'Run: parse → ingest → start app at http://127.0.0.1:7860',
        ],
      },
      {
        title: 'Setup (Windows)',
        items: [
          'Python 3.10/3.11, CUDA 12.1/12.2, VS Build Tools, Git, latest NVIDIA driver',
          'Install requirements; install PyTorch and llama‑cpp‑python matching CUDA',
          'Models via huggingface‑cli into models/llm, models/embed, models/reranker',
          'Steps: 1) Parse chat → index/parsed_messages.jsonl  2) Ingest → index/chroma  3) Run Gradio app',
        ],
      },
      {
        title: 'Why it’s portfolio‑worthy',
        items: [
          'Fully local by design: privacy‑first with no network calls during retrieval/inference',
          'Robust WhatsApp parsing, coherent conversational chunking, and end‑to‑end citation surfacing',
          'Runs comfortably on 8GB VRAM GPUs; deterministic formatting and transparent verification UX',
        ],
      },
    ],
    tech: [
      'Python',
      'ChromaDB',
      'SentenceTransformers',
      'BAAI/bge‑large‑en‑v1.5',
      'Cross‑Encoder ms‑marco‑MiniLM‑L‑6‑v2',
      'llama‑cpp‑python',
      'Llama 3.1 8B GGUF',
      'Gradio',
      'CUDA 12.1/12.2',
      'NVIDIA RTX',
    ],
    links: { github: '', live: '' },
    cover: '',
  },
]

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug)
}


