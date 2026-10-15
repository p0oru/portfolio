import { describe, expect, it, vi } from 'vitest'
import { personJsonLd, resumeMeta } from './pages'

vi.mock('../data/experience.json', () => ({
  default: [{ role: 'Intern', company: 'Old Co', is_current: false }],
}))

describe('without a current job', () => {
  it('leaves the job out of the Person JSON-LD', () => {
    const person = personJsonLd()
    expect(person).not.toHaveProperty('jobTitle')
    expect(person).not.toHaveProperty('worksFor')
  })

  it('leaves the job out of the resume description', () => {
    const description = resumeMeta().find((m) => m.name === 'description').content
    expect(description).toBe('Resume of Puru Singh — B.S. Computer Science student at Arizona State University.')
  })
})
