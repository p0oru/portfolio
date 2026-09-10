import settingsData from '../data/settings.json'

export function useSettings() {
  return { settings: settingsData, loading: false }
}
