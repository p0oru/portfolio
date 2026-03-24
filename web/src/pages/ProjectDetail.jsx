import { useParams, Link } from 'react-router-dom'
import { marked } from 'marked'
import { useProject } from '../hooks/useProjects'
import styles from './ProjectDetail.module.scss'

export default function ProjectDetail() {
  const { slug } = useParams()
  const { project, loading } = useProject(slug)

  if (loading) return <div className="container" style={{ paddingTop: 40, color: 'var(--muted)' }}>Loading…</div>
  if (!project) return <div className="container" style={{ paddingTop: 40 }}><p>Project not found.</p><Link to="/projects" className="btn-ghost">Back</Link></div>

  const isPublic = project.links?.github || project.links?.live

  return (
    <div className="container">
      <div className={styles.wrap}>
        <Link to="/projects" className={styles.back}>← Projects</Link>
        <div className={styles.badges}>
          {project.featured && <span className={styles.featured}>Featured</span>}
          <span className={isPublic ? styles.public : styles.private}>{isPublic ? 'Public' : 'Private'}</span>
        </div>
        <h1 className={styles.title}>{project.title}</h1>
        {project.tagline && <p className={styles.tagline}>{project.tagline}</p>}
        {(project.tech_stack || []).length > 0 && (
          <div className={styles.stack}>
            {(project.tech_stack || []).map((t) => <span key={t} className="chip">{t}</span>)}
          </div>
        )}
        {(project.links?.github || project.links?.live) && (
          <div className={styles.links}>
            {project.links.github && <a href={project.links.github} target="_blank" rel="noreferrer" className="btn">GitHub ↗</a>}
            {project.links.live && <a href={project.links.live} target="_blank" rel="noreferrer" className="btn-ghost">Live ↗</a>}
          </div>
        )}
        <div className="divider" />
        {project.long_desc && (
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: marked.parse(project.long_desc) }}
          />
        )}
      </div>
    </div>
  )
}
