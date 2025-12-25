export const projects = [
  {
    slug: 'domainflow',
    title: 'DomainFlow',
    blurb: 'Turn business ideas into production-ready domain models. An AI-powered workbench that bridges the gap between product vision and technical architecture.',
    description:
      'Ever wondered how to transform a product idea into a complete domain model? DomainFlow solves that problem. Starting with Lean Canvas and user personas, the platform uses AI to generate entities, relationships, UML diagrams, and comprehensive use cases—all while keeping you in control. Think of it as having an AI pair programmer that understands both business requirements and software architecture.',
    bullets: [
      'Start with business: Capture Lean Canvas sections, user personas, and feature lists with MoSCoW prioritization—all with AI assistance',
      'Generate domain models: AI analyzes your requirements and suggests entities, relationships, and type combinations automatically',
      'Visualize everything: Interactive UML diagrams with drag-and-drop positioning that persist your layout preferences',
      'Complete use cases: AI generates actors, inputs, outputs, preconditions, and triggers—then learns from your edits to improve',
    ],
    sections: [
      {
        title: 'Built With Modern Tech',
        items: [
          'React 18 + Vite for lightning-fast development and optimized production builds',
          'Material-UI components for a polished, professional interface with smooth animations',
          'Konva.js canvas rendering for interactive UML diagrams that feel native',
          'Node.js + Express backend serving a production-ready SPA with connection pooling',
          'MySQL on AWS RDS with a carefully designed schema spanning 30+ interconnected tables',
        ],
      },
      {
        title: 'AI That Actually Learns',
        items: [
          'Dual AI approach: GPT-4o handles domain modeling and type validation, while Gemini 1.5 Pro excels at persona and use case generation',
          'Context-aware generation: The system remembers your edits and uses them to improve future suggestions',
          'Smart batch processing: Validates hundreds of type combinations efficiently, flagging special cases and impossible scenarios',
          'Intelligent merging: Seamlessly combines AI suggestions with manual edits using sophisticated upsert logic',
        ],
      },
      {
        title: 'Production-Ready Features',
        items: [
          'Multi-project support: Complete data isolation so teams can work on multiple projects simultaneously',
          'Comprehensive audit trail: Every AI generation is logged with reasoning, making it easy to track changes',
          'Type combination workflow: Generate all possibilities → AI validates → You review → Approve or reject with full search capabilities',
          'Visual persistence: Your UML diagram layouts are saved, so you never lose your work',
        ],
      },
      {
        title: 'Security & Scalability',
        items: [
          'JWT-based authentication with secure session management and bcrypt password hashing',
          'Role-based access control: Admins can manage users while maintaining data security',
          'RESTful API design: 100+ endpoints organized logically with consistent error handling',
          'Database optimization: Strategic indexing and foreign key constraints ensure data integrity and query performance',
        ],
      },
      {
        title: 'Technical Highlights',
        items: [
          'Handled complex combinatorial problems: Type combinations can explode exponentially—solved with efficient cartesian product generation',
          'Hybrid data storage: Relational tables for structured data, JSON columns for flexible persona sections and type combinations',
          'Real-time canvas interactions: Implemented drag-and-drop with position persistence using Konva.js and React state management',
          'AI prompt engineering: Crafted prompts that produce consistent, structured outputs from both GPT-4o and Gemini',
        ],
      },
      {
        title: "Why This Matters",
        items: [
          'Solves a real problem: Transforms weeks of manual domain modeling into hours of AI-assisted work',
          'Full-stack showcase: From database schema design to interactive UI components, demonstrates end-to-end capabilities',
          'Advanced AI integration: Successfully orchestrated multiple AI models with different strengths for optimal results',
          'Production mindset: Built with security, performance, and maintainability from day one—not a prototype',
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
        title: "Why it's portfolio‑worthy",
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
    slug: 'rce-engine',
    title: 'RCE Engine',
    blurb: 'Production-grade platform for securely executing user-submitted code in isolated Docker containers. Built with modern microservices architecture, demonstrating enterprise-level patterns for handling untrusted code while maintaining robust security, observability, and scalability.',
    description:
      'The RCE Engine is a production-ready platform for securely executing user-submitted code in isolated Docker containers. Built with modern microservices architecture, it demonstrates enterprise-level patterns for handling untrusted code while maintaining robust security, observability, and scalability. Features include multi-layer security (12 distinct layers), real-time observability with Prometheus and Grafana, and support for Python 3.9 and JavaScript (Node 18).',
    bullets: [
      'Multi-layer security: 12 distinct security mechanisms including network isolation, resource limits, capability dropping, ephemeral containers, and static code analysis',
      'Microservices architecture: Nginx gateway, Node.js API, Go execution worker, Python analysis worker, Redis queue, MongoDB storage',
      'Full observability stack: cAdvisor → Prometheus → Grafana with real-time container metrics, CPU/memory tracking, and service health monitoring',
      'Production-ready: Ephemeral containers with hard resource limits (128MB memory, 0.5 CPU, 5s timeout), complete network isolation, and automatic cleanup',
    ],
    sections: [
      {
        title: 'Architecture',
        items: [
          'Gateway: Nginx Alpine reverse proxy with rate limiting and SSL termination',
          'Frontend: React 18 + Vite + TypeScript with Monaco code editor and real-time polling UI',
          'API Gateway: Node.js 22 + Express + TypeScript for REST API, job submission, and validation',
          'Queue: Redis 7 for job queue using producer/consumer pattern with BRPOP',
          'Execution: Go 1.23 + Docker SDK for ephemeral container orchestration with strict security',
          'Analysis: Python 3.9 + FastAPI for static code analysis via AST/regex patterns',
          'Database: MongoDB 7 for persistent storage of jobs and results',
          'Observability: Prometheus + cAdvisor for metrics, Grafana for dashboards and alerting',
        ],
      },
      {
        title: 'Security Architecture',
        items: [
          'Network isolation: Complete network isolation (NetworkDisabled: true) for all sandbox containers',
          'Resource limits: 128MB memory hard limit (no swap), 0.5 CPU cores, max 50 PIDs to prevent fork bombs',
          'Execution timeout: 5 second hard timeout with automatic container termination',
          'Capability dropping: All Linux capabilities dropped, no setuid/setgid execution, no-new-privileges security option',
          'Ephemeral containers: AutoRemove enabled, no persistent state between executions, fresh environment per job',
          'Non-root execution: All services run as non-root users, minimal Alpine images',
          'Static code analysis: AST-based analysis for Python (detects eval, exec, os.system, etc.), regex patterns for JavaScript',
          'Input validation: API validates language parameters, code size limits, rate limiting via Nginx',
          'Image security: Alpine-based minimal images, no shell access, pre-pulled trusted images only',
          'Volume isolation: Named volumes for code transfer only, job-specific subdirectories, worker cleanup',
          'Docker socket protection: Only execution-worker has socket access, strict container parameter validation',
          'Observability: All container metrics tracked, abnormal resource usage alerting, audit trail via MongoDB',
        ],
      },
      {
        title: 'Data Flow Pipeline',
        items: [
          'Submit: User submits code via API → Nginx routes to API Gateway',
          'Queue: API Gateway validates, creates job, pushes to Redis queue',
          'Process: Go worker pops job from Redis using BRPOP',
          'Execute: Worker writes code to volume, spawns ephemeral container with Docker SDK',
          'Analyze: Python worker receives job via Pub/Sub, performs AST/regex analysis',
          'Store: MongoDB updated with execution results and analysis findings',
          'Respond: Frontend polls for completion, displays results with security analysis',
        ],
      },
      {
        title: 'Static Analysis Detection',
        items: [
          'Code injection: Detects eval(), exec(), compile() - Critical risk level',
          'System commands: Detects os.system(), subprocess.* - Critical risk level',
          'Network access: Detects socket.*, requests.*, urllib.* - High risk level',
          'File operations: Detects shutil.rmtree(), os.remove() - High risk level',
          'Dynamic imports: Detects __import__() - High risk level',
          'Serialization: Detects pickle.load(), pickle.loads() - Medium risk level',
          'Infinite loops: Detects while True: patterns - Medium risk level',
          'Blocking input: Detects input() - Low risk level',
        ],
      },
      {
        title: 'Observability Stack',
        items: [
          'cAdvisor: Container metrics exporter tracking CPU usage, memory consumption, network I/O, filesystem stats',
          'Prometheus: Time-series database storing 7 days of metrics with PromQL query language',
          'Grafana: Pre-configured RCE Engine dashboard with real-time CPU/Memory graphs, service health status, network traffic analysis',
          'Key metrics: CPU usage per container, memory consumption with trends, execution worker load gauges, running container count',
          'Benefits: Ephemeral container visibility, security monitoring for attack attempts, performance optimization, capacity planning',
        ],
      },
      {
        title: 'Performance Characteristics',
        items: [
          'Average execution time: 200-500ms per submission (excluding image pull)',
          'Maximum execution time: 5000ms hard timeout',
          'Concurrent capacity: Horizontally scalable workers, limited by CPU/memory',
          'Queue processing: ~100 jobs/min/worker depending on code complexity',
          'Resource usage: Minimal footprint - Nginx <1% CPU, API Gateway 1-2% CPU, Execution Worker <1% CPU',
        ],
      },
      {
        title: "Why it's portfolio‑worthy",
        items: [
          'Production-grade security: 12-layer defense-in-depth model protecting against malicious code execution',
          'Modern microservices architecture: Clear separation of concerns with Go, Node.js, Python, and TypeScript',
          'Full observability: Real-time metrics, dashboards, and alerting capability for production monitoring',
          'Enterprise patterns: Demonstrates container orchestration, job queues, static analysis, and security hardening',
          'Scalable design: Horizontally scalable workers, efficient resource usage, ready for Kubernetes deployment',
        ],
      },
    ],
    tech: [
      'React',
      'Vite',
      'TypeScript',
      'Monaco Editor',
      'Node.js',
      'Express',
      'Go',
      'Python',
      'FastAPI',
      'Docker',
      'Redis',
      'MongoDB',
      'Nginx',
      'Prometheus',
      'Grafana',
      'cAdvisor',
    ],
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
          'Instruction enforces grounded, 2–3 sentence answers with inline citations or explicit "don\'t know"',
          'Local inference via llama‑cpp‑python (configurable ctx, gpu_layers, temperature)',
          'Output cleaned to remove repetition; "Answer", "Citations", and collapsible "Top Contexts" sections',
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
        title: "Why it's portfolio‑worthy",
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


