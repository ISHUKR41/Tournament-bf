import { useQuery } from '@tanstack/react-query'
import { DatabaseStats } from '@/types'

export function useStats() {
  return useQuery<DatabaseStats>({
    queryKey: ['stats'],
    queryFn: async () => {
      const response = await fetch('/api/stats')
      if (!response.ok) {
        throw new Error('Failed to fetch stats')
      }
      return response.json()
    },
    refetchInterval: 3000, // Refresh every 3 seconds for real-time updates
    staleTime: 2000,
  })
}
