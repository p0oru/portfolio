import { motion } from 'framer-motion'
import { useProjects } from '../hooks/useProjects'
import ProjectCard from '../components/ProjectCard/ProjectCard'
import styles from './Projects.module.scss'

export default function Projects() {
  const { projects, loading } = useProjects()

  return (
    <div className="container">
      <div className={styles.header}>
        <h1>Projects</h1>
        <p className={styles.sub}>Things I've built</p>
      </div>
      {loading ? (
        <p style={{ color: 'var(--muted)' }}>Loading…</p>
      ) : (
        <div className={styles.grid}>
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
