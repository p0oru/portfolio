import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { useSettings } from '../hooks/useSettings'
import { useSkills } from '../hooks/useSkills'
import styles from './About.module.scss'

export default function About() {
  const { settings } = useSettings()
  const { skills } = useSkills()

  return (
    <div className="container">
      <div className={styles.wrap}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1>{settings.name || 'Puru Singh'}</h1>
          {settings.location && <p className={styles.location}>{settings.location}</p>}
          {settings.bio && <p className={styles.bio}>{settings.bio}</p>}

          <div className={styles.ctaRow}>
            {settings.email && <a href={`mailto:${settings.email}`} className="btn"><FaEnvelope /> Email</a>}
            {settings.linkedin_url && <a href={settings.linkedin_url} target="_blank" rel="noreferrer" className="btn-ghost"><FaLinkedin /> LinkedIn</a>}
            {settings.github_url && <a href={settings.github_url} target="_blank" rel="noreferrer" className="btn-ghost"><FaGithub /> GitHub</a>}
          </div>
        </motion.div>

        {Object.keys(skills).length > 0 && (
          <section className={styles.section}>
            <h2>Skills</h2>
            <div className={styles.skillsGrid}>
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className={styles.skillGroup}>
                  <h4 className={styles.category}>{category}</h4>
                  <div className={styles.chips}>
                    {items.map((s) => <span key={s.id} className="chip">{s.name}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className={styles.section}>
          <h2>How I work</h2>
          <ul className={styles.list}>
            <li>Ship in small, measurable iterations.</li>
            <li>Design for accessibility and predictable performance.</li>
            <li>Readable code, descriptive names, and helpful tests.</li>
            <li>Async-first collaboration; crisp PRs and thoughtful reviews.</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
