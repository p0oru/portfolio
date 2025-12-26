import styles from './Home.module.scss'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import { SiReact, SiNodedotjs, SiPython, SiAwsamplify, SiTypescript } from 'react-icons/si'
import ProjectCard from '../components/ProjectCard/ProjectCard'

const featuredProjects = projects.slice(0, 3)

const handleScrollToProjects = (e) => {
  e.preventDefault()
  const projectsSection = document.getElementById('projects')
  if (projectsSection) {
    projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else {
    // Fallback to navigation if section not found
    window.location.href = '/#projects'
  }
}

export default function Home() {
  return (
    <div className="container">
      <section className={'glass grain ' + styles.hero}>
        <div className={styles.heroContent}>
          <motion.div
            className={styles.socialBadge}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            ASU Dean's List • 3.6 GPA
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Hi, I'm <span className={styles.gradient}>Puru Singh</span>
          </motion.h1>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Computer Science student at ASU building full‑stack and AI‑powered applications. 
            I turn complex problems into elegant, scalable solutions.
          </motion.p>
          <motion.div
            className={styles.ctaRow}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a className={styles.ctaPrimary} href="#projects" onClick={handleScrollToProjects}>
              View Projects
            </a>
            <Link className={styles.ctaSecondary} to="/about">About Me</Link>
          </motion.div>
          <motion.div
            className={styles.techStack}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className={styles.techLabel}>Tech Stack</span>
            <div className={styles.techIcons}>
              <SiReact title="React" />
              <SiNodedotjs title="Node.js" />
              <SiPython title="Python" />
              <SiAwsamplify title="AWS" />
              <SiTypescript title="TypeScript" />
            </div>
          </motion.div>
        </div>
        <div className={styles.heroArt}>
          <div className={styles.sphere} />
          <img src="/pfp.jpg" alt="Puru Singh" className={styles.heroAvatar} />
          <div className={styles.gridGlow} />
        </div>
      </section>

      <motion.section
        id="projects"
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
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
        <div className="mt-24" style={{ textAlign: 'center' }}>
          <Link className="btn" to="/projects">View All Projects</Link>
        </div>
      </motion.section>
    </div>
  )
}
