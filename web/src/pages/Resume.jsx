import styles from './Resume.module.scss'
// Import the docx as a file URL (Vite will handle it in build)
import resumeUrl from '../../Resume_Puru_Singh.docx?url'

export default function Resume() {
  return (
    <div className="container">
      <section className={'glass grain ' + styles.wrap}>
        <h1>Resume</h1>
        <p className="mb-16">Download my complete resume below.</p>
        <div className={styles.actions}>
          {/* Direct download of the attached DOCX asset */}
          <a className="btn" href={resumeUrl} download="Puru_Singh_Resume.docx">Download Resume</a>
        </div>
        <div className={styles.timeline}>
          <div className={styles.item}>
            <div className={styles.pill}>2024 — Present</div>
            <div>
              <h3>B.S. Computer Science · Arizona State University</h3>
              <p>GPA: 3.8 · Dean’s List (Fall 2024). Expected graduation: Fall 2028.</p>
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

        <div className="mt-40" />
        <section className={'glass grain'} style={{ padding: 18, borderRadius: 14 }}>
          <h3>Certifications & Achievements</h3>
          <ul>
            <li>Dean’s List – Fall 2024, ASU</li>
            <li>Programming with JavaScript – Meta (Coursera, 2024)</li>
            <li>Website Development Internship – Lunablaze (2023)</li>
            <li>Full Stack Development & AI App Development – WhiteHatJR (2022)</li>
            <li>Game Development Certification – WhiteHatJR (2022)</li>
            <li>App Development Certification – WhiteHatJR (2022)</li>
            <li>IQube Distinction – All India Rank 213 (2016–17)</li>
          </ul>
        </section>

        <div className="mt-24" />
        <section className={'glass grain'} style={{ padding: 18, borderRadius: 14 }}>
          <h3>Community Involvement</h3>
          <ul>
            <li>Indo Science Trust & ISRO collaboration — Balloon Satellite mission volunteer and presenter.</li>
            <li>Local community initiatives — food distribution, campus clean‑up, and awareness campaigns.</li>
            <li>Student mentor — helped peers with coding challenges and project development.</li>
          </ul>
        </section>
      </section>
    </div>
  )
}


