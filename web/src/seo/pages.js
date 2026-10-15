// Every page's search title and description. Pages re-export these as their `meta`.
import education from '../data/education.json'
import experience from '../data/experience.json'
import posts from '../data/posts.json'
import projects from '../data/projects.json'
import settings from '../data/settings.json'
import { OG_IMAGE, SITE_NAME, SITE_URL, pageMeta, titleFor } from './site'

const currentJob = experience.find((e) => e.is_current)
const school = education[0]
const PERSON_ID = `${SITE_URL}/#person`

// "ASU AI Cloud Innovation Center (Powered by AWS)" → "ASU AI Cloud Innovation Center"
const orgName = (company) => company.replace(/\s*\([^)]*\)$/, '')

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: settings.name,
    url: `${SITE_URL}/`,
    image: OG_IMAGE,
    email: `mailto:${settings.email}`,
    ...(currentJob && {
      jobTitle: currentJob.role,
      worksFor: { '@type': 'Organization', name: orgName(currentJob.company) },
    }),
    // Current student — switch to alumniOf after graduating
    affiliation: {
      '@type': 'CollegeOrUniversity',
      name: school.institution,
      url: 'https://www.asu.edu/',
      sameAs: 'https://en.wikipedia.org/wiki/Arizona_State_University',
    },
    homeLocation: { '@type': 'Place', name: settings.location },
    sameAs: [settings.linkedin_url, settings.github_url],
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    alternateName: 'puru.live',
    url: `${SITE_URL}/`,
    publisher: { '@id': PERSON_ID },
  }
}

export function homeMeta() {
  return [
    ...pageMeta({
      title: 'Puru Singh — Software Engineer · CS @ Arizona State University',
      description: 'Portfolio of Puru Singh — CS student at Arizona State University and Software Development Engineer at the ASU AI Cloud Innovation Center. Projects and resume.',
      path: '/',
    }),
    { 'script:ld+json': personJsonLd() },
    { 'script:ld+json': websiteJsonLd() },
  ]
}

export function aboutMeta() {
  return pageMeta({
    title: titleFor('About'),
    description: 'About Puru Singh — Computer Science student at Arizona State University and Software Development Engineer building full-stack, AI-powered apps on AWS.',
    path: '/about',
  })
}

export function projectsMeta() {
  return pageMeta({
    title: titleFor('Projects'),
    description: `Full-stack and AI projects by Puru Singh: ${projects.map((p) => p.title).join(', ')}.`,
    path: '/projects',
  })
}

export function projectMeta(slug) {
  const project = projects.find((p) => p.slug === slug)
  if (!project) return notFoundMeta()
  return pageMeta({
    title: titleFor(project.title),
    description: [project.tagline, project.short_desc].filter(Boolean).join('. '),
    path: `/projects/${project.slug}`,
  })
}

export function blogMeta() {
  return pageMeta({ title: titleFor('Blog'), description: "Notes by Puru Singh on what I'm learning and building.", path: '/blog' })
}

export function postMeta(slug) {
  const post = posts.find((p) => p.slug === slug)
  if (!post) return notFoundMeta()
  return pageMeta({
    title: titleFor(post.title),
    description: post.excerpt || `${post.title} — notes by Puru Singh on what I'm learning and building.`,
    path: `/blog/${post.slug}`,
    type: 'article',
  })
}

export function resumeMeta() {
  const job = currentJob ? `${currentJob.role} at ${orgName(currentJob.company)}; ` : ''
  return pageMeta({
    title: titleFor('Resume'),
    description: `Resume of Puru Singh — ${job}${school.degree} ${school.field} student at ${school.institution}.`,
    path: '/resume',
  })
}

export function skillsMeta() {
  return pageMeta({
    title: titleFor('Skills'),
    description: 'Skills of Puru Singh: React, TypeScript, Node.js, Python, AWS (Bedrock, CDK), RAG and LLM APIs, plus MySQL, PostgreSQL, MongoDB, Docker, and Linux.',
    path: '/skills',
  })
}

export function notFoundMeta() {
  return pageMeta({ title: titleFor('Page not found'), description: "This page doesn't exist on puru.live — head back to the homepage.", path: '/404', noindex: true })
}
