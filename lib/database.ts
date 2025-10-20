import fs from 'fs'
import path from 'path'
import { PUBGTeam, FreeFireTeam, DatabaseStats } from '@/types'

const DATA_DIR = path.join(process.cwd(), 'data')
const PUBG_FILE = path.join(DATA_DIR, 'pubg-teams.json')
const FREEFIRE_FILE = path.join(DATA_DIR, 'freefire-teams.json')
const STATS_FILE = path.join(DATA_DIR, 'stats.json')

// Ensure data directory exists
export function ensureDataDirectory() {
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
      pubgSlots: 25,
      freeFireSlots: 12,
    }
    fs.writeFileSync(STATS_FILE, JSON.stringify(initialStats, null, 2), 'utf-8')
  }
}

// PUBG Teams
export function getPUBGTeams(): PUBGTeam[] {
  ensureDataDirectory()
  try {
    const data = fs.readFileSync(PUBG_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
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
  } catch {
    return false
  }
}

// Free Fire Teams
export function getFreeFireTeams(): FreeFireTeam[] {
  ensureDataDirectory()
  try {
    const data = fs.readFileSync(FREEFIRE_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
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
  } catch {
    return false
  }
}

// Stats
export function getStats(): DatabaseStats {
  ensureDataDirectory()
  try {
    const data = fs.readFileSync(STATS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return {
      pubgTeams: 0,
      freeFireTeams: 0,
      pubgSlots: 25,
      freeFireSlots: 12,
    }
  }
}

export function updateStats(): void {
  const pubgTeams = getPUBGTeams().length
  const freeFireTeams = getFreeFireTeams().length
  const stats: DatabaseStats = {
    pubgTeams,
    freeFireTeams,
    pubgSlots: 25,
    freeFireSlots: 12,
  }
  fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2), 'utf-8')
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
