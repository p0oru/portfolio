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
    blurb: 'AI-powered hotel intelligence that turns data chaos into actionable insights. Ask questions in plain English, get answers from your data.',
    description:
      'Imagine running a luxury hotel where every decision matters—from pricing strategies to guest satisfaction. Stayora transforms terabytes of operational data into role-specific insights that actually make sense. General Managers see operations, Finance Directors see P&L, Owners see portfolio performance. And here\'s the kicker: you can ask questions in plain English like "What was our RevPAR last quarter?" and get instant answers powered by AI that understands your business.',
    bullets: [
      'Six unique dashboards: Each role (GM, Owner, Finance, Commercial, F&B, Marketing) sees exactly what they need—no more, no less',
      'Ask anything: Natural language queries convert to SQL automatically, with role-aware context that understands hotel operations',
      'Semantic search: Find insights across millions of data points using vector search—like Google, but for your hotel data',
      'Real-time intelligence: Data flows in as events happen, with dashboards updating to reflect the latest metrics',
    ],
    sections: [
      {
        title: 'Modern Tech Stack',
        items: [
          'React 18 + Vite for a snappy, responsive frontend that feels native',
          'TailwindCSS for rapid UI development with a consistent design system',
          'Recharts for beautiful, interactive data visualizations that tell stories',
          'Node.js + Express backend handling complex business logic and AI orchestration',
          'MySQL for structured metrics, ChromaDB (vector database) for semantic search—best of both worlds',
        ],
      },
      {
        title: 'AI That Understands Context',
        items: [
          'Text-to-SQL magic: Ask "Show me occupancy trends" and get accurate SQL queries—with safety guards that prevent data modification',
          'RAG-powered chat: Retrieval-Augmented Generation finds relevant context from your historical data, then GPT-4o synthesizes answers',
          'Two-step retrieval: First finds relevant dates, then expands context to include all related metrics—smarter than basic search',
          'Review intelligence: Separate Python microservice uses semantic search to find guest feedback patterns across thousands of reviews',
        ],
      },
      {
        title: 'Data Pipeline That Scales',
        items: [
          'Flexible ingestion: Upload CSV or Excel files—the system handles parsing, validation, and transformation automatically',
          'Smart embedding: Converts metrics into searchable documents, processes 1000 items at a time with retry logic',
          'Hybrid storage: Structured data in MySQL for fast queries, vector embeddings in ChromaDB for semantic search',
          'Real-time updates: New data flows through the pipeline, gets embedded, and becomes searchable within minutes',
        ],
      },
      {
        title: 'Dashboards That Adapt',
        items: [
          'Time intelligence: Filter by day, week, month, quarter, or year—with optimized SQL that handles millions of rows efficiently',
          'Role-specific KPIs: GMs see guest satisfaction and operations, Finance sees P&L and budgets, Owners see ROI and asset value',
          'Interactive exploration: Drill down into charts, compare time periods, and export insights for presentations',
          'Historical analysis: Select any date range to understand trends and make data-driven decisions',
        ],
      },
      {
        title: 'Enterprise-Grade Security',
        items: [
          'Google OAuth integration: One-click login that users trust, with seamless session management',
          'Role-based access: Eight distinct roles with granular permissions—superadmins can switch between views',
          'Secure by default: HttpOnly cookies, session expiration, and middleware protecting every sensitive route',
          'Data isolation: Each hotel\'s data is completely separate, ensuring privacy and compliance',
        ],
      },
      {
        title: 'Performance That Impresses',
        items: [
          'Connection pooling: Efficient database access that handles concurrent users without breaking a sweat',
          'Batch processing: Embedding generation happens in parallel batches, making large uploads manageable',
          'Optimized queries: Strategic indexing means dashboards load in milliseconds, even with years of historical data',
          'Frontend optimization: Code splitting, lazy loading, and memoization ensure smooth interactions',
        ],
      },
      {
        title: 'Real-World Impact',
        items: [
          'Production-ready: Currently processing data for luxury hotels generating CHF 45M+ in annual revenue',
          'Hybrid architecture innovation: Successfully combined traditional SQL with vector search—a pattern that\'s becoming industry standard',
          'Multiple AI use cases: Text-to-SQL, RAG chat, semantic review search—all working together seamlessly',
          'Scalable design: Built to handle multiple properties, years of historical data, and growing user bases',
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


