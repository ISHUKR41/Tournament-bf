import { create } from 'zustand'
import { DatabaseStats } from '@/types'

interface StatsStore {
  stats: DatabaseStats
  loading: boolean
  error: string | null
  fetchStats: () => Promise<void>
  setStats: (stats: DatabaseStats) => void
}

export const useStatsStore = create<StatsStore>((set) => ({
  stats: {
    pubgTeams: 0,
    freeFireTeams: 0,
    pubgSlots: 25,
    freeFireSlots: 12,
  },
  loading: false,
  error: null,
  
  fetchStats: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch('/api/stats')
      if (!response.ok) throw new Error('Failed to fetch stats')
      const data = await response.json()
      set({ stats: data, loading: false })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error', 
        loading: false 
      })
    }
  },
  
  setStats: (stats) => set({ stats }),
}))

// Auto-refresh stats every 3 seconds
if (typeof window !== 'undefined') {
  setInterval(() => {
    useStatsStore.getState().fetchStats()
  }, 3000)
}
