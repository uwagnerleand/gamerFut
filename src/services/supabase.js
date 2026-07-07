import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase
// Substitua pelos seus valores reais do projeto Supabase
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://seu-projeto.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sua-chave-anon';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================
// TEAMS SERVICE
// ============================================

export const teamsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .order('name');
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async getPortoFC() {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('name', 'Porto FC')
      .single();
    if (error) throw error;
    return data;
  },

  async getAdversaries() {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .neq('name', 'Porto FC')
      .order('name');
    if (error) throw error;
    return data;
  }
};

// ============================================
// PLAYERS SERVICE
// ============================================

export const playersService = {
  async getByTeam(teamId) {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('team_id', teamId)
      .order('position');
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async getPortoPlayers() {
    const portoTeam = await teamsService.getPortoFC();
    return this.getByTeam(portoTeam.id);
  }
};

// ============================================
// MATCHES SERVICE
// ============================================

export const matchesService = {
  async create(matchData) {
    const { data, error } = await supabase
      .from('matches')
      .insert([matchData])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, matchData) {
    const { data, error } = await supabase
      .from('matches')
      .update(matchData)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('matches')
      .select(`
        *,
        home_team:home_team_id(name),
        away_team:away_team_id(name)
      `)
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async getAll() {
    const { data, error } = await supabase
      .from('matches')
      .select(`
        *,
        home_team:home_team_id(name),
        away_team:away_team_id(name)
      `)
      .order('match_date', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getHistory(limit = 20) {
    const { data, error } = await supabase
      .from('matches')
      .select(`
        *,
        home_team:home_team_id(name),
        away_team:away_team_id(name)
      `)
      .eq('status', 'finished')
      .order('match_date', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data;
  }
};

// ============================================
// MATCH EVENTS SERVICE
// ============================================

export const matchEventsService = {
  async create(eventData) {
    const { data, error } = await supabase
      .from('match_events')
      .insert([eventData])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getByMatch(matchId) {
    const { data, error } = await supabase
      .from('match_events')
      .select('*')
      .eq('match_id', matchId)
      .order('minute', { ascending: true });
    if (error) throw error;
    return data;
  },

  async createBatch(events) {
    const { data, error } = await supabase
      .from('match_events')
      .insert(events)
      .select();
    if (error) throw error;
    return data;
  }
};

// ============================================
// STANDINGS SERVICE
// ============================================

export const standingsService = {
  async getAll(season = 1) {
    const { data, error } = await supabase
      .from('standings')
      .select(`
        *,
        team:team_id(name)
      `)
      .eq('season', season)
      .order('points', { ascending: false })
      .order('goal_difference', { ascending: false })
      .order('goals_for', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getByTeam(teamId, season = 1) {
    const { data, error } = await supabase
      .from('standings')
      .select('*')
      .eq('team_id', teamId)
      .eq('season', season)
      .single();
    if (error) throw error;
    return data;
  }
};

// ============================================
// SEASON STATS SERVICE
// ============================================

export const seasonStatsService = {
  async getTopScorers(season = 1, limit = 10) {
    const { data, error } = await supabase
      .from('season_stats')
      .select(`
        *,
        player:player_id(name, team_id, position),
        team:player_id(team:team_id(name))
      `)
      .eq('season', season)
      .order('goals', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data;
  },

  async getTopAssists(season = 1, limit = 10) {
    const { data, error } = await supabase
      .from('season_stats')
      .select(`
        *,
        player:player_id(name, team_id, position),
        team:player_id(team:team_id(name))
      `)
      .eq('season', season)
      .order('assists', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data;
  },

  async updateStats(playerId, season, stats) {
    const { data, error } = await supabase
      .from('season_stats')
      .upsert({
        player_id: playerId,
        season,
        ...stats
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};