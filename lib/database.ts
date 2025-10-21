import fs from 'fs'
import path from 'path'
import { PUBGTeam, FreeFireTeam, DatabaseStats } from '@/types'

const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV !== undefined
const DATA_DIR = isVercel ? '/tmp/tournament-data' : path.join(process.cwd(), 'data')
const PUBG_FILE = path.join(DATA_DIR, 'pubg-teams.json')
const FREEFIRE_FILE = path.join(DATA_DIR, 'freefire-teams.json')
const STATS_FILE = path.join(DATA_DIR, 'stats.json')

// Tournament Configuration
export const TOURNAMENT_CONFIG = {
  PUBG_SLOTS: 25,
  FREEFIRE_SLOTS: 12,
  ENTRY_FEE: 80,
  PUBG_WINNER: 1000,
  PUBG_RUNNER: 400,
  FREEFIRE_WINNER: 500,
  FREEFIRE_RUNNER: 260,
}

// Ensure data directory exists
export function ensureDataDirectory() {
  try {
    // Create directory if it doesn't exist
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    
    // Initialize files if they don't exist
    if (!fs.existsSync(PUBG_FILE)) {
      fs.writeFileSync(PUBG_FILE, JSON.stringify([]), 'utf-8')
    }
    if (!fs.existsSync(FREEFIRE_FILE)) {
      fs.writeFileSync(FREEFIRE_FILE, JSON.stringify([]), 'utf-8')
    }
    if (!fs.existsSync(STATS_FILE)) {
      const initialStats: DatabaseStats = {
        pubgTeams: 0,
        freeFireTeams: 0,
        pubgSlots: TOURNAMENT_CONFIG.PUBG_SLOTS,
        freeFireSlots: TOURNAMENT_CONFIG.FREEFIRE_SLOTS,
      }
      fs.writeFileSync(STATS_FILE, JSON.stringify(initialStats, null, 2), 'utf-8')
    }
  } catch (error) {
    console.warn('File system initialization warning:', error)
  }
}

// PUBG Teams
export function getPUBGTeams(): PUBGTeam[] {
  ensureDataDirectory()
  try {
    if (!fs.existsSync(PUBG_FILE)) {
      return []
    }
    const data = fs.readFileSync(PUBG_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading PUBG teams:', error)
    return []
  }
}

export function savePUBGTeam(team: PUBGTeam): boolean {
  try {
    ensureDataDirectory()
    const teams = getPUBGTeams()
    teams.push(team)
    fs.writeFileSync(PUBG_FILE, JSON.stringify(teams, null, 2), 'utf-8')
    updateStats()
    return true
  } catch (error) {
    console.error('Error saving PUBG team:', error)
    return false
  }
}

// Free Fire Teams
export function getFreeFireTeams(): FreeFireTeam[] {
  ensureDataDirectory()
  try {
    if (!fs.existsSync(FREEFIRE_FILE)) {
      return []
    }
    const data = fs.readFileSync(FREEFIRE_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading Free Fire teams:', error)
    return []
  }
}

export function saveFreeFireTeam(team: FreeFireTeam): boolean {
  try {
    ensureDataDirectory()
    const teams = getFreeFireTeams()
    teams.push(team)
    fs.writeFileSync(FREEFIRE_FILE, JSON.stringify(teams, null, 2), 'utf-8')
    updateStats()
    return true
  } catch (error) {
    console.error('Error saving Free Fire team:', error)
    return false
  }
}

// Stats
export function getStats(): DatabaseStats {
  ensureDataDirectory()
  try {
    if (!fs.existsSync(STATS_FILE)) {
      return {
        pubgTeams: 0,
        freeFireTeams: 0,
        pubgSlots: TOURNAMENT_CONFIG.PUBG_SLOTS,
        freeFireSlots: TOURNAMENT_CONFIG.FREEFIRE_SLOTS,
      }
    }
    const data = fs.readFileSync(STATS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading stats:', error)
    return {
      pubgTeams: 0,
      freeFireTeams: 0,
      pubgSlots: TOURNAMENT_CONFIG.PUBG_SLOTS,
      freeFireSlots: TOURNAMENT_CONFIG.FREEFIRE_SLOTS,
    }
  }
}

export function updateStats(): void {
  try {
    const pubgTeams = getPUBGTeams().length
    const freeFireTeams = getFreeFireTeams().length
    const stats: DatabaseStats = {
      pubgTeams,
      freeFireTeams,
      pubgSlots: TOURNAMENT_CONFIG.PUBG_SLOTS,
      freeFireSlots: TOURNAMENT_CONFIG.FREEFIRE_SLOTS,
    }
    fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error updating stats:', error)
  }
}

// Check if slots are available
export function hasAvailableSlots(game: 'pubg' | 'freefire'): boolean {
  const stats = getStats()
  if (game === 'pubg') {
    return stats.pubgTeams < stats.pubgSlots
  } else {
    return stats.freeFireTeams < stats.freeFireSlots
  }
}
