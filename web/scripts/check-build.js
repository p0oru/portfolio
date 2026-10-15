// Verifies the prerendered site in build/client. Run after `npm run build`.
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const CLIENT = 'build/client'
const SITE = 'https://puru.live'

const readJson = (file) => JSON.parse(readFileSync(join('src/data', file), 'utf8'))
const projects = readJson('projects.json')
const posts = readJson('posts.json')
const settings = readJson('settings.json')

const pages = [
  '/', '/about/', '/projects/', '/blog/', '/resume/', '/skills/',
  ...projects.map((p) => `/projects/${p.slug}/`),
  ...posts.map((p) => `/blog/${p.slug}/`),
]

const failures = []
const check = (ok, message) => { if (!ok) failures.push(message) }
const read = (file) => (existsSync(join(CLIENT, file)) ? readFileSync(join(CLIENT, file), 'utf8') : '')
const htmlFileFor = (page) => (page === '/' ? 'index.html' : `${page.slice(1)}index.html`)
const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;')

for (const page of pages) {
  const html = read(htmlFileFor(page))
  if (!html) {
    failures.push(`${page}: missing ${htmlFileFor(page)}`)
    continue
  }
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? ''
  check(title.includes('Puru Singh'), `${page}: title "${title}" lacks "Puru Singh"`)
  check(/<meta name="description" content="[^"]{40,}"/.test(html), `${page}: missing or short meta description`)
  check(html.includes(`<link rel="canonical" href="${SITE}${page}"/>`), `${page}: canonical is not ${SITE}${page}`)
  for (const tag of ['og:title', 'og:description', 'og:url', 'og:image']) {
    check(html.includes(`property="${tag}"`), `${page}: missing ${tag}`)
  }
  check(html.includes('name="twitter:card"'), `${page}: missing twitter:card`)
  check(html.includes('href="/favicon.svg"'), `${page}: missing favicon link`)
  check(html.includes('<noscript>'), `${page}: missing noscript fallback`)
  check(/<div id="root">[\s\S]*<h1/.test(html), `${page}: no prerendered <h1> inside #root`)
}

const home = read('index.html')
const jsonLd = []
for (const [, json] of home.matchAll(/<script type="application\/ld\+json">([^<]*)<\/script>/g)) {
  try {
    jsonLd.push(JSON.parse(json))
  } catch {
    failures.push('home: a JSON-LD block is not valid JSON')
  }
}
const person = jsonLd.find((d) => d['@type'] === 'Person')
check(person?.name === settings.name, 'home: missing Person JSON-LD')
check(person?.sameAs?.includes(settings.linkedin_url), 'home: Person.sameAs lacks the LinkedIn URL')
check(jsonLd.some((d) => d['@type'] === 'WebSite'), 'home: missing WebSite JSON-LD')
check(home.includes('href="/about/"'), 'home: internal links should use trailing slashes (href="/about/")')

const projectsPage = read('projects/index.html')
for (const p of projects) {
  check(read(`projects/${p.slug}/index.html`).includes(escapeHtml(p.title)), `/projects/${p.slug}/: project title not prerendered`)
  check(projectsPage.includes(`href="/projects/${p.slug}/"`), `/projects/: card link for ${p.slug} should end with a slash`)
}

// 404.html is the SPA fallback shell: the client renders whichever route matches, so hydration can't mismatch
const notFound = read('404.html')
check(notFound.includes('"isSpaMode":true'), '404.html: missing or not the SPA fallback shell')
check(notFound.includes('<div id="root"></div>'), '404.html: root should be empty (client-rendered)')
check(!existsSync(join(CLIENT, '__spa-fallback.html')), '__spa-fallback.html should have been renamed to 404.html')

const sitemap = read('sitemap.xml')
// Every prerendered page must be in the sitemap (catches routes added without updating STATIC_PAGES)
const builtPages = (dir = CLIENT, prefix = '/') => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  if (!entry.isDirectory() || entry.name === 'assets') return []
  const page = `${prefix}${entry.name}/`
  const sub = join(dir, entry.name)
  return [...(existsSync(join(sub, 'index.html')) ? [page] : []), ...builtPages(sub, page)]
})
for (const page of builtPages()) {
  check(sitemap.includes(`<loc>${SITE}${page}</loc>`), `sitemap.xml: prerendered page ${page} is missing (add it to STATIC_PAGES?)`)
}
for (const page of pages) check(sitemap.includes(`<loc>${SITE}${page}</loc>`), `sitemap.xml: missing ${page}`)
check(!sitemap.includes(`<loc>${SITE}/404`), 'sitemap.xml: must not list the 404 page')
check(read('robots.txt').includes(`Sitemap: ${SITE}/sitemap.xml`), 'robots.txt: missing Sitemap line')
check(!existsSync(join(CLIENT, 'vite.svg')), 'vite.svg should be gone')

if (failures.length) {
  console.error(`check-build: ${failures.length} problem(s)\n${failures.map((f) => `  - ${f}`).join('\n')}`)
  process.exit(1)
}
console.log(`check-build: OK (${pages.length} pages)`)
