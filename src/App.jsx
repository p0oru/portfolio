import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import BlogIndex from './pages/BlogIndex'
import BlogPost from './pages/BlogPost'
import Resume from './pages/Resume'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AnimatePresence mode="wait">
        <Routes>
          <Route element={<Layout />}> 
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="projects" element={<Projects />} />
            <Route path="blog" element={<BlogIndex />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="resume" element={<Resume />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  )
}

export default App
