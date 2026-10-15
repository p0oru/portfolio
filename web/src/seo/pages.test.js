import { describe, expect, it } from 'vitest'
import projects from '../data/projects.json'
import settings from '../data/settings.json'
import {
  aboutMeta, blogMeta, homeMeta, notFoundMeta, postMeta,
  projectMeta, projectsMeta, resumeMeta, skillsMeta,
} from './pages'

const titleOf = (meta) => meta.find((m) => 'title' in m).title
const descriptionOf = (meta) => meta.find((m) => m.name === 'description').content
const jsonLdOf = (meta) => meta.filter((m) => 'script:ld+json' in m).map((m) => m['script:ld+json'])

const allPages = () => [
  homeMeta(), aboutMeta(), projectsMeta(), blogMeta(), resumeMeta(), skillsMeta(),
  ...projects.map((p) => projectMeta(p.slug)), notFoundMeta(),
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
})

describe('home JSON-LD', () => {
  const [person, website] = jsonLdOf(homeMeta())

  it('describes the Person and links LinkedIn and GitHub', () => {
    expect(person).toMatchObject({ '@context': 'https://schema.org', '@type': 'Person', name: settings.name, url: 'https://puru.live/' })
    expect(person.sameAs).toEqual([settings.linkedin_url, settings.github_url])
  })

  it('ties the Person to ASU and the current job', () => {
    expect(person.alumniOf).toEqual({ '@type': 'CollegeOrUniversity', name: 'Arizona State University' })
    expect(person.jobTitle).toBe('Software Development Engineer')
  })

  it('names the website', () => {
    expect(website).toEqual({ '@context': 'https://schema.org', '@type': 'WebSite', name: 'Puru Singh', url: 'https://puru.live/' })
  })
})
