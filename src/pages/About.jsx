import styles from './About.module.scss'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { skillCategories } from '../data/skills'

export default function About() {
  return (
    <div className="container">
      <section className={'glass grain ' + styles.wrap}>
        <div className={styles.layout}>
          <div>
            <h1>About Me</h1>
            <p className="mb-16">I’m Puru Singh, a Computer Science student at Arizona State University (GPA 3.8; Dean’s List Fall 2024). I build full‑stack and AI‑powered apps that streamline workflows and elevate UX. I enjoy mentoring peers and contributing to campus and community projects.</p>

            <motion.section className={styles.section}
              initial={{opacity:0, y:12}}
              whileInView={{opacity:1, y:0}}
              viewport={{once:true, amount:.2}}
              transition={{duration:.5}}
            >
              <h3>Quick facts</h3>
              <ul className={styles.facts}>
                <li className="chip" title="Tempe, Arizona">Tempe, AZ (MST)</li>
                <li className="chip" title="Graduation term">B.S. CS — Fall 2028</li>
                <li className="chip" title="GPA">GPA 3.8</li>
                <li className="chip" title="Dean’s List">Dean’s List — Fall 2024</li>
                <li className="chip" title="Availability">Open to on‑campus tech roles</li>
              </ul>
            </motion.section>

            <motion.section className={styles.section}
              initial={{opacity:0, y:12}}
              whileInView={{opacity:1, y:0}}
              viewport={{once:true, amount:.2}}
              transition={{duration:.5, delay:.05}}
            >
              <h3>How I work</h3>
              <ul className={styles.bullets}>
                <li>Ship in small, measurable iterations.</li>
                <li>Design for accessibility and predictable performance.</li>
                <li>Readable code, descriptive names, and helpful tests.</li>
                <li>Async‑first collaboration; crisp PRs and thoughtful reviews.</li>
              </ul>
            </motion.section>

            <motion.section className={styles.section}
              initial={{opacity:0, y:12}}
              whileInView={{opacity:1, y:0}}
              viewport={{once:true, amount:.2}}
              transition={{duration:.5, delay:.1}}
            >
              <h3>Skills</h3>
              <div className={styles.skillSections}>
                {skillCategories.map((cat) => (
                  <div key={cat.title} className={'glass ' + styles.skillCard}>
                    <div className={styles.skillHead}>
                      <h4>{cat.title}</h4>
                      <p className={styles.skillDesc}>{cat.description}</p>
                    </div>
                    <div className={styles.skillList}>
                      {cat.items.map(({ label, Icon }) => (
                        <div key={label} className={styles.skillItem}>
                          {Icon && <Icon size={18} />}
                          <span>{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section className={styles.section}
              initial={{opacity:0, y:12}}
              whileInView={{opacity:1, y:0}}
              viewport={{once:true, amount:.2}}
              transition={{duration:.5, delay:.15}}
            >
              <h3>Milestones</h3>
              <div className={styles.timeline}>
                <div className={styles.tItem}>
                  <div className={styles.tTime}>2024‑Present</div>
                  <div>
                    <strong>Arizona State University — B.S. CS</strong>
                    <div>Dean’s List (Fall 2024). Building full‑stack & AI projects.</div>
                  </div>
                </div>
                <div className={styles.tItem}>
                  <div className={styles.tTime}>2023‑2024</div>
                  <div>
                    <strong>Academic Assistant · SNBP International School</strong>
                    <div>Supported grading, proctoring, and rubric‑based evaluation for CS.</div>
                  </div>
                </div>
                <div className={styles.tItem}>
                  <div className={styles.tTime}>2023‑2024</div>
                  <div>
                    <strong>Peer Group Project Facilitator</strong>
                    <div>Led weekly sessions, mock assessments, and debugging guidance.</div>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section className={styles.section}
              initial={{opacity:0, y:12}}
              whileInView={{opacity:1, y:0}}
              viewport={{once:true, amount:.2}}
              transition={{duration:.5, delay:.2}}
            >
              <h3>Get in touch</h3>
              <div className={styles.ctaRow}>
                <a className="btn" href="mailto:psing176@asu.edu">Email</a>
                <a className="btn" href="https://www.linkedin.com/in/purusingh2006/" target="_blank" rel="noreferrer">LinkedIn</a>
                <Link className={styles.ctaSecondary} to="/resume">View Resume</Link>
              </div>
            </motion.section>

          </div>
        </div>
      </section>
    </div>
  )
}


