-- ============================================
-- PORTO FC MANAGER SIMULATOR - DATABASE SCHEMA
-- ============================================
-- Execute this SQL in your Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLES
-- ============================================

-- Teams table
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Players table
CREATE TABLE IF NOT EXISTS players (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  position VARCHAR(50) NOT NULL CHECK (position IN ('Goleiro', 'Fixo', 'Ala', 'Pivô')),
  attack INTEGER NOT NULL DEFAULT 50 CHECK (attack >= 1 AND attack <= 100),
  defense INTEGER NOT NULL DEFAULT 50 CHECK (defense >= 1 AND defense <= 100),
  pass INTEGER NOT NULL DEFAULT 50 CHECK (pass >= 1 AND pass <= 100),
  finishing INTEGER NOT NULL DEFAULT 50 CHECK (finishing >= 1 AND finishing <= 100),
  speed INTEGER NOT NULL DEFAULT 50 CHECK (speed >= 1 AND speed <= 100),
  stamina INTEGER NOT NULL DEFAULT 50 CHECK (stamina >= 1 AND stamina <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Matches table
CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  home_team_id UUID NOT NULL REFERENCES teams(id),
  away_team_id UUID NOT NULL REFERENCES teams(id),
  home_score INTEGER NOT NULL DEFAULT 0,
  away_score INTEGER NOT NULL DEFAULT 0,
  home_possession DECIMAL(5,2) DEFAULT 50.00,
  away_possession DECIMAL(5,2) DEFAULT 50.00,
  home_shots INTEGER DEFAULT 0,
  away_shots INTEGER DEFAULT 0,
  home_shots_on_target INTEGER DEFAULT 0,
  away_shots_on_target INTEGER DEFAULT 0,
  home_fouls INTEGER DEFAULT 0,
  away_fouls INTEGER DEFAULT 0,
  home_yellow_cards INTEGER DEFAULT 0,
  away_yellow_cards INTEGER DEFAULT 0,
  home_red_cards INTEGER DEFAULT 0,
  away_red_cards INTEGER DEFAULT 0,
  home_saves INTEGER DEFAULT 0,
  away_saves INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'live', 'finished')),
  match_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Match events table
CREATE TABLE IF NOT EXISTS match_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
  minute INTEGER NOT NULL CHECK (minute >= 0 AND minute <= 40),
  event_type VARCHAR(50) NOT NULL CHECK (event_type IN (
    'passe', 'chute', 'defesa', 'desarme', 'contra-ataque',
    'falta', 'cartao_amarelo', 'cartao_vermelho', 'escanteio',
    'gol', 'lesao', 'assistencia', 'recuperacao', 'cruzamento'
  )),
  description TEXT NOT NULL,
  team_id UUID REFERENCES teams(id),
  player_id UUID REFERENCES players(id),
  secondary_player_id UUID REFERENCES players(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Standings table
CREATE TABLE IF NOT EXISTS standings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  season INTEGER NOT NULL DEFAULT 1,
  points INTEGER NOT NULL DEFAULT 0,
  wins INTEGER NOT NULL DEFAULT 0,
  draws INTEGER NOT NULL DEFAULT 0,
  losses INTEGER NOT NULL DEFAULT 0,
  goals_for INTEGER NOT NULL DEFAULT 0,
  goals_against INTEGER NOT NULL DEFAULT 0,
  goal_difference INTEGER GENERATED ALWAYS AS (goals_for - goals_against) STORED,
  played INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_id, season)
);

-- Season statistics table
CREATE TABLE IF NOT EXISTS season_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  season INTEGER NOT NULL DEFAULT 1,
  goals INTEGER NOT NULL DEFAULT 0,
  assists INTEGER NOT NULL DEFAULT 0,
  mvp_count INTEGER NOT NULL DEFAULT 0,
  yellow_cards INTEGER NOT NULL DEFAULT 0,
  red_cards INTEGER NOT NULL DEFAULT 0,
  UNIQUE(player_id, season)
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_players_team ON players(team_id);
CREATE INDEX IF NOT EXISTS idx_matches_home ON matches(home_team_id);
CREATE INDEX IF NOT EXISTS idx_matches_away ON matches(away_team_id);
CREATE INDEX IF NOT EXISTS idx_matches_date ON matches(match_date DESC);
CREATE INDEX IF NOT EXISTS idx_events_match ON match_events(match_id);
CREATE INDEX IF NOT EXISTS idx_standings_season ON standings(season);
CREATE INDEX IF NOT EXISTS idx_standings_points ON standings(points DESC);
CREATE INDEX IF NOT EXISTS idx_season_stats_player ON season_stats(player_id);
CREATE INDEX IF NOT EXISTS idx_season_stats_season ON season_stats(season);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to update standings after a match
CREATE OR REPLACE FUNCTION update_standings()
RETURNS TRIGGER AS $$
BEGIN
  -- Update home team standings
  INSERT INTO standings (team_id, season, points, wins, draws, losses, goals_for, goals_against, played)
  VALUES (
    NEW.home_team_id,
    1,
    CASE
      WHEN NEW.home_score > NEW.away_score THEN 3
      WHEN NEW.home_score = NEW.away_score THEN 1
      ELSE 0
    END,
    CASE WHEN NEW.home_score > NEW.away_score THEN 1 ELSE 0 END,
    CASE WHEN NEW.home_score = NEW.away_score THEN 1 ELSE 0 END,
    CASE WHEN NEW.home_score < NEW.away_score THEN 1 ELSE 0 END,
    NEW.home_score,
    NEW.away_score,
    1
  )
  ON CONFLICT (team_id, season) DO UPDATE SET
    points = standings.points + EXCLUDED.points,
    wins = standings.wins + EXCLUDED.wins,
    draws = standings.draws + EXCLUDED.draws,
    losses = standings.losses + EXCLUDED.losses,
    goals_for = standings.goals_for + EXCLUDED.goals_for,
    goals_against = standings.goals_against + EXCLUDED.goals_against,
    played = standings.played + 1,
    updated_at = NOW();

  -- Update away team standings
  INSERT INTO standings (team_id, season, points, wins, draws, losses, goals_for, goals_against, played)
  VALUES (
    NEW.away_team_id,
    1,
    CASE
      WHEN NEW.away_score > NEW.home_score THEN 3
      WHEN NEW.away_score = NEW.home_score THEN 1
      ELSE 0
    END,
    CASE WHEN NEW.away_score > NEW.home_score THEN 1 ELSE 0 END,
    CASE WHEN NEW.away_score = NEW.home_score THEN 1 ELSE 0 END,
    CASE WHEN NEW.away_score < NEW.home_score THEN 1 ELSE 0 END,
    NEW.away_score,
    NEW.home_score,
    1
  )
  ON CONFLICT (team_id, season) DO UPDATE SET
    points = standings.points + EXCLUDED.points,
    wins = standings.wins + EXCLUDED.wins,
    draws = standings.draws + EXCLUDED.draws,
    losses = standings.losses + EXCLUDED.losses,
    goals_for = standings.goals_for + EXCLUDED.goals_for,
    goals_against = standings.goals_against + EXCLUDED.goals_against,
    played = standings.played + 1,
    updated_at = NOW();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update standings when match is finished
DROP TRIGGER IF EXISTS trg_update_standings ON matches;
CREATE TRIGGER trg_update_standings
  AFTER UPDATE OF status ON matches
  FOR EACH ROW
  WHEN (NEW.status = 'finished' AND OLD.status != 'finished')
  EXECUTE FUNCTION update_standings();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE standings ENABLE ROW LEVEL SECURITY;
ALTER TABLE season_stats ENABLE ROW LEVEL SECURITY;

-- Allow public read access for all tables
CREATE POLICY "Allow public read teams" ON teams FOR SELECT USING (true);
CREATE POLICY "Allow public read players" ON players FOR SELECT USING (true);
CREATE POLICY "Allow public read matches" ON matches FOR SELECT USING (true);
CREATE POLICY "Allow public read match_events" ON match_events FOR SELECT USING (true);
CREATE POLICY "Allow public read standings" ON standings FOR SELECT USING (true);
CREATE POLICY "Allow public read season_stats" ON season_stats FOR SELECT USING (true);

-- Allow public insert for matches and events
CREATE POLICY "Allow public insert matches" ON matches FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert match_events" ON match_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update matches" ON matches FOR UPDATE USING (true);