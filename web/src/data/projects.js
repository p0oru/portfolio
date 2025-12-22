export const projects = [
  {
    slug: 'agentic-food',
    title: 'Agentic Food',
    blurb: 'AI‑assisted UCD → Domain Modeling workbench: from Lean Canvas and personas to entities, relationships, DSM matrices, UML, and type combinations.',
    description:
      'An end‑to‑end workbench that turns product understanding into a live domain model. Teams capture Lean Canvas, personas, features, and use cases, then generate entities, types, relationships, DSM matrices, UML positions, and type combinations with AI assistance.',
    bullets: [
      'UCD workspace for Lean Canvas, personas, features, external systems, and dependency matrices',
      'Domain modeling with entities, entity types, relationships, DSM, and persisted UML layouts',
      'AI‑assisted generation across UCD sections and use‑case tabs with merge + curation',
      'Type combinations at scale with dedupe + AI labeling (special vs impossible)',
    ],
    sections: [
      {
        title: 'Architecture',
        items: [
          'Frontend: React + Vite + Material UI with modern UX and optimistic feedback',
          'Backend: Node.js + Express + MySQL pool; serves built SPA in production',
          'Data model: UCD tables, three matrices, domain entities/types/relationships, UML positions, type combinations, and domain‑level use cases',
        ],
      },
      {
        title: 'AI Integration',
        items: [
          'Gemini 1.5‑powered generators for Lean Canvas, personas, feature lists, external systems',
          'Use‑case tab generators (actors, inputs, output flows + definitions, pre/postconditions, triggers) with reasoning',
          'Domain synthesis from UCD + use‑case data; type‑combination batch labeling',
        ],
      },
      {
        title: 'Security & Auth',
        items: ['JWT with 7‑day sessions, bcrypt hashing', 'RBAC with admin bootstrap flow'],
      },
      {
        title: 'APIs (selected)',
        items: [
          'Projects/UCD CRUD and AI generation routes',
          'Domain CRUD + DSM + UML positions',
          'Domain‑level use cases with per‑tab endpoints',
        ],
      },
      {
        title: 'Why it’s portfolio‑worthy',
        items: [
          'Bridges discovery to design with human‑in‑the‑loop AI',
          'Handles combinatorial growth cleanly and persists visual layouts',
          'Production‑minded with auth, roles, pooled DB, and logs',
        ],
      },
    ],
    tech: ['React', 'Vite', 'Material UI', 'Node.js', 'Express', 'MySQL', 'JWT', 'bcrypt', 'Gemini 1.5'],
    links: { github: '', live: '' },
    cover: '',
  },
  {
    slug: 'agentic-book',
    title: 'Learning Platform',
    blurb: 'Content + courses + AI assistant + personalized books. Full‑stack platform with S3 media and vector‑grounded chat.',
    description:
      'An end‑to‑end learning and content platform that blends editorial media with structured learning and an AI assistant. Personalization generates customized book chapters based on user preferences. Built with a React SPA and an Express API backed by MySQL and S3.',
    bullets: [
      'Content hub (articles, videos, reels, podcasts) with categories, search, bookmarks',
      'Courses + live courses with payment flow and registration UX',
      'AI assistant chat grounded by ChromaDB over article embeddings',
      'Personalized book generation; admin console for content ops',
    ],
    sections: [
      {
        title: 'Architecture',
        items: [
          'Frontend: React SPA with route guards and responsive layout',
          'Backend: Express controllers/services, cache‑busting headers, static SPA serving',
          'Database: MySQL (mysql2 pool); Storage: AWS S3 for media; Email via Zoho SMTP',
        ],
      },
      {
        title: 'AI & Search',
        items: [
          'OpenAI GPT‑4o for chat; Gemini and Groq options for admin generation flows',
          'ChromaDB vector search over articles for grounded answers',
        ],
      },
      {
        title: 'Security & Auth',
        items: [
          'Client Google sign‑in (Firebase) → backend JWT',
          'Role‑based checks for admin/reviewer surfaces',
        ],
      },
      {
        title: 'Future Enhancements',
        items: [
          'Per‑route rate limiting and audit logging',
          'Background jobs for AI/media; streaming uploads',
          'Expanded test coverage and E2E',
        ],
      },
    ],
    tech: ['React', 'Express', 'MySQL', 'AWS S3', 'OpenAI GPT‑4o', 'Gemini', 'Groq', 'ChromaDB', 'Firebase', 'Zoho SMTP'],
    links: { github: '', live: '' },
    cover: '',
  },
  {
    slug: 'agentic-ai-dashboard',
    title: 'Hospitality Analytics',
    blurb: 'AI‑powered analytics for hotels: text‑to‑SQL, RAG over metrics and reviews, and role‑aware dashboards.',
    description:
      'A full‑stack platform that turns hotel data and guest reviews into actionable insights. Features text‑to‑SQL analytics, RAG‑grounded chat, review intelligence via FastAPI, and dashboards for GM/Owner/Finance roles.',
    bullets: [
      'Text‑to‑SQL assistant: natural language → safe SELECT → narrative summary',
      'RAG over hotel metrics/events with date‑aware context expansion',
      'Review insights via Python FastAPI + ChromaDB citations',
      'Role‑aware dashboards and admin tools',
    ],
    sections: [
      {
        title: 'Architecture',
        items: [
          'Frontend: React + Vite + Tailwind with protected routes',
          'Backend: Node.js + Express + MySQL; OpenAI SDK; ChromaDB client',
          'Review service: Python FastAPI indexing/search over guest reviews',
        ],
      },
      {
        title: 'Notable Engineering Choices',
        items: [
          'Safety guardrails: only SELECT queries executed from text‑to‑SQL',
          'Session‑based auth with Google OAuth; RBAC for admin routes',
          'Scalable ingestion and consistent doc IDs for traceability',
        ],
      },
    ],
    tech: ['React', 'Vite', 'Tailwind', 'Node.js', 'Express', 'MySQL', 'OpenAI', 'ChromaDB', 'FastAPI', 'OAuth'],
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


