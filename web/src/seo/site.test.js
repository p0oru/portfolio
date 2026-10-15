import { describe, expect, it, vi } from 'vitest'
import projects from '../data/projects.json'
import { canonicalPath, canonicalUrl, contentPages, sitePages, STATIC_PAGES } from './site'

vi.mock('../data/posts.json', () => ({ default: [{ slug: 'hello-world' }] }))

describe('site pages', () => {
  it('lists every page without URL params', () => {
    expect(STATIC_PAGES).toEqual(['/', '/about', '/projects', '/blog', '/resume', '/skills'])
  })

  it('has a page for every project', () => {
    for (const p of projects) expect(contentPages()).toContain(`/projects/${p.slug}`)
  })

  it('has a page for every blog post', () => {
    expect(contentPages()).toContain('/blog/hello-world')
  })

  it('lists static pages first, with no duplicates', () => {
    const pages = sitePages()
    expect(pages.slice(0, STATIC_PAGES.length)).toEqual(STATIC_PAGES)
    expect(new Set(pages).size).toBe(pages.length)
  })
})

describe('canonical URLs', () => {
  it('keeps the root as-is', () => {
    expect(canonicalUrl('/')).toBe('https://puru.live/')
  })

  it('adds a trailing slash', () => {
    expect(canonicalPath('/about')).toBe('/about/')
    expect(canonicalUrl('/projects/domainflow')).toBe('https://puru.live/projects/domainflow/')
  })

  it('does not double an existing slash', () => {
    expect(canonicalPath('/about/')).toBe('/about/')
  })
})
