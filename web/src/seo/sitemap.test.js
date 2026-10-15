import { describe, expect, it, vi } from 'vitest'
import { canonicalUrl, sitemapXml, sitePages } from './site'

vi.mock('../data/posts.json', () => ({ default: [{ slug: 'q&a' }] }))

describe('sitemapXml', () => {
  const xml = sitemapXml('2026-10-15')

  it('is a sitemaps.org urlset', () => {
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')).toBe(true)
    expect(xml.trimEnd().endsWith('</urlset>')).toBe(true)
  })

  it('lists every page by canonical URL', () => {
    for (const page of sitePages()) expect(xml).toContain(`<loc>${canonicalUrl(page).replace(/&/g, '&amp;')}</loc>`)
    expect(xml.match(/<url>/g)).toHaveLength(sitePages().length)
  })

  it('stamps lastmod', () => {
    expect(xml).toContain('<lastmod>2026-10-15</lastmod>')
  })
})

describe('sitemapXml escaping', () => {
  it('escapes XML special characters in URLs', () => {
    const xml = sitemapXml('2026-10-15')
    expect(xml).toContain('<loc>https://puru.live/blog/q&amp;a/</loc>')
    // Note: a bare `.not.toContain('q&a')` would always fail here — the escaped
    // entity '&amp;' itself contains the literal substring 'q&a' (q, &, then the
    // 'a' that starts "amp;"), so that assertion can never pass regardless of
    // correctness. Check the unescaped path segment instead.
    expect(xml).not.toContain('/q&a/')
  })
})
