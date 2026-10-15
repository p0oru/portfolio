import { describe, expect, it } from 'vitest'
import { canonicalUrl, sitemapXml, sitePages } from './site'

describe('sitemapXml', () => {
  const xml = sitemapXml('2026-10-15')

  it('is a sitemaps.org urlset', () => {
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')).toBe(true)
    expect(xml.trimEnd().endsWith('</urlset>')).toBe(true)
  })

  it('lists every page by canonical URL', () => {
    for (const page of sitePages()) expect(xml).toContain(`<loc>${canonicalUrl(page)}</loc>`)
    expect(xml.match(/<url>/g)).toHaveLength(sitePages().length)
  })

  it('stamps lastmod', () => {
    expect(xml).toContain('<lastmod>2026-10-15</lastmod>')
  })
})
