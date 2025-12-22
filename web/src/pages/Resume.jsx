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

        {/* Education */}
        <div className="mt-40" />
        <section className={'glass grain'} style={{ padding: 18, borderRadius: 14 }}>
          <h3>Education</h3>
          <div className={styles.timeline}>
            <div className={styles.item}>
              <div className={styles.pill}>2024–2027</div>
              <div>
                <h3>Bachelor of Science in Computer Science · Arizona State University</h3>
                <p>Ira A. Fulton Schools of Engineering, Tempe · GPA: 3.6</p>
                <p style={{ marginTop: 8, color: 'var(--muted)' }}>
                  Sophomore pursuing B.S. in Computer Science with a strong interest in using technology to build practical and impactful solutions. 
                  Hands-on experience in full-stack development and AI, working on projects focused on improving system efficiency and user experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <div className="mt-24" />
        <section className={'glass grain'} style={{ padding: 18, borderRadius: 14 }}>
          <h3>Experience</h3>
          <div className={styles.timeline}>
            <div className={styles.item}>
              <div className={styles.pill}>May–Aug 2025</div>
              <div>
                <h3>Software Developer Intern · 3P Innovations Pvt Ltd</h3>
                <p>Built and shipped three production-grade platforms used for analytics, AI automation, and scalable data processing:</p>
                <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                  <li>Real-time hotel intelligence dashboard with AI-powered analytics</li>
                  <li>AI-driven domain modeling tool for business requirements</li>
                  <li>Personalized AI learning system with adaptive content generation</li>
                </ul>
                <p style={{ marginTop: 12 }}>
                  Developed full-stack systems using React, Node.js, MySQL, and AWS. Integrated AI (OpenAI, Gemini, Groq) for domain modeling, 
                  contextual assistants, and adaptive content generation. Implemented secure authentication using JWT, RBAC, and bcrypt. 
                  Built real-time dashboards and scalable backend APIs. Deployed end-to-end applications and optimized performance across microservices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Skills */}
        <div className="mt-24" />
        <section className={'glass grain'} style={{ padding: 18, borderRadius: 14 }}>
          <h3>Technical Skills</h3>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <strong>Languages:</strong> Python, Java, C, C++, JavaScript (Node.js, React), SQL (MySQL), HTML/CSS
            </div>
            <div>
              <strong>Frameworks & Tools:</strong> FastAPI, ChromaDB, Google Firebase, AWS (EC2, S3), Docker, Git, Material UI
            </div>
            <div>
              <strong>Core Skills:</strong> Data Structures & Algorithms, Object-Oriented Programming, System Design, API Development, RAG, Authentication (JWT, RBAC)
            </div>
            <div>
              <strong>Professional:</strong> Problem-Solving, System Design Thinking, Collaboration, Agile SDLC
            </div>
          </div>
        </section>

        {/* Technical Projects */}
        <div className="mt-24" />
        <section className={'glass grain'} style={{ padding: 18, borderRadius: 14 }}>
          <h3>Technical Projects</h3>
          <div style={{ display: 'grid', gap: 20 }}>
            <div>
              <h4 style={{ marginBottom: 8 }}>DomainFlow — AI Domain Modeling Tool</h4>
              <p style={{ color: 'var(--muted)', fontSize: '0.9em', marginBottom: 8 }}>
                Backend · Systems Design · Automation | React, Express, MySQL
              </p>
              <ul style={{ paddingLeft: 20 }}>
                <li>Automated creation of UML diagrams & domain models from project context using LLMs</li>
                <li>Designed AI-assisted system that converts project context into structured domain models, significantly reducing design time</li>
                <li>Implemented secure authentication using JWT, RBAC, and bcrypt hashing</li>
                <li>Built interactive UML diagramming tool using React Konva with drag-and-drop modeling and export functionality</li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: 8 }}>Stayora — AI Hotel Insights Dashboard</h4>
              <p style={{ color: 'var(--muted)', fontSize: '0.9em', marginBottom: 8 }}>
                AI/ML · Data Engineering · Backend Systems | React, FastAPI, Node.js, MySQL, OpenAI
              </p>
              <ul style={{ paddingLeft: 20 }}>
                <li>Developed text-to-SQL engine converting natural-language queries into secure SQL statements</li>
                <li>Implemented distributed RAG architecture with ChromaDB for contextual AI responses</li>
                <li>Built Python FastAPI microservice for sentiment and review analysis with vector search</li>
                <li>Engineered dynamic React dashboard supporting asynchronous data fetching and interactive visualizations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <div className="mt-24" />
        <section className={'glass grain'} style={{ padding: 18, borderRadius: 14 }}>
          <h3>Certifications & Achievements</h3>
          <ul>
            <li>Dean's List – Fall 2024, Arizona State University</li>
            <li>Programming with JavaScript – Meta (Coursera, 2024)</li>
            <li>Website Development Internship – Lunablaze (2023)</li>
            <li>Full Stack Development & AI App Development – WhiteHatJR (2022)</li>
          </ul>
        </section>

        {/* Leadership & Community */}
        <div className="mt-24" />
        <section className={'glass grain'} style={{ padding: 18, borderRadius: 14 }}>
          <h3>Leadership & Community</h3>
          <ul>
            <li><strong>Indo Science Trust + ISRO Collaboration:</strong> Contributed to Balloon Satellite mission; delivered technical STEM talks</li>
            <li><strong>Peer Mentor:</strong> Assisted students with debugging, project guidance, and coding fundamentals</li>
          </ul>
        </section>

        {/* Work Authorization */}
        <div className="mt-24" />
        <section className={'glass grain'} style={{ padding: 18, borderRadius: 14 }}>
          <h3>Work Authorization</h3>
          <p>
            Legally authorized to work in the U.S. for internship roles under F-1 visa (CPT eligible). 
            Requires no visa sponsorship for internship duration. Eligible for Full-Time (OPT) authorization post-graduation.
          </p>
        </section>
      </section>
    </div>
  )
}


