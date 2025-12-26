import styles from './Home.module.scss'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'

const featuredProjects = projects.slice(0, 3)

export default function Home() {
  return (
    <div className="container">
      <section className={'glass grain ' + styles.hero}>
        <div className={styles.heroContent}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Hi, I'm <span className={styles.gradient}>Puru Singh</span>
          </motion.h1>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Computer Science student at ASU building full‑stack and AI‑powered applications. 
            I turn complex problems into elegant, scalable solutions.
          </motion.p>
          <motion.div
            className={styles.ctaRow}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link className="btn" to="/projects">View Projects</Link>
            <Link className={styles.ctaSecondary} to="/about">About Me</Link>
          </motion.div>
        </div>
        <div className={styles.heroArt}>
          <div className={styles.sphere} />
          <img src="/pfp.jpg" alt="Puru Singh" className={styles.heroAvatar} />
          <div className={styles.gridGlow} />
        </div>
      </section>

      <motion.section
        className="mt-48"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Featured Projects</h2>
        <p className="mb-16">A selection of my recent work</p>
        <div className={styles.projectGrid}>
          {featuredProjects.map((project, idx) => (
            <motion.article
              key={project.slug}
              className={'glass grain ' + styles.projectCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className={styles.projectThumb}>
                <div className={styles.thumbOverlay} />
              </div>
              <div className={styles.projectMeta}>
                <h3>
                  <Link to={`/projects/${project.slug}`}>{project.title}</Link>
                </h3>
                <p>{project.blurb}</p>
                <div className={styles.tags}>
                  {project.tech.slice(0, 4).map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="mt-24" style={{ textAlign: 'center' }}>
          <Link className="btn" to="/projects">View All Projects</Link>
        </div>
      </motion.section>
    </div>
  )
}
