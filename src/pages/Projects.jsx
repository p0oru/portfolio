import styles from './Projects.module.scss'

const demoProjects = [
  {
    title: 'Agentic Food',
    blurb: 'AI platform that generates structured domain models to speed up SDLC artifacts. Includes auth with RBAC and a UML tool.',
    tags: ['React', 'Express', 'MySQL', 'JWT', 'RBAC'],
  },
  {
    title: 'Agentic Book',
    blurb: 'Persona‑based content generation for books, leveraging OpenAI/Gemini and secure media with AWS S3.',
    tags: ['React', 'OpenAI', 'Express', 'AWS S3', 'MySQL'],
  },
  {
    title: 'Agentic AI Dashboard (Hospitality)',
    blurb: 'AI analytics dashboard with text‑to‑SQL, RAG architecture via ChromaDB, and review insights via FastAPI microservices.',
    tags: ['React', 'FastAPI', 'ChromaDB', 'RAG', 'LLM'],
  },
]

export default function Projects() {
  return (
    <div className="container">
      <h1>Projects</h1>
      <p className="mb-16">Short, visual showcases. Click to learn more.</p>
      <div className={styles.grid}>
        {demoProjects.map((p, idx) => (
          <article key={idx} className={'glass ' + styles.card}>
            <div className={styles.thumb} />
            <div className={styles.meta}>
              <h3>{p.title}</h3>
              <p>{p.blurb}</p>
              <div className={styles.tags}>
                {p.tags.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}


