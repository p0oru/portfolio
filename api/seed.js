require('dotenv').config()
const fs = require('fs')
const path = require('path')
const { getDb } = require('./db')

const db = getDb()

// ── Projects ──────────────────────────────────────────────────────────────────
const projects = [
  {
    slug: 'domainflow',
    title: 'DomainFlow',
    tagline: 'AI-Powered Domain Modeling & Requirements Engine',
    short_desc: 'An enterprise-grade SaaS platform that automates the software design lifecycle.',
    long_desc: `An enterprise SaaS that orchestrates GPT-4o & Gemini to automate software design. Features a custom multi-LLM pipeline for generating UML diagrams, user personas, and requirement documentation.

## System Architecture
- Client Layer: React SPA handling complex state for interactive matrices (DSM) and canvas rendering (UML)
- API Layer: Express.js middleware manages Authentication (RBAC) and routing
- Intelligence Layer: Dedicated service module routes prompts to specific AI providers based on strength
- Data Layer: Normalized MySQL schema (30+ tables) stores strict relationships between Entities, Features, and Actors

## Multi-Model AI Integration
- OpenAI GPT-4o: Used for deterministic tasks like generating Lean Canvas sections, defining strict MoSCoW feature sets, and validating business logic rules
- Google Gemini 1.5 Pro: Utilized for high-context generation, specifically for fleshing out detailed User Personas, Use Case preconditions, and Triggers where large context windows are beneficial

## Algorithmic Type Combination Analysis
- Cartesian Product Algorithm generates every possible combination of entity types (e.g., UserType × SubscriptionStatus × Region)
- System generates thousands of combinations, batch-processed (100 items/batch) through GPT-4o
- Automatically flags "Impossible" or "Special Case" combinations, reducing manual QA time by 90%

## Tech Stack
- Frontend: React 18, Vite, Material-UI, Konva (Canvas/UML Visualization)
- Backend: Node.js, Express.js (REST API)
- Database: MySQL 8.0 (AWS RDS), Redis (Caching)
- AI Layer: OpenAI GPT-4o (Logic/Validation), Google Gemini 1.5 Pro (Context Generation)
- Infrastructure: AWS RDS, JWT Auth, Docker`,
    tech_stack: ['React', 'Node.js', 'OpenAI GPT-4o', 'Google Gemini', 'MySQL', 'AWS RDS'],
    links: {},
    featured: true,
    visible: true,
    display_order: 1,
  },
  {
    slug: 'stayora',
    title: 'Stayora',
    tagline: 'AI-Driven Hospitality Intelligence Platform',
    short_desc: 'Real-time analytics platform deployed for luxury hotels (CHF 45M+ revenue) with Text-to-SQL and RAG capabilities.',
    long_desc: `Real-time analytics platform deployed for luxury hotels (CHF 45M+ revenue). Features a "Text-to-SQL" engine and RAG-based review analysis to democratize data access for non-technical staff.

## System Architecture
- Orchestration Layer: Node.js/Express API gateway handles authentication, session management, and routes requests
- Structured Data Layer: Operational metrics stored in normalized MySQL schema for strict ACID compliance and financial reporting
- Unstructured Intelligence: Guest reviews processed by Python FastAPI service, vector-embedded, and stored in ChromaDB for semantic search

## Text-to-SQL Query Engine
- Context Injection: Prompt dynamically injects SQL schema and user role context to ensure AI understands table relationships
- Safety Layer: Middleware parses generated SQL to enforce SELECT-only execution, preventing injection attacks or accidental data mutation
- Self-Correction: If query fails, error message is fed back into the LLM to auto-correct the syntax

## Tech Stack
- Frontend: React 18, Vite, TailwindCSS, Recharts
- Backend: Node.js (API Gateway), Python FastAPI (Review Analysis Microservice)
- Database: MySQL (Structured Metrics), ChromaDB (Vector Embeddings)
- AI/ML: OpenAI GPT-4o (SQL Generation), text-embedding-ada-002
- Infrastructure: AWS EC2, Docker, Passport.js (OAuth 2.0)`,
    tech_stack: ['React', 'Python FastAPI', 'ChromaDB', 'MySQL', 'Docker'],
    links: {},
    featured: true,
    visible: true,
    display_order: 2,
  },
  {
    slug: 'rce-engine',
    title: 'RCE Engine',
    tagline: 'Distributed Remote Code Execution Platform',
    short_desc: 'A production-grade microservices platform for securely executing untrusted user code with Defense-in-Depth security.',
    long_desc: `A production-grade microservices platform for securely executing untrusted code. Implements a "Defense-in-Depth" security model using ephemeral Docker containers and Go orchestration.

## Defense-in-Depth Security Model
- Network Isolation: Containers spawned with NetworkDisabled: true to prevent external calls
- Capability Dropping: All Linux capabilities (CapDrop: ["ALL"]) removed, no-new-privileges enforced
- Resource Quotas: Hard limits on RAM (128MB), CPU (0.5 cores), and PIDs (max 50) to prevent Fork Bombs
- Ephemeral Lifecycle: Containers utilize AutoRemove flag, ensuring immediate destruction after 5-second timeout

## High-Performance Orchestration (Go)
- Sibling Container Pattern: Worker communicates with host Docker socket to spawn sibling containers, reducing overhead vs Docker-in-Docker
- Throughput: System processes submissions with <500ms overhead, excluding runtime

## Tech Stack
- Frontend: React 18, TypeScript, Vite, Monaco Editor
- Backend: Node.js (API Gateway), Go (Execution Engine), Python (Static Analysis)
- Infrastructure: Docker, Nginx (Reverse Proxy), Redis (Message Queue)
- Database: MongoDB (Persistence), Redis (Caching/Queues)
- Observability: Prometheus, Grafana, cAdvisor`,
    tech_stack: ['Go', 'Node.js', 'Redis', 'Docker', 'Prometheus', 'Grafana'],
    links: { github: 'https://github.com/p0oru/code_editor' },
    featured: true,
    visible: true,
    display_order: 3,
  },
  {
    slug: 'whatsapp-rag',
    title: 'WhatsApp RAG',
    tagline: 'Fully Local Retrieval-Augmented Generation on Windows',
    short_desc: 'Private, fully local Q&A over WhatsApp chats using local embeddings, ChromaDB, and llama.cpp.',
    long_desc: `End-to-end local RAG system for WhatsApp group chat exports. Parses raw logs to JSONL, builds a Chroma vector index with local embeddings, optionally reranks with a local cross-encoder, and answers with a local LLM. Nothing leaves the machine.

## Architecture
- Data: WhatsApp .txt → normalized JSONL (one message per line)
- Indexing: JSONL → conversational chunks → embeddings → Chroma persistent store (citations in metadata)
- Retrieval: embed query → retrieve top-k → optional cross-encoder rerank
- Generation: grounded prompt → local LLM answers concisely with inline citations

## Tech Stack
- Python 3.10/3.11 with CUDA 12.1/12.2
- SentenceTransformers BAAI/bge-large-en-v1.5
- ChromaDB persistent vector store
- llama-cpp-python with Llama 3.1 8B GGUF
- Optional: cross-encoder/ms-marco-MiniLM-L-6-v2 for reranking
- Gradio web UI`,
    tech_stack: ['Python', 'ChromaDB', 'llama.cpp', 'SentenceTransformers', 'Gradio', 'CUDA'],
    links: {},
    featured: false,
    visible: true,
    display_order: 4,
  },
]

const insertProject = db.prepare(`
  INSERT OR REPLACE INTO projects (slug, title, tagline, short_desc, long_desc, tech_stack, links, featured, visible, display_order)
  VALUES (@slug, @title, @tagline, @short_desc, @long_desc, @tech_stack, @links, @featured, @visible, @display_order)
`)

db.transaction(() => {
  for (const p of projects) {
    insertProject.run({
      ...p,
      tech_stack: JSON.stringify(p.tech_stack),
      links: JSON.stringify(p.links),
      featured: p.featured ? 1 : 0,
      visible: p.visible ? 1 : 0,
    })
  }
})()

console.log(`✓ Seeded ${projects.length} projects`)

// ── Experience ────────────────────────────────────────────────────────────────
const experience = [
  {
    company: 'Superstars',
    role: 'Software Development Intern',
    start_date: '2026-01',
    end_date: null,
    is_current: true,
    description: 'Angular 19+ video player system, 300+ file codebase cleanup, multi-agent code review tooling.',
    tech_tags: ['Angular 19', 'TypeScript', 'RxJS'],
    type: 'internship',
    display_order: 1,
  },
  {
    company: 'Arizona State University',
    role: 'Teaching Assistant — Web Design',
    start_date: '2026-01',
    end_date: '2026-05',
    is_current: true,
    description: 'Teaching assistant under Prof. McCarthy for HTML/CSS/web design course.',
    tech_tags: ['HTML', 'CSS', 'Web Design'],
    type: 'ta',
    display_order: 2,
  },
  {
    company: '3P Innovations Pvt Ltd',
    role: 'Software Developer Intern',
    start_date: '2025-05',
    end_date: '2025-08',
    is_current: false,
    description: '3 production platforms: DomainFlow (AI domain modeling), Stayora (hotel intelligence), Agentic Book (adaptive learning).',
    tech_tags: ['React', 'FastAPI', 'Node.js', 'MySQL', 'AWS', 'OpenAI', 'Gemini'],
    type: 'internship',
    display_order: 3,
  },
]

const insertExp = db.prepare(`
  INSERT OR REPLACE INTO experience (company, role, start_date, end_date, is_current, description, tech_tags, type, display_order)
  VALUES (@company, @role, @start_date, @end_date, @is_current, @description, @tech_tags, @type, @display_order)
`)

db.transaction(() => {
  for (const e of experience) {
    insertExp.run({ ...e, tech_tags: JSON.stringify(e.tech_tags), is_current: e.is_current ? 1 : 0 })
  }
})()

console.log(`✓ Seeded ${experience.length} experience entries`)

// ── Education ─────────────────────────────────────────────────────────────────
const education = [
  {
    institution: 'Arizona State University',
    degree: 'B.S.',
    field: 'Computer Science',
    start_date: '2024-08',
    end_date: '2027-12',
    gpa: '3.6',
    honors: ["Dean's List Fall 2024", "Ira A. Fulton Schools of Engineering"],
    display_order: 1,
  },
]

const insertEdu = db.prepare(`
  INSERT OR REPLACE INTO education (institution, degree, field, start_date, end_date, gpa, honors, display_order)
  VALUES (@institution, @degree, @field, @start_date, @end_date, @gpa, @honors, @display_order)
`)

db.transaction(() => {
  for (const e of education) {
    insertEdu.run({ ...e, honors: JSON.stringify(e.honors) })
  }
})()

console.log(`✓ Seeded ${education.length} education entries`)

// ── Skills ────────────────────────────────────────────────────────────────────
const skills = [
  // Languages
  { category: 'Languages', name: 'Python', icon_name: 'SiPython', proficiency: 5, display_order: 1 },
  { category: 'Languages', name: 'TypeScript', icon_name: 'SiTypescript', proficiency: 5, display_order: 2 },
  { category: 'Languages', name: 'JavaScript', icon_name: 'SiJavascript', proficiency: 5, display_order: 3 },
  { category: 'Languages', name: 'Go', icon_name: 'SiGo', proficiency: 4, display_order: 4 },
  { category: 'Languages', name: 'Java', icon_name: 'SiJava', proficiency: 3, display_order: 5 },
  { category: 'Languages', name: 'C', icon_name: null, proficiency: 3, display_order: 6 },
  // Frontend
  { category: 'Frontend', name: 'React', icon_name: 'SiReact', proficiency: 5, display_order: 1 },
  { category: 'Frontend', name: 'Angular 19', icon_name: 'SiAngular', proficiency: 4, display_order: 2 },
  { category: 'Frontend', name: 'Tailwind CSS', icon_name: 'SiTailwindcss', proficiency: 5, display_order: 3 },
  { category: 'Frontend', name: 'Framer Motion', icon_name: 'SiFramer', proficiency: 4, display_order: 4 },
  { category: 'Frontend', name: 'Vite', icon_name: 'SiVite', proficiency: 4, display_order: 5 },
  // Backend
  { category: 'Backend', name: 'Node.js', icon_name: 'SiNodedotjs', proficiency: 5, display_order: 1 },
  { category: 'Backend', name: 'Express.js', icon_name: 'SiExpress', proficiency: 5, display_order: 2 },
  { category: 'Backend', name: 'FastAPI', icon_name: 'SiFastapi', proficiency: 4, display_order: 3 },
  { category: 'Backend', name: 'Next.js', icon_name: 'SiNextdotjs', proficiency: 3, display_order: 4 },
  // Databases
  { category: 'Databases', name: 'MySQL', icon_name: 'SiMysql', proficiency: 5, display_order: 1 },
  { category: 'Databases', name: 'MongoDB', icon_name: 'SiMongodb', proficiency: 4, display_order: 2 },
  { category: 'Databases', name: 'Redis', icon_name: 'SiRedis', proficiency: 4, display_order: 3 },
  { category: 'Databases', name: 'SQLite', icon_name: null, proficiency: 4, display_order: 4 },
  { category: 'Databases', name: 'PostgreSQL', icon_name: 'SiPostgresql', proficiency: 3, display_order: 5 },
  // AI & ML
  { category: 'AI & ML', name: 'OpenAI API', icon_name: 'SiOpenai', proficiency: 5, display_order: 1 },
  { category: 'AI & ML', name: 'RAG Architecture', icon_name: null, proficiency: 5, display_order: 2 },
  { category: 'AI & ML', name: 'ChromaDB', icon_name: null, proficiency: 4, display_order: 3 },
  { category: 'AI & ML', name: 'LLMs (Gemini, Groq)', icon_name: null, proficiency: 4, display_order: 4 },
  // Infrastructure
  { category: 'Infrastructure', name: 'Docker', icon_name: 'SiDocker', proficiency: 5, display_order: 1 },
  { category: 'Infrastructure', name: 'AWS', icon_name: 'SiAwsamplify', proficiency: 4, display_order: 2 },
  { category: 'Infrastructure', name: 'Nginx', icon_name: 'SiNginx', proficiency: 4, display_order: 3 },
  { category: 'Infrastructure', name: 'Linux', icon_name: 'SiLinux', proficiency: 4, display_order: 4 },
  { category: 'Infrastructure', name: 'Cloudflare', icon_name: 'SiCloudflare', proficiency: 3, display_order: 5 },
  // Tools
  { category: 'Tools', name: 'Git', icon_name: 'SiGit', proficiency: 5, display_order: 1 },
]

const insertSkill = db.prepare(`
  INSERT OR REPLACE INTO skills (category, name, icon_name, proficiency, display_order)
  VALUES (@category, @name, @icon_name, @proficiency, @display_order)
`)

db.transaction(() => {
  for (const s of skills) insertSkill.run(s)
})()

console.log(`✓ Seeded ${skills.length} skills`)

// ── Blog Posts ────────────────────────────────────────────────────────────────
const blogPosts = [
  {
    slug: 'intro-puru',
    title: "Hi, I'm Puru",
    content: `I'm a CS student at Arizona State University. I love building full-stack and AI-powered projects that make life easier for students and teams.

On this site you'll find short showcases of my projects, notes on what I'm learning, and a resume that I keep up to date. If something resonates, reach out at [psing176@asu.edu](mailto:psing176@asu.edu).`,
    excerpt: "A quick hello and what I'm building this year.",
    tags: ['intro', 'asu', 'full-stack', 'ai'],
    published: true,
    published_at: '2025-08-10',
  },
]

const insertPost = db.prepare(`
  INSERT OR REPLACE INTO blog_posts (slug, title, content, excerpt, tags, published, published_at)
  VALUES (@slug, @title, @content, @excerpt, @tags, @published, @published_at)
`)

db.transaction(() => {
  for (const p of blogPosts) {
    insertPost.run({ ...p, tags: JSON.stringify(p.tags), published: p.published ? 1 : 0 })
  }
})()

console.log(`✓ Seeded ${blogPosts.length} blog posts`)

// ── Settings ──────────────────────────────────────────────────────────────────
const settings = {
  name: 'Puru Singh',
  tagline: 'CS student at ASU building full-stack and AI-powered applications.',
  bio: "I'm Puru Singh, a Computer Science student at Arizona State University (GPA 3.6; Dean's List Fall 2024). I build full-stack and AI-powered apps that streamline workflows and elevate UX.",
  email: 'psing176@asu.edu',
  github_url: 'https://github.com/p0oru',
  linkedin_url: 'https://www.linkedin.com/in/purusingh2006/',
  location: 'Tempe, Arizona, USA',
  open_to_work: 'true',
  resume_url: '',
}

const insertSetting = db.prepare("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)")
db.transaction(() => {
  for (const [k, v] of Object.entries(settings)) insertSetting.run(k, v)
})()

console.log(`✓ Seeded settings`)
console.log('\n✅ Seed complete.')
