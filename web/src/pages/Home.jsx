import { motion } from 'framer-motion'
import { useState } from 'react'
import styles from './Home.module.scss'
import { Link } from 'react-router-dom'
import { projects as data } from '../data/projects'

export default function Home() {
  const [imgError, setImgError] = useState(false)
  return (
    <div className="container">
      <motion.section className={styles.hero + ' glass grain'} initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true, amount:.2}} transition={{duration:.5}}>
        <div className={styles.heroContent}>
          <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            Hey, I’m <span className={styles.gradient}>Puru Singh</span>
          </motion.h1>
          <p className={styles.subtitle}>CS @ ASU · I build full‑stack & AI‑powered apps—fast, reliable, and enjoyable to use.</p>
          <div className={styles.ctaRow}>
            <Link to="/projects" className="btn" onMouseMove={(e)=>{
              const r=e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
              e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
            }}>Explore Projects</Link>
            <Link to="/resume" className={styles.ctaSecondary} onMouseMove={(e)=>{
              const r=e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
              e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
            }}>View Resume</Link>
          </div>
          <div className="neon-divider mt-24" />
          <ul className={styles.skills}>
            <li className="chip">React</li>
            <li className="chip">Node.js</li>
            <li className="chip">Python</li>
            <li className="chip">Java</li>
            <li className="chip">FastAPI</li>
            <li className="chip">Express</li>
            <li className="chip">MySQL</li>
            <li className="chip">Firebase</li>
            <li className="chip">AWS</li>
            <li className="chip">Docker</li>
            <li className="chip">RAG</li>
            <li className="chip">JWT / RBAC</li>
          </ul>
        </div>
        <div className={styles.heroArt}>
          {imgError ? (
            <div className={styles.sphere} aria-label="Portrait placeholder" />
          ) : (
            <img
              className={styles.heroAvatar}
              src="/pfp.jpg"
              alt="Portrait of Puru Singh"
              onError={() => setImgError(true)}
            />
          )}
          <div className={styles.gridGlow} />
        </div>
      </motion.section>

      <motion.section className="mt-40" initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true, amount:.2}} transition={{duration:.5}}>
        <h2 className="mb-16">Featured Projects</h2>
        <div className={styles.projectGrid}>
          {data.filter(p => ['stayora', 'domainflow', 'rce-engine'].includes(p.slug)).map((p)=> (
            <Link key={p.slug} to={`/projects/${p.slug}`} className={styles.projectCard + ' glass'}>
              <div className={styles.projectThumb}><div className={styles.thumbOverlay} /></div>
              <div className={styles.projectMeta}>
                <h3>{p.title}</h3>
                <p>{p.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </motion.section>
    </div>
  )
}


