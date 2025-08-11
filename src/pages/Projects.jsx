import styles from './Projects.module.scss'
import Tilt from '../components/Tilt'
import { Link } from 'react-router-dom'
import { projects as data } from '../data/projects'

const demoProjects = data

export default function Projects() {
  return (
    <div className="container">
      <h1>Projects</h1>
      <p className="mb-16">Short, visual showcases. Click to learn more.</p>
      <div className={styles.grid}>
        {demoProjects.map((p, idx) => (
          <Tilt key={idx}>
            <article className={'glass grain ' + styles.card}>
              <div className={styles.thumb} />
              <div className={styles.meta}>
                <h3><Link to={`/projects/${p.slug}`}>{p.title}</Link></h3>
                <p>{p.blurb}</p>
                <div className={styles.tags}>
                  {p.tech.map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              </div>
            </article>
          </Tilt>
        ))}
      </div>
    </div>
  )
}


