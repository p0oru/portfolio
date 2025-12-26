import { Link, useNavigate } from 'react-router-dom'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import styles from './ProjectCard.module.scss'

export default function ProjectCard({ project }) {
  const navigate = useNavigate()

  const handleViewDetails = (e) => {
    e.preventDefault()
    navigate(`/projects/${project.slug}`)
  }

  const handleContact = (e) => {
    e.preventDefault()
    // Scroll to contact section or open email
    const contactSection = document.getElementById('contact') || document.querySelector('a[href*="mailto"]')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = '/#about'
    }
  }

  return (
    <article className={'glass grain ' + styles.card}>
      <div className={styles.thumb} />
      <div className={styles.meta}>
        <h3>
          <Link to={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        {project.tagline && (
          <p className={styles.tagline}>{project.tagline}</p>
        )}
        <p className={styles.description}>{project.description}</p>
        
        <div className={styles.tags}>
          {project.tech.map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>

        <div className={styles.actions}>
          {project.isPrivate ? (
            <>
              <button 
                className={styles.enterpriseBtn}
                onClick={handleContact}
                title="Contact for enterprise project details"
              >
                🔒 Enterprise Project
              </button>
              <button 
                className={styles.viewDetailsBtn}
                onClick={handleViewDetails}
              >
                View Details
              </button>
            </>
          ) : (
            <>
              {project.links.github && (
                <a 
                  className={styles.actionBtn}
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  title="View source code on GitHub"
                >
                  <FaGithub /> GitHub
                </a>
              )}
              {project.links.live && (
                <a 
                  className={styles.actionBtn}
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  title="View live demo"
                >
                  <FaExternalLinkAlt /> Live Demo
                </a>
              )}
              {!project.links.github && !project.links.live && (
                <Link className={styles.actionBtn} to={`/projects/${project.slug}`}>
                  View Details
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  )
}


