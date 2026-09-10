import experienceData from '../data/experience.json'

export function useExperience() {
  return { experience: experienceData, loading: false }
}
