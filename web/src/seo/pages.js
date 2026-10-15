// Every page's search title and description. Pages re-export these as their `meta`.
import education from '../data/education.json'
import experience from '../data/experience.json'
import posts from '../data/posts.json'
import projects from '../data/projects.json'
import settings from '../data/settings.json'
import skills from '../data/skills.json'
import { OG_IMAGE, SITE_NAME, SITE_URL, pageMeta, titleFor } from './site'

const currentJob = experience.find((e) => e.is_current) ?? experience[0]
const school = education[0]

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: settings.name,
    url: `${SITE_URL}/`,
    image: OG_IMAGE,
    email: `mailto:${settings.email}`,
    jobTitle: currentJob.role,
    worksFor: { '@type': 'Organization', name: currentJob.company },
    alumniOf: { '@type': 'CollegeOrUniversity', name: school.institution },
    homeLocation: { '@type': 'Place', name: settings.location },
    sameAs: [settings.linkedin_url, settings.github_url],
  }
}

export function websiteJsonLd() {
  return { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: `${SITE_URL}/` }
}

export function homeMeta() {
  return [
    ...pageMeta({
      title: 'Puru Singh — Software Engineer · CS @ Arizona State University',
      description: 'Puru Singh — CS student at Arizona State University and Software Development Engineer at the ASU AI Cloud Innovation Center. Projects, resume, and contact.',
      path: '/',
    }),
    { 'script:ld+json': personJsonLd() },
    { 'script:ld+json': websiteJsonLd() },
  ]
}

export function aboutMeta() {
  return pageMeta({ title: titleFor('About'), description: settings.bio, path: '/about' })
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
  return pageMeta({ title: titleFor(post.title), description: post.excerpt || post.title, path: `/blog/${post.slug}`, type: 'article' })
}

export function resumeMeta() {
  return pageMeta({
    title: titleFor('Resume'),
    description: `Resume of Puru Singh — ${currentJob.role} at ${currentJob.company}; ${school.degree} ${school.field}, ${school.institution}.`,
    path: '/resume',
  })
}

export function skillsMeta() {
  const names = Object.values(skills).flat().map((s) => s.name)
  return pageMeta({ title: titleFor('Skills'), description: `Technologies Puru Singh works with: ${names.join(', ')}.`, path: '/skills' })
}

export function notFoundMeta() {
  return pageMeta({ title: titleFor('Page not found'), description: "This page doesn't exist on puru.live — head back to the homepage.", path: '/404', noindex: true })
}
