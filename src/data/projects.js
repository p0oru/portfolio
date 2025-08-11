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
    title: 'Stayora — Hospitality Analytics',
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
]

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug)
}


