-- Tournament Registration Database Schema
-- Run this in Supabase SQL Editor

-- Create teams table
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  game VARCHAR(20) NOT NULL CHECK (game IN ('pubg', 'freefire')),
  team_name VARCHAR(100) NOT NULL,
  leader_name VARCHAR(100) NOT NULL,
  leader_whatsapp VARCHAR(20) NOT NULL,
  leader_game_id VARCHAR(50) NOT NULL,
  player2_name VARCHAR(100) NOT NULL,
  player2_game_id VARCHAR(50) NOT NULL,
  player3_name VARCHAR(100) NOT NULL,
  player3_game_id VARCHAR(50) NOT NULL,
  player4_name VARCHAR(100) NOT NULL,
  player4_game_id VARCHAR(50) NOT NULL,
  payment_screenshot TEXT NOT NULL,
  transaction_id VARCHAR(100) NOT NULL,
  live_stream_vote VARCHAR(3) NOT NULL DEFAULT 'yes' CHECK (live_stream_vote IN ('yes', 'no')),
  agreed_to_terms BOOLEAN NOT NULL DEFAULT true,
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_teams_game ON teams(game);
CREATE INDEX idx_teams_created_at ON teams(created_at DESC);

-- Enable Row Level Security
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read teams (for real-time display)
CREATE POLICY "Allow public read access" ON teams
  FOR SELECT USING (true);

-- Allow anyone to insert teams (for registration)
CREATE POLICY "Allow public insert" ON teams
  FOR INSERT WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_teams_updated_at
  BEFORE UPDATE ON teams
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create view for stats
CREATE OR REPLACE VIEW tournament_stats AS
SELECT 
  COUNT(*) FILTER (WHERE game = 'pubg') as pubg_teams,
  COUNT(*) FILTER (WHERE game = 'freefire') as freefire_teams,
  25 as pubg_slots,
  12 as freefire_slots,
  COUNT(*) FILTER (WHERE game = 'pubg' AND live_stream_vote = 'yes') as pubg_yes_votes,
  COUNT(*) FILTER (WHERE game = 'pubg' AND live_stream_vote = 'no') as pubg_no_votes,
  COUNT(*) FILTER (WHERE game = 'freefire' AND live_stream_vote = 'yes') as freefire_yes_votes,
  COUNT(*) FILTER (WHERE game = 'freefire' AND live_stream_vote = 'no') as freefire_no_votes
FROM teams;

-- Grant access to view
GRANT SELECT ON tournament_stats TO anon, authenticated;
