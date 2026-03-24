import { Link } from 'react-router-dom'
import styles from './ProjectCard.module.scss'

export default function ProjectCard({ project }) {
  const { slug, title, tagline, short_desc, tech_stack = [], links = {}, featured } = project
  const isPublic = links.github || links.live

  return (
    <Link to={`/projects/${slug}`} className={styles.card}>
      <div className={styles.top}>
        <div className={styles.badges}>
          {featured && <span className={styles.featured}>Featured</span>}
          <span className={isPublic ? styles.public : styles.private}>
            {isPublic ? 'Public' : 'Private'}
          </span>
        </div>
      </div>
      <h3 className={styles.title}>{title}</h3>
      {tagline && <p className={styles.tagline}>{tagline}</p>}
      {short_desc && <p className={styles.desc}>{short_desc}</p>}
      <div className={styles.stack}>
        {tech_stack.slice(0, 4).map((t) => (
          <span key={t} className={styles.tag}>{t}</span>
        ))}
        {tech_stack.length > 4 && <span className={styles.tag}>+{tech_stack.length - 4}</span>}
      </div>
    </Link>
  )
}
