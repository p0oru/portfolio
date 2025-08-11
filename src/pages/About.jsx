import styles from './About.module.scss'

export default function About() {
  return (
    <div className="container">
      <section className={'glass ' + styles.wrap}>
        <div>
          <h1>About Me</h1>
          <p className="mb-16">I’m Puru Singh, a Computer Science student at Arizona State University (GPA 3.2; Dean’s List Fall 2024). I build full‑stack and AI‑powered apps that streamline workflows and elevate UX. I enjoy mentoring peers and contributing to campus and community projects.</p>
          <div className={styles.rows}>
            <div className={styles.card + ' glass'}>
              <h3>What I’m best at</h3>
              <ul>
                <li>Full‑stack development with React, Node.js, Express, FastAPI</li>
                <li>AI integration: RAG, prompt engineering, LLM‑powered features</li>
                <li>APIs, authentication (JWT/RBAC), and data modeling</li>
              </ul>
            </div>
            <div className={styles.card + ' glass'}>
              <h3>Currently</h3>
              <p>Exploring AI‑assisted tooling and performance profiling. Actively seeking on‑campus roles where I can support technical operations and student experience.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


