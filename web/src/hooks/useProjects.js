import projectsData from '../data/projects.json'

export function useProjects() {
  return { projects: projectsData, loading: false, error: null }
}

export function useProject(slug) {
  const project = projectsData.find((p) => p.slug === slug) || null
  return { project, loading: false, error: null }
}
