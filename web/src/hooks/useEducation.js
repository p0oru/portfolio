import educationData from '../data/education.json'

export function useEducation() {
  return { education: educationData, loading: false }
}
