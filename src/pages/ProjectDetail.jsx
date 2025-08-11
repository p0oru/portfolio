import { useParams, Link } from 'react-router-dom'
import { getProjectBySlug } from '../data/projects'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) {
    return (
      <div className="container">
        <div className="glass" style={{ padding: 24, borderRadius: 14 }}>
          <h1>Project not found</h1>
          <p>We couldn’t find this project.</p>
          <p><Link className="btn" to="/projects">Back to Projects</Link></p>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <article className="glass grain" style={{ padding: 24, borderRadius: 14 }}>
        <h1>{project.title}</h1>
        <p style={{ color: 'var(--muted)' }}>{project.blurb}</p>
        <div className="mt-24 neon-divider" />
        <div className="mt-24" style={{ display: 'grid', gap: 14 }}>
          <p>{project.description}</p>
          <ul>
            {project.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          {(project.sections || []).map((sec) => (
            <section key={sec.title} className="mt-24">
              <h3>{sec.title}</h3>
              <ul>
                {sec.items.map((it, idx) => (
                  <li key={idx}>{it}</li>
                ))}
              </ul>
            </section>
          ))}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {project.tech.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
        </div>
        <div className="mt-24" style={{ display: 'flex', gap: 12 }}>
          {project.links.live && <a className="btn" href={project.links.live} target="_blank" rel="noreferrer">Live</a>}
          {project.links.github && <a className="btn" href={project.links.github} target="_blank" rel="noreferrer">Source</a>}
          <Link className="btn" to="/projects">Back</Link>
        </div>
      </article>
    </div>
  )
}


