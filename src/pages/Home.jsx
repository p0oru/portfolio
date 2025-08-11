import { motion } from 'framer-motion'
import styles from './Home.module.scss'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="container">
      <section className={styles.hero + ' glass'}>
        <div className={styles.heroContent}>
          <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            Hey, I’m <span className={styles.gradient}>Puru Singh</span>
          </motion.h1>
          <p className={styles.subtitle}>CS @ ASU · I build full‑stack & AI‑powered apps—fast, reliable, and enjoyable to use.</p>
          <div className={styles.ctaRow}>
            <Link to="/projects" className="btn">Explore Projects</Link>
            <Link to="/resume" className={styles.ctaSecondary}>View Resume</Link>
          </div>
          <div className="neon-divider mt-24" />
          <ul className={styles.skills}>
            <li className="chip">React</li>
            <li className="chip">Node.js</li>
            <li className="chip">Python</li>
            <li className="chip">Java</li>
            <li className="chip">FastAPI</li>
            <li className="chip">Express</li>
            <li className="chip">MySQL</li>
            <li className="chip">Firebase</li>
            <li className="chip">AWS</li>
            <li className="chip">Docker</li>
            <li className="chip">RAG</li>
            <li className="chip">JWT / RBAC</li>
          </ul>
        </div>
        <div className={styles.heroArt}>
          <div className={styles.sphere} />
          <div className={styles.gridGlow} />
        </div>
      </section>

      <section className="mt-40">
        <h2 className="mb-16">Featured Projects</h2>
        <div className={styles.projectGrid}>
          <Link to="/projects" className={styles.projectCard + ' glass'}>
            <div className={styles.projectThumb}><div className={styles.thumbOverlay} /></div>
            <div className={styles.projectMeta}>
              <h3>Agentic Food</h3>
              <p>AI‑powered platform that generates structured domain models to accelerate SDLC artifacts.</p>
              <div className={styles.tags}>
                <span className="chip">React</span><span className="chip">Express</span><span className="chip">MySQL</span><span className="chip">JWT</span>
              </div>
            </div>
          </Link>
          <Link to="/projects" className={styles.projectCard + ' glass'}>
            <div className={styles.projectThumb}><div className={styles.thumbOverlay} /></div>
            <div className={styles.projectMeta}>
              <h3>Agentic Book</h3>
              <p>Persona‑based content generator for books with AI personalization and secure media handling.</p>
              <div className={styles.tags}>
                <span className="chip">React</span><span className="chip">OpenAI/Gemini</span><span className="chip">Express</span><span className="chip">AWS S3</span>
              </div>
            </div>
          </Link>
          <Link to="/projects" className={styles.projectCard + ' glass'}>
            <div className={styles.projectThumb}><div className={styles.thumbOverlay} /></div>
            <div className={styles.projectMeta}>
              <h3>Agentic AI Dashboard (Hospitality)</h3>
              <p>Interactive analytics with RAG and text‑to‑SQL for decision‑making across hotel roles.</p>
              <div className={styles.tags}>
                <span className="chip">React</span><span className="chip">FastAPI</span><span className="chip">ChromaDB</span><span className="chip">RAG</span>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  )
}


