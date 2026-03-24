import { motion } from 'framer-motion'
import { useExperience } from '../hooks/useExperience'
import { useEducation } from '../hooks/useEducation'
import { useSettings } from '../hooks/useSettings'
import styles from './Resume.module.scss'

function formatDate(d) {
  if (!d) return 'Present'
  const [y, m] = d.split('-')
  return m ? `${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][parseInt(m)-1]} ${y}` : y
}

export default function Resume() {
  const { experience, loading: expLoading } = useExperience()
  const { education, loading: eduLoading } = useEducation()
  const { settings } = useSettings()

  return (
    <div className="container">
      <div className={styles.wrap}>
        <div className={styles.header}>
          <h1>Resume</h1>
          {settings.resume_url && (
            <a className="btn" href={settings.resume_url} download>Download</a>
          )}
        </div>

        <section className={styles.section}>
          <h2>Experience</h2>
          {expLoading ? <p style={{ color: 'var(--muted)' }}>Loading…</p> : (
            <div className={styles.timeline}>
              {experience.map((item, i) => (
                <motion.div
                  key={item.id}
                  className={styles.item}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <div className={styles.dot} />
                  <div className={styles.itemBody}>
                    <div className={styles.itemMeta}>
                      <span className={styles.company}>{item.company}</span>
                      <span className={styles.period}>{formatDate(item.start_date)} — {item.is_current ? 'Present' : formatDate(item.end_date)}</span>
                    </div>
                    <div className={styles.role}>{item.role}</div>
                    {item.description && <p className={styles.desc}>{item.description}</p>}
                    {(item.tech_tags || []).length > 0 && (
                      <div className={styles.tags}>
                        {item.tech_tags.map((t) => <span key={t} className="chip">{t}</span>)}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        <section className={styles.section}>
          <h2>Education</h2>
          {eduLoading ? <p style={{ color: 'var(--muted)' }}>Loading…</p> : (
            <div className={styles.timeline}>
              {education.map((item) => (
                <div key={item.id} className={styles.item}>
                  <div className={styles.dot} />
                  <div className={styles.itemBody}>
                    <div className={styles.itemMeta}>
                      <span className={styles.company}>{item.institution}</span>
                      <span className={styles.period}>{formatDate(item.start_date)} — {formatDate(item.end_date)}</span>
                    </div>
                    <div className={styles.role}>{item.degree} {item.field}</div>
                    {item.gpa && <p className={styles.desc}>GPA: {item.gpa}</p>}
                    {(item.honors || []).length > 0 && (
                      <div className={styles.tags}>
                        {item.honors.map((h) => <span key={h} className="chip">{h}</span>)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
