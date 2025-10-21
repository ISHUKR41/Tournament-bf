import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
  pubg_no_votes: number
  freefire_yes_votes: number
  freefire_no_votes: number
}

// Database functions
export const db = {
  // Get all teams for a specific game
  async getTeams(game: 'pubg' | 'freefire'): Promise<Team[]> {
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
  },

  // Get tournament statistics
  async getStats(): Promise<Stats | null> {
    const { data, error } = await supabase
      .from('tournament_stats')
      .select('*')
      .single()
    
    if (error) {
      console.error('Error fetching stats:', error)
      return null
    }
    return data
  },

  // Register a new team
  async registerTeam(team: Omit<Team, 'id' | 'created_at' | 'registered_at'>): Promise<{ success: boolean; error?: string; data?: Team }> {
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
  },

  // Subscribe to real-time changes
  subscribeToTeams(game: 'pubg' | 'freefire', callback: (teams: Team[]) => void) {
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
      supabase.removeChannel(channel)
    }
  },

  // Subscribe to stats changes
  subscribeToStats(callback: (stats: Stats | null) => void) {
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
      supabase.removeChannel(channel)
    }
  }
}
