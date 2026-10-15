import { sitemapXml } from '../seo/site'

export function loader() {
  const today = new Date().toISOString().slice(0, 10)
  return new Response(sitemapXml(today), { headers: { 'Content-Type': 'application/xml' } })
}
