import projects from '../data/projects.json'
import posts from '../data/posts.json'

export const SITE_URL = 'https://puru.live'

// Pages without URL params — keep in sync with src/routes.js (scripts/check-build.js catches drift)
export const STATIC_PAGES = ['/', '/about', '/projects', '/blog', '/resume', '/skills']

export function contentPages() {
  return [
    ...projects.map((p) => `/projects/${p.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ]
}

export function sitePages() {
  return [...STATIC_PAGES, ...contentPages()]
}

// Prerendering writes about/index.html, which Cloudflare Pages serves at /about/
export function canonicalPath(path) {
  return path.endsWith('/') ? path : `${path}/`
}

export function canonicalUrl(path) {
  return SITE_URL + canonicalPath(path)
}
