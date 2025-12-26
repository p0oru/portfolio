export const projects = [
  {
    slug: 'domainflow',
    title: 'DomainFlow',
    tagline: 'AI-Powered Domain Modeling & Requirements Engine',
    blurb: 'AI-Powered Domain Modeling & Requirements Engine. An enterprise-grade SaaS platform that automates the software design lifecycle.',
    description:
      'An enterprise SaaS that orchestrates GPT-4o & Gemini to automate software design. Features a custom multi-LLM pipeline for generating UML diagrams, user personas, and requirement documentation.',
    isPrivate: true,
    bullets: [
      'Multi-Model AI Orchestration: GPT-4o handles deterministic tasks (Lean Canvas, MoSCoW features, business logic validation), while Gemini 1.5 Pro excels at high-context generation (User Personas, Use Case preconditions)',
      'Algorithmic Type Combination Analysis: Cartesian Product Algorithm generates every possible combination of entity types, batch-processed through GPT-4o to flag impossible or special case combinations, reducing manual QA time by 90%',
      'Interactive Visualization Engine: Custom drag-and-drop UML modeler using Konva.js with real-time state synchronization and Design Structure Matrix (DSM) for visualizing N×N dependencies',
      'Production-Ready Architecture: Normalized MySQL schema (30+ tables) with strict relationships, Zod schema validation on AI responses, and context pruning strategy for large context windows',
    ],
    sections: [
      {
        title: 'System Architecture',
        items: [
          'Client Layer: React SPA handling complex state for interactive matrices (DSM) and canvas rendering (UML)',
          'API Layer: Express.js middleware manages Authentication (RBAC) and routing',
          'Intelligence Layer: Dedicated service module routes prompts to specific AI providers based on strength',
          'Data Layer: Normalized MySQL schema (30+ tables) stores strict relationships between Entities, Features, and Actors',
        ],
      },
      {
        title: 'Multi-Model AI Integration',
        items: [
          'OpenAI GPT-4o: Used for deterministic tasks like generating Lean Canvas sections, defining strict MoSCoW feature sets, and validating business logic rules',
          'Google Gemini 1.5 Pro: Utilized for high-context generation, specifically for fleshing out detailed User Personas, Use Case preconditions, and Triggers where large context windows are beneficial',
          'Hybrid approach optimizes for cost and accuracy by leveraging each model\'s strengths',
        ],
      },
      {
        title: 'Algorithmic Type Combination Analysis',
        items: [
          'Cartesian Product Algorithm generates every possible combination of entity types (e.g., UserType × SubscriptionStatus × Region)',
          'System generates thousands of combinations, batch-processed (100 items/batch) through GPT-4o',
          'Automatically flags "Impossible" or "Special Case" combinations, reducing manual QA time by 90%',
          'Hash-based duplicate detection using SHA-256 to prevent redundant validations',
        ],
      },
      {
        title: 'Challenges & Solutions',
        items: [
          'AI Hallucinations & Data Consistency: Implemented Zod schema validation on all AI responses and "Upsert Logic" strategy with fuzzy matching to prevent duplicates',
          'Large Context Windows: Context Pruning Strategy recursively fetches only directly related dependencies, sanitizes circular references, and truncates non-essential descriptions to fit within context window',
        ],
      },
      {
        title: 'Tech Stack',
        items: [
          'Frontend: React 18, Vite, Material-UI, Konva (Canvas/UML Visualization)',
          'Backend: Node.js, Express.js (REST API)',
          'Database: MySQL 8.0 (AWS RDS), Redis (Caching)',
          'AI Layer: OpenAI GPT-4o (Logic/Validation), Google Gemini 1.5 Pro (Context Generation)',
          'Infrastructure: AWS RDS, JWT Auth, Docker',
        ],
      },
    ],
    tech: ['React', 'Node.js', 'OpenAI GPT-4o', 'Google Gemini', 'MySQL', 'AWS RDS'],
    links: { github: '', live: '' },
    cover: '',
  },
  {
    slug: 'stayora',
    title: 'Stayora',
    tagline: 'AI-Driven Hospitality Intelligence Platform',
    blurb: 'AI-Driven Hospitality Intelligence Platform. A real-time analytics platform deployed for luxury hotels (CHF 45M+ revenue) with Text-to-SQL and RAG capabilities.',
    description:
      'Real-time analytics platform deployed for luxury hotels (CHF 45M+ revenue). Features a "Text-to-SQL" engine and RAG-based review analysis to democratize data access for non-technical staff.',
    isPrivate: true,
    bullets: [
      'Text-to-SQL Query Engine: Converts English questions into executable SQL with context injection, safety layer (SELECT-only enforcement), and self-correction on query failures',
      'Retrieval Augmented Generation (RAG) for Reviews: Semantic vector search using ChromaDB combined with date filtering in MySQL for time-aware context windows, synthesized by GPT-4o into actionable insights',
      'Hybrid Database Architecture: MySQL for structured metrics (RevPAR, Occupancy, GOP) with strict ACID compliance, ChromaDB for vector embeddings of guest reviews and qualitative feedback',
      'Role-Based Access: 6 distinct role-specific dashboards (GM, Owner, Finance, Commercial, F&B, Marketing) with data privacy at the database query level',
    ],
    sections: [
      {
        title: 'System Architecture',
        items: [
          'Orchestration Layer: Node.js/Express API gateway handles authentication, session management, and routes requests',
          'Structured Data Layer: Operational metrics stored in normalized MySQL schema for strict ACID compliance and financial reporting',
          'Unstructured Intelligence: Guest reviews processed by Python FastAPI service, vector-embedded, and stored in ChromaDB for semantic search',
          'Role-Based Access: Architecture isolates data views across 6 distinct roles to ensure data privacy at the database query level',
        ],
      },
      {
        title: 'Text-to-SQL Query Engine',
        items: [
          'Context Injection: Prompt dynamically injects SQL schema and user role context to ensure AI understands table relationships',
          'Safety Layer: Middleware parses generated SQL to enforce SELECT-only execution, preventing injection attacks or accidental data mutation',
          'Self-Correction: If query fails, error message is fed back into the LLM to auto-correct the syntax',
          'Enables non-technical hotel managers to query complex datasets using natural language',
        ],
      },
      {
        title: 'RAG Pipeline for Reviews',
        items: [
          'Hybrid Retrieval: Semantic vector search finds relevant guest reviews, then filters by date in MySQL to create time-aware context window',
          'Synthesis: GPT-4o synthesizes retrieved reviews into actionable insights (e.g., "Why is housekeeping rated low in July?")',
          'Standard keyword search fails to capture sentiment—vector search enables semantic understanding',
        ],
      },
      {
        title: 'Complex Data Processing Pipeline',
        items: [
          'Ingestion: Custom stream-based parsers (csv-parser, xlsx) handle massive file uploads without blocking Node.js event loop',
          'Batch Embedding: Data transformed into natural language narratives (e.g., "On 2024-05-12, ADR was 450") and batched (1000 items/batch) for embedding generation to minimize API latency',
        ],
      },
      {
        title: 'Challenges & Solutions',
        items: [
          'Vector Context vs. Time Sensitivity: Implemented Two-Step Retrieval—metadata filter in ChromaDB narrows by date range, then vector search runs on subset, ensuring insights are both semantically relevant and operationally current',
          'Metric Aggregation Performance: Optimized database indexing on composite keys (hotel_id, date) and implemented query caching for historical data, reducing dashboard load time by ~60%',
        ],
      },
      {
        title: 'Tech Stack',
        items: [
          'Frontend: React 18, Vite, TailwindCSS, Recharts',
          'Backend: Node.js (API Gateway), Python FastAPI (Review Analysis Microservice)',
          'Database: MySQL (Structured Metrics), ChromaDB (Vector Embeddings)',
          'AI/ML: OpenAI GPT-4o (SQL Generation), text-embedding-ada-002',
          'Infrastructure: AWS EC2, Docker, Passport.js (OAuth 2.0)',
        ],
      },
    ],
    tech: ['React', 'Python FastAPI', 'ChromaDB (Vector)', 'MySQL', 'Docker'],
    links: { github: '', live: '' },
    cover: '',
  },
  {
    slug: 'rce-engine',
    title: 'RCE Engine',
    tagline: 'Distributed Remote Code Execution Platform',
    blurb: 'Distributed Remote Code Execution Platform. A production-grade microservices platform designed to securely execute untrusted user code with Defense-in-Depth security.',
    description:
      'A production-grade microservices platform for securely executing untrusted code. Implements a "Defense-in-Depth" security model using ephemeral Docker containers and Go orchestration.',
    isPrivate: false,
    bullets: [
      'Defense-in-Depth Security Model: 12 distinct security layers including network isolation (NetworkDisabled: true), capability dropping (CapDrop: ["ALL"]), resource quotas (128MB RAM, 0.5 CPU, max 50 PIDs), and ephemeral lifecycle with AutoRemove',
      'High-Performance Orchestration: Go worker uses sibling container pattern (communicates with host Docker socket) rather than Docker-in-Docker, processing submissions with <500ms overhead excluding runtime',
      'Full-Stack Observability: cAdvisor exports per-container metrics, Prometheus aggregates CPU/memory spikes, Grafana provides alerts for abnormal behavior (e.g., crypto-mining attempts)',
      'Static Code Analysis: Python worker performs AST-based analysis for Python (detects eval, exec, os.system) and regex patterns for JavaScript, running in parallel via Pub/Sub pipeline',
    ],
    sections: [
      {
        title: 'System Architecture',
        items: [
          'Ingestion: Nginx routes traffic to Node.js API Gateway which performs validation and rate limiting',
          'Queuing: Jobs pushed to Redis queue, decoupling submission logic from execution',
          'Orchestration: Go Worker consumes jobs, interfacing directly with Docker Socket to spawn ephemeral "sibling" containers',
          'Analysis: Parallel Python Worker performs AST static analysis to detect malicious patterns before/during execution',
          'Monitoring: Real-time metrics scraped by Prometheus and visualized in Grafana to track container health and resource spikes',
        ],
      },
      {
        title: 'Defense-in-Depth Security Model',
        items: [
          'Network Isolation: Containers spawned with NetworkDisabled: true to prevent external calls',
          'Capability Dropping: All Linux capabilities (CapDrop: ["ALL"]) removed, no-new-privileges enforced',
          'Resource Quotas: Hard limits on RAM (128MB), CPU (0.5 cores), and PIDs (max 50) to prevent Fork Bombs',
          'Ephemeral Lifecycle: Containers utilize AutoRemove flag, ensuring immediate destruction after 5-second timeout',
          'Static Analysis: AST-based Python analysis and regex-based JS analysis detect malicious patterns',
        ],
      },
      {
        title: 'High-Performance Orchestration (Go)',
        items: [
          'Sibling Container Pattern: Worker communicates with host Docker socket to spawn sibling containers, reducing overhead vs Docker-in-Docker',
          'Throughput: System processes submissions with <500ms overhead, excluding runtime',
          'Concurrency: Go\'s concurrency primitives and robust Docker SDK enable efficient job processing',
        ],
      },
      {
        title: 'Challenges & Solutions',
        items: [
          'Infinite Loops & Fork Bombs: Implemented strict PidsLimit in Docker config and hard 5-second timeout context in Go—if context expires, worker forcibly kills container',
          'Secure File Transfer: Used Docker Named Volumes—code written to volume, mounted read-only to container, volume garbage-collected immediately after execution',
        ],
      },
      {
        title: 'Tech Stack',
        items: [
          'Frontend: React 18, TypeScript, Vite, Monaco Editor',
          'Backend: Node.js (API Gateway), Go (Execution Engine), Python (Static Analysis)',
          'Infrastructure: Docker, Nginx (Reverse Proxy), Redis (Message Queue)',
          'Database: MongoDB (Persistence), Redis (Caching/Queues)',
          'Observability: Prometheus, Grafana, cAdvisor',
        ],
      },
    ],
    tech: ['Go', 'Node.js', 'Redis', 'Docker', 'Prometheus', 'Grafana'],
    links: { github: 'https://github.com/p0oru/code_editor', live: '' },
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



