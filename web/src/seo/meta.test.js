import { describe, expect, it } from 'vitest'
import { pageMeta, titleFor, truncate } from './site'

describe('titleFor', () => {
  it('appends the site name', () => {
    expect(titleFor('About')).toBe('About · Puru Singh')
  })
})

describe('truncate', () => {
  it('leaves short text alone', () => {
    expect(truncate('short')).toBe('short')
  })

  it('collapses whitespace', () => {
    expect(truncate('a  b\n c')).toBe('a b c')
  })

  it('cuts long text at a word boundary with an ellipsis', () => {
    const out = truncate('word '.repeat(50), 30)
    expect(out).toBe('word word word word word…')
  })

  it('treats missing text as empty', () => {
    expect(truncate(undefined)).toBe('')
  })
})

describe('pageMeta', () => {
  const meta = pageMeta({ title: 'About · Puru Singh', description: 'All about me.', path: '/about' })
  const byProperty = (p) => meta.find((m) => m.property === p)?.content
  const byName = (n) => meta.find((m) => m.name === n)?.content

  it('sets title and description', () => {
    expect(meta).toContainEqual({ title: 'About · Puru Singh' })
    expect(byName('description')).toBe('All about me.')
  })

  it('links the trailing-slash canonical URL', () => {
    expect(meta).toContainEqual({ tagName: 'link', rel: 'canonical', href: 'https://puru.live/about/' })
  })

  it('sets Open Graph and Twitter tags', () => {
    expect(byProperty('og:type')).toBe('website')
    expect(byProperty('og:title')).toBe('About · Puru Singh')
    expect(byProperty('og:url')).toBe('https://puru.live/about/')
    expect(byProperty('og:image')).toBe('https://puru.live/pfp.jpg')
    expect(byName('twitter:card')).toBe('summary')
  })

  it('supports article pages', () => {
    const article = pageMeta({ title: 't', description: 'd', path: '/blog/x', type: 'article' })
    expect(article).toContainEqual({ property: 'og:type', content: 'article' })
  })

  it('marks noindex pages and omits their canonical link', () => {
    const hidden = pageMeta({ title: 't', description: 'd', path: '/404', noindex: true })
    expect(hidden).toContainEqual({ name: 'robots', content: 'noindex' })
    expect(hidden.some((m) => m.rel === 'canonical')).toBe(false)
  })
})
