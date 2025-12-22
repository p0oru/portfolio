import { Outlet, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import styles from './Layout.module.scss'
import Splash from '../Splash/Splash'
import MouseHalo from '../MouseHalo/MouseHalo'
import BackgroundFX from '../BackgroundFX'

export default function Layout() {
  return (
    <div className={styles.shell}>
      <BackgroundFX />
      <Splash />
      <MouseHalo />
      <header className={styles.header}>
        <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
          <NavLink to="/" className={styles.logo}>
            <span className={styles.logoMark}>▰</span>
            <span className={styles.logoText}>PuruSingh()</span>
          </NavLink>
          <nav className={styles.nav}>
            <NavLink to="/about" className={({ isActive }) => isActive ? styles.active : undefined}>About</NavLink>
            <NavLink to="/projects" className={({ isActive }) => isActive ? styles.active : undefined}>Projects</NavLink>
            <NavLink to="/blog" className={({ isActive }) => isActive ? styles.active : undefined}>Blog</NavLink>
            <NavLink to="/resume" className={({ isActive }) => isActive ? styles.active : undefined}>Resume</NavLink>
          </nav>
          <div className={styles.socials}>
            {/* Social links */}
            <a href="https://github.com/p0oru" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/purusingh2006/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="mailto:psing176@asu.edu" aria-label="Email"><FaEnvelope /></a>
          </div>
        </div>
      </header>

      <motion.main
        className={styles.main}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>

      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerRow}>
            <div className={styles.brand}>© {new Date().getFullYear()} Puru Singh. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}


