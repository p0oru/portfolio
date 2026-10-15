import { describe, expect, it, vi } from 'vitest'
import projects from '../data/projects.json'
import settings from '../data/settings.json'
import {
  aboutMeta, blogMeta, homeMeta, notFoundMeta, postMeta,
  projectMeta, projectsMeta, resumeMeta, skillsMeta,
} from './pages'

vi.mock('../data/posts.json', () => ({ default: [{ slug: 'hello-world', title: 'Hello world' }] }))

const titleOf = (meta) => meta.find((m) => 'title' in m).title
const descriptionOf = (meta) => meta.find((m) => m.name === 'description').content
const jsonLdOf = (meta) => meta.filter((m) => 'script:ld+json' in m).map((m) => m['script:ld+json'])

const allPages = () => [
  homeMeta(), aboutMeta(), projectsMeta(), blogMeta(), resumeMeta(), skillsMeta(),
  ...projects.map((p) => projectMeta(p.slug)), postMeta('hello-world'), notFoundMeta(),
]

describe('page meta', () => {
  it('puts the name in every title', () => {
    for (const meta of allPages()) expect(titleOf(meta)).toContain('Puru Singh')
  })

  it('mentions Arizona State University in the home title', () => {
    expect(titleOf(homeMeta())).toBe('Puru Singh — Software Engineer · CS @ Arizona State University')
  })

  it('keeps every description between 40 and 160 characters', () => {
    for (const meta of allPages()) {
      const length = descriptionOf(meta).length
      expect(length).toBeGreaterThanOrEqual(40)
      expect(length).toBeLessThanOrEqual(160)
    }
  })

  it('titles project pages after the project', () => {
    const p = projects[0]
    expect(titleOf(projectMeta(p.slug))).toBe(`${p.title} · Puru Singh`)
  })

  it('falls back to not-found meta for unknown slugs', () => {
    expect(projectMeta('nope')).toEqual(notFoundMeta())
    expect(postMeta('nope')).toEqual(notFoundMeta())
  })

  it('keeps the 404 page out of search results', () => {
    expect(notFoundMeta()).toContainEqual({ name: 'robots', content: 'noindex' })
  })

  it('uses hand-written descriptions that are not truncated', () => {
    for (const meta of [homeMeta(), aboutMeta(), projectsMeta(), blogMeta(), resumeMeta(), skillsMeta()]) {
      expect(descriptionOf(meta)).not.toMatch(/…$/)
    }
  })

  it('says "Portfolio" in the home description', () => {
    expect(descriptionOf(homeMeta())).toContain('Portfolio')
  })

  it('builds article meta for blog posts', () => {
    const meta = postMeta('hello-world')
    expect(titleOf(meta)).toBe('Hello world · Puru Singh')
    expect(meta).toContainEqual({ property: 'og:type', content: 'article' })
    expect(meta).toContainEqual({ tagName: 'link', rel: 'canonical', href: 'https://puru.live/blog/hello-world/' })
  })
})

describe('home JSON-LD', () => {
  const [person, website] = jsonLdOf(homeMeta())

  it('describes the Person and links LinkedIn and GitHub', () => {
    expect(person).toMatchObject({ '@context': 'https://schema.org', '@type': 'Person', name: settings.name, url: 'https://puru.live/' })
    expect(person.sameAs).toEqual([settings.linkedin_url, settings.github_url])
  })

  it('ties the Person to ASU and the current job', () => {
    expect(person.affiliation).toMatchObject({ '@type': 'CollegeOrUniversity', name: 'Arizona State University' })
    expect(person.jobTitle).toBe('Software Development Engineer')
    expect(person.worksFor).toEqual({ '@type': 'Organization', name: 'ASU AI Cloud Innovation Center' })
  })

  it('names the website and links it to the Person', () => {
    expect(website).toEqual({
      '@context': 'https://schema.org', '@type': 'WebSite', name: 'Puru Singh', alternateName: 'puru.live',
      url: 'https://puru.live/', publisher: { '@id': person['@id'] },
    })
    expect(person['@id']).toBe('https://puru.live/#person')
  })
})
