import { motion } from 'framer-motion'
import { FaUniversity, FaCode, FaGamepad, FaMobileAlt, FaTrophy, FaCheckCircle } from 'react-icons/fa'
import { SiAmazon as SiAWS, SiCoursera, SiJavascript } from 'react-icons/si'
import styles from './Resume.module.scss'
// Import the docx as a file URL (Vite will handle it in build)
import resumeUrl from '../../Resume_Puru_Singh.docx?url'

const certifications = [
  { title: "Dean's List", subtitle: 'Fall 2024, ASU', Icon: FaUniversity, year: '2024' },
  { title: 'Programming with JavaScript', subtitle: 'Meta (Coursera)', Icon: SiJavascript, year: '2024' },
  { title: 'Cloud Skills', subtitle: 'AWS Cloud Practitioner', Icon: SiAWS, year: '2024' },
  { title: 'App Development Certification', subtitle: 'WhiteHatJR', Icon: FaMobileAlt, year: '2022' },
  { title: 'Full Stack Development & AI', subtitle: 'WhiteHatJR', Icon: FaCode, year: '2022' },
  { title: 'Game Development Certification', subtitle: 'WhiteHatJR', Icon: FaGamepad, year: '2022' },
  { title: 'Website Development Internship', subtitle: 'Lunablaze', Icon: FaCode, year: '2023' },
  { title: 'IQube Distinction', subtitle: 'All India Rank 213', Icon: FaTrophy, year: '2016-17' },
]

const communityItems = [
  'Indo Science Trust & ISRO collaboration — Balloon Satellite mission volunteer and presenter.',
  'Local community initiatives — food distribution, campus clean‑up, and awareness campaigns.',
  'Student mentor — helped peers with coding challenges and project development.',
]

export default function Resume() {
  return (
    <div className="container">
      <section className={'glass grain ' + styles.wrap}>
        <h1>Resume</h1>
        <p className="mb-16">Download my complete resume below.</p>
        <div className={styles.actions}>
          {/* Direct download of the attached DOCX asset */}
          <a className={styles.downloadBtn} href={resumeUrl} download="Puru_Singh_Resume.docx">
            Download Resume
          </a>
        </div>

        {/* Experience Timeline - Full Width */}
        <div className={styles.timeline}>
          <div className={styles.item}>
            <div className={styles.pill}>2024 — Present</div>
            <div>
              <h3>B.S. Computer Science · Arizona State University</h3>
              <p>GPA: 3.8 · Dean's List (Fall 2024). Expected graduation: Fall 2028.</p>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.pill}>2023 — 2024</div>
            <div>
              <h3>Academic Assistant (Volunteer) · SNBP International School, Pune</h3>
              <p>Supported grading and exam proctoring for CS classes; applied rubric‑based evaluation and monitored compliance.</p>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.pill}>2023 — 2024</div>
            <div>
              <h3>Peer Group Project Facilitator · SNBP International School, Pune</h3>
              <p>Coordinated weekly sessions, designed mock assessments, and mentored students on debugging and problem breakdown.</p>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Certifications & Community */}
        <div className={styles.gridSection}>
          {/* Left Column: Certifications & Awards */}
          <motion.section
            className={styles.column}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className={styles.sectionTitle}>Certifications & Awards</h3>
            <div className={styles.certificationsGrid}>
              {certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  className={styles.certCard}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + idx * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={styles.certIcon}>
                    <cert.Icon />
                  </div>
                  <div className={styles.certContent}>
                    <div className={styles.certTitle}>{cert.title}</div>
                    <div className={styles.certSubtitle}>{cert.subtitle}</div>
                    <div className={styles.certYear}>{cert.year}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Right Column: Community & Leadership */}
          <motion.section
            className={styles.column}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className={styles.sectionTitle}>Community & Leadership</h3>
            <ul className={styles.communityList}>
              {communityItems.map((item, idx) => (
                <motion.li
                  key={idx}
                  className={styles.communityItem}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.05 }}
                >
                  <FaCheckCircle className={styles.checkIcon} />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.section>
        </div>
      </section>
    </div>
  )
}


