// Simple in-memory cache for real-time sync on Vercel
// This ensures all serverless functions share the same data

let statsCache: {
  pubgTeams: number
  freeFireTeams: number
  pubgSlots: number
  freeFireSlots: number
  lastUpdated: number
} | null = null

const CACHE_TTL = 1000 // 1 second cache

export function getCachedStats() {
  if (statsCache && Date.now() - statsCache.lastUpdated < CACHE_TTL) {
    return {
      pubgTeams: statsCache.pubgTeams,
      freeFireTeams: statsCache.freeFireTeams,
      pubgSlots: statsCache.pubgSlots,
      freeFireSlots: statsCache.freeFireSlots,
    }
  }
  return null
}

export function setCachedStats(stats: {
  pubgTeams: number
  freeFireTeams: number
  pubgSlots: number
  freeFireSlots: number
}) {
  statsCache = {
    ...stats,
    lastUpdated: Date.now(),
  }
}

export function invalidateCache() {
  statsCache = null
}
