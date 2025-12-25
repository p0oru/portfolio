import { HashRouter, Route, Routes } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import BlogIndex from './pages/BlogIndex'
import BlogPost from './pages/BlogPost'
import Resume from './pages/Resume'
import ProjectDetail from './pages/ProjectDetail'
import Skills from './pages/Skills'

function App() {
  return (
    <HashRouter>
      <AnimatePresence mode="wait">
        <Routes>
          <Route element={<Layout />}> 
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:slug" element={<ProjectDetail />} />
            <Route path="blog" element={<BlogIndex />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="resume" element={<Resume />} />
            <Route path="skills" element={<Skills />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </HashRouter>
  )
}

export default App
