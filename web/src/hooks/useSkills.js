import skillsData from '../data/skills.json'

export function useSkills() {
  return { skills: skillsData, loading: false } // grouped by category
}
