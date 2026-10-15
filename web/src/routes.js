import { index, layout, route } from '@react-router/dev/routes'

export default [
  layout('components/Layout/Layout.jsx', [
    index('pages/Home.jsx'),
    route('about', 'pages/About.jsx'),
    route('projects', 'pages/Projects.jsx'),
    route('projects/:slug', 'pages/ProjectDetail.jsx'),
    route('blog', 'pages/BlogIndex.jsx'),
    route('blog/:slug', 'pages/BlogPost.jsx'),
    route('resume', 'pages/Resume.jsx'),
    route('skills', 'pages/Skills.jsx'),
    route('*', 'pages/NotFound.jsx'),
  ]),
  route('sitemap.xml', 'routes/sitemap.js'),
]
