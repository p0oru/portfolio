import { Route, Routes, Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'
import AdminLogin from './components/AdminLogin'
import AdminLayout from './components/AdminLayout'
import AdminProjects from './pages/AdminProjects'
import AdminBlog from './pages/AdminBlog'
import AdminExperience from './pages/AdminExperience'
import AdminEducation from './pages/AdminEducation'
import AdminSkills from './pages/AdminSkills'
import AdminMedia from './pages/AdminMedia'
import AdminAbout from './pages/AdminAbout'
import AdminSettings from './pages/AdminSettings'

export default function AdminApp() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) return <AdminLogin />

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Navigate to="projects" replace />} />
        <Route path="projects"   element={<AdminProjects />} />
        <Route path="blog"       element={<AdminBlog />} />
        <Route path="experience" element={<AdminExperience />} />
        <Route path="education"  element={<AdminEducation />} />
        <Route path="skills"     element={<AdminSkills />} />
        <Route path="media"      element={<AdminMedia />} />
        <Route path="about"      element={<AdminAbout />} />
        <Route path="settings"   element={<AdminSettings />} />
      </Route>
    </Routes>
  )
}
