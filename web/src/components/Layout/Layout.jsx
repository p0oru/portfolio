import { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa'
import styles from './Layout.module.scss'

const NAV_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/resume', label: 'Resume' },
]

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={'container ' + styles.headerInner}>
          <NavLink to="/" className={styles.logo}>Puru Singh</NavLink>
          <nav className={styles.nav}>
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink key={to} to={to} className={({ isActive }) => styles.link + (isActive ? ' ' + styles.active : '')}>
                {label}
              </NavLink>
            ))}
          </nav>
          <div className={styles.socials}>
            <a href="https://github.com/p0oru" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/purusingh2006/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="mailto:psing176@asu.edu" aria-label="Email"><FaEnvelope /></a>
          </div>
          <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink key={to} to={to} className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
                {label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.main
        className={styles.main}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28 }}
      >
        <Outlet />
      </motion.main>

      <footer className={styles.footer}>
        <div className="container">
          <p>© {new Date().getFullYear()} Puru Singh</p>
        </div>
      </footer>
    </div>
  )
}
