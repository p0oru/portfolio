import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProjects } from '../hooks/useProjects'
import { useSettings } from '../hooks/useSettings'
import ProjectCard from '../components/ProjectCard/ProjectCard'
import styles from './Home.module.scss'

export default function Home() {
  const { projects, loading } = useProjects()
  const { settings } = useSettings()
  const featured = projects.filter((p) => p.featured).slice(0, 3)

  return (
    <div className="container">
      <section className={styles.hero}>
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.badge}>
            {settings.location || 'Tempe, AZ'} · ASU Dean's List · 3.6 GPA
          </div>
          <h1>
            Hi, I'm <span className={styles.accent}>{settings.name || 'Puru Singh'}</span>
          </h1>
          <p className={styles.tagline}>
            {settings.tagline || 'CS student at ASU building full-stack and AI-powered applications.'}
          </p>
          <div className={styles.ctaRow}>
            <Link to="/projects" className="btn">View Projects</Link>
            <Link to="/about" className="btn-ghost">About Me</Link>
          </div>
        </motion.div>
      </section>

      <section className={styles.projectsSection}>
        <div className={styles.sectionHeader}>
          <h2>Featured Projects</h2>
          <Link to="/projects" className={styles.seeAll}>See all →</Link>
        </div>
        {loading ? (
          <p style={{ color: 'var(--muted)' }}>Loading…</p>
        ) : (
          <div className={styles.grid}>
            {featured.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
