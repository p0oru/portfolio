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

export const SITE_NAME = 'Puru Singh'
export const OG_IMAGE = `${SITE_URL}/pfp.jpg`

export function titleFor(section) {
  return `${section} · ${SITE_NAME}`
}

// Search engines show roughly the first 160 characters of a description
export function truncate(text, max = 160) {
  const clean = (text || '').replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max - 1)
  const space = cut.lastIndexOf(' ')
  return (space > 0 ? cut.slice(0, space) : cut) + '…'
}

// React Router uses only the deepest matching route's meta, so every page returns the full set
export function pageMeta({ title, description, path, type = 'website', noindex = false }) {
  const desc = truncate(description)
  const url = canonicalUrl(path)
  return [
    { title },
    { name: 'description', content: desc },
    noindex ? { name: 'robots', content: 'noindex' } : { tagName: 'link', rel: 'canonical', href: url },
    { property: 'og:type', content: type },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:title', content: title },
    { property: 'og:description', content: desc },
    { property: 'og:url', content: url },
    { property: 'og:image', content: OG_IMAGE },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: desc },
    { name: 'twitter:image', content: OG_IMAGE },
  ]
}
