import styles from './Projects.module.scss'
import Tilt from '../components/Tilt'
import ProjectCard from '../components/ProjectCard/ProjectCard'
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
            <ProjectCard project={p} />
          </Tilt>
        ))}
      </div>
    </div>
  )
}


