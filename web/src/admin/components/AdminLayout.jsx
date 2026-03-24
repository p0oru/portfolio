import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../useAuth'
import styles from './AdminLayout.module.scss'

const NAV = [
  { to: '/admin/projects',   label: 'Projects' },
  { to: '/admin/blog',       label: 'Blog' },
  { to: '/admin/experience', label: 'Experience' },
  { to: '/admin/education',  label: 'Education' },
  { to: '/admin/skills',     label: 'Skills' },
  { to: '/admin/media',      label: 'Media' },
  { to: '/admin/about',      label: 'About' },
  { to: '/admin/settings',   label: 'Settings' },
]

export default function AdminLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/admin')
  }

  return (
    <div className={'admin-shell ' + styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>puru.live</div>
        <nav className={styles.nav}>
          {NAV.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => styles.link + (isActive ? ' ' + styles.active : '')}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <button className={styles.logout} onClick={handleLogout}>Log out</button>
      </aside>
      <div className={styles.body}>
        <header className={styles.topbar}>
          <span className={styles.topbarTitle}>Admin Panel</span>
          <a href="https://puru.live" target="_blank" rel="noreferrer" className={styles.viewSite}>
            View site ↗
          </a>
        </header>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
