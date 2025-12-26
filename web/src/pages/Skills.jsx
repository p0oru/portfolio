import { motion } from 'framer-motion'
import { featuredSkills, skillCategories } from '../data/skills'
import styles from './Skills.module.scss'

export default function Skills() {
  return (
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Skills</h1>
        <p className="mb-16">A snapshot of technologies and professional strengths I use to build and ship.</p>
      </motion.div>

      {/* Featured Skills - Large Glowing Cards */}
      <motion.section
        className={styles.featuredSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2 className={styles.sectionTitle}>Featured</h2>
        <div className={styles.featuredGrid}>
          {featuredSkills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              className={styles.featuredCard}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className={styles.iconWrapper}>
                <skill.Icon className={styles.featuredIcon} />
              </div>
              <span className={styles.featuredName}>{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Categorized Skills - Pill Tags */}
      <div className={styles.categoriesSection}>
        {skillCategories.map((category, catIdx) => (
          <motion.section
            key={category.title}
            className={styles.categorySection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + catIdx * 0.1 }}
          >
            <h3 className={styles.categoryTitle}>{category.title}</h3>
            <div className={styles.pillsGrid}>
              {category.items.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  className={styles.skillPill}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + catIdx * 0.1 + idx * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <skill.Icon className={styles.pillIcon} />
                  <span>{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  )
}
