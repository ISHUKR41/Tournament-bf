import { createClient } from '@supabase/supabase-js'

// Auto-configured Supabase credentials with fallback
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ielwxcdoejxahmdsfznj.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllbHd4Y2RvZWp4YWhtZHNmem5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3ODA5ODQsImV4cCI6MjA3NjM1Njk4NH0.KAjZJ4Em7zBwWz8XxvyIeTayn6ILrasb7n2uUg0rt2o'

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

// Database types
export type Team = {
  id: string
  game: 'pubg' | 'freefire'
  team_name: string
  leader_name: string
  leader_whatsapp: string
  leader_game_id: string
  player2_name: string
  player2_game_id: string
  player3_name: string
  player3_game_id: string
  player4_name: string
  player4_game_id: string
  payment_screenshot: string
  transaction_id: string
  live_stream_vote: 'yes' | 'no'
  agreed_to_terms: boolean
  registered_at: string
  created_at: string
}

export type Stats = {
  pubg_teams: number
  freefire_teams: number
  pubg_slots: number
  freefire_slots: number
  pubg_yes_votes: number
  pubb_no_votes: number
  freefire_yes_votes: number
  freefire_no_votes: number
}

// Database functions with fallback to file storage
export const db = {
  // Get all teams for a specific game
  async getTeams(game: 'pubg' | 'freefire'): Promise<Team[]> {
    // If Supabase not configured, return empty array
    if (!supabase) {
      console.warn('Supabase not configured, using fallback')
      return []
    }
    
    try {
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .eq('game', game)
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Error fetching teams:', error)
        return []
      }
      return data || []
    } catch (error) {
      console.error('Database error, using fallback:', error)
      return []
    }
  },

  // Get tournament statistics
  async getStats(): Promise<Stats | null> {
    // If Supabase not configured, return default stats
    if (!supabase) {
      console.warn('Supabase not configured, using default stats')
      return {
        pubg_teams: 0,
        freefire_teams: 0,
        pubg_slots: 25,
        freefire_slots: 12,
        pubg_yes_votes: 0,
        pubb_no_votes: 0,
        freefire_yes_votes: 0,
        freefire_no_votes: 0
      }
    }
    
    try {
      const { data, error } = await supabase
        .from('tournament_stats')
        .select('*')
        .single()
      
      if (error) {
        console.error('Error fetching stats:', error)
        return null
      }
      return data
    } catch (error) {
      console.error('Database error, using fallback:', error)
      return null
    }
  },

  // Register a new team
  async registerTeam(team: Omit<Team, 'id' | 'created_at' | 'registered_at'>): Promise<{ success: boolean; error?: string; data?: Team }> {
    // If Supabase not configured, return error
    if (!supabase) {
      return { success: false, error: 'Database not configured' }
    }

    try {
      // Check if slots are available
      const stats = await this.getStats()
      if (!stats) {
        return { success: false, error: 'Unable to fetch tournament stats' }
      }

      const currentTeams = team.game === 'pubg' ? stats.pubg_teams : stats.freefire_teams
      const maxSlots = team.game === 'pubg' ? stats.pubg_slots : stats.freefire_slots

      if (currentTeams >= maxSlots) {
        return { success: false, error: 'All slots are filled. Registration closed.' }
      }

      const { data, error } = await supabase
        .from('teams')
        .insert([team])
        .select()
        .single()
      
      if (error) {
        console.error('Error registering team:', error)
        return { success: false, error: error.message }
      }

      return { success: true, data }
    } catch (error) {
      console.error('Database error:', error)
      return { success: false, error: 'Internal server error' }
    }
  },

  // Subscribe to real-time changes (returns cleanup function)
  subscribeToTeams(game: 'pubg' | 'freefire', callback: (teams: Team[]) => void) {
    // If Supabase not configured, return noop cleanup
    if (!supabase) {
      console.warn('Supabase not configured, real-time updates disabled')
      return () => {}
    }
    
    const channel = supabase
      .channel(`teams-${game}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'teams',
          filter: `game=eq.${game}`
        },
        () => {
          // Fetch updated data when changes occur
          this.getTeams(game).then(callback)
        }
      )
      .subscribe()

    return () => {
      supabase?.removeChannel(channel)
    }
  },

  // Subscribe to stats changes
  subscribeToStats(callback: (stats: Stats | null) => void) {
    // If Supabase not configured, return noop cleanup
    if (!supabase) {
      console.warn('Supabase not configured, real-time updates disabled')
      return () => {}
    }
    
    const channel = supabase
      .channel('tournament-stats')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'teams'
        },
        () => {
          // Fetch updated stats when any team changes
          this.getStats().then(callback)
        }
      )
      .subscribe()

    return () => {
      supabase?.removeChannel(channel)
    }
  }
}
