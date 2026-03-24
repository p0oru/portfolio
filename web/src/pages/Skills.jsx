import { useSkills } from '../hooks/useSkills'
import styles from './Skills.module.scss'

export default function Skills() {
  const { skills, loading } = useSkills()

  return (
    <div className="container">
      <div className={styles.header}>
        <h1>Skills</h1>
        <p className={styles.sub}>Technologies I work with</p>
      </div>
      {loading ? <p style={{ color: 'var(--muted)' }}>Loading…</p> : (
        <div className={styles.grid}>
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className={styles.group}>
              <h3 className={styles.category}>{category}</h3>
              <div className={styles.chips}>
                {items.map((s) => (
                  <span key={s.id} className={styles.chip}>
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
