-- ============================================
-- PORTO FC MANAGER SIMULATOR - SEED DATA
-- ============================================
-- Execute after schema.sql
-- ============================================

-- ============================================
-- INSERT TEAMS
-- ============================================

-- Porto FC
INSERT INTO teams (id, name) VALUES
  ('00000000-0000-0000-0000-000000000001'::uuid, 'Porto FC')
ON CONFLICT (id) DO NOTHING;

-- Adversary teams
INSERT INTO teams (id, name) VALUES
  ('00000000-0000-0000-0000-000000000002'::uuid, 'Atlético Norte'),
  ('00000000-0000-0000-0000-000000000003'::uuid, 'Real Santarém'),
  ('00000000-0000-0000-0000-000000000004'::uuid, 'União Amazônica'),
  ('00000000-0000-0000-0000-000000000005'::uuid, 'Estrela Azul'),
  ('00000000-0000-0000-0000-000000000006'::uuid, 'Fênix FC'),
  ('00000000-0000-0000-0000-000000000007'::uuid, 'Águias do Oeste'),
  ('00000000-0000-0000-0000-000000000008'::uuid, 'Imperial FC'),
  ('00000000-0000-0000-0000-000000000009'::uuid, 'Tigres do Tapajós')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- INSERT PORTO FC PLAYERS
-- ============================================
INSERT INTO players (team_id, name, position, attack, defense, pass, finishing, speed, stamina) VALUES
  ('00000000-0000-0000-0000-000000000001'::uuid, 'Wagner', 'Goleiro', 20, 92, 65, 15, 55, 75),
  ('00000000-0000-0000-0000-000000000001'::uuid, 'Lucas', 'Fixo', 55, 82, 70, 45, 60, 80),
  ('00000000-0000-0000-0000-000000000001'::uuid, 'Daniel', 'Fixo', 50, 85, 68, 40, 58, 78),
  ('00000000-0000-0000-0000-000000000001'::uuid, 'Gledisson', 'Fixo', 52, 80, 72, 42, 62, 82),
  ('00000000-0000-0000-0000-000000000001'::uuid, 'Cadu', 'Ala', 78, 55, 75, 72, 85, 80),
  ('00000000-0000-0000-0000-000000000001'::uuid, 'Vyni', 'Ala', 75, 50, 80, 70, 88, 78),
  ('00000000-0000-0000-0000-000000000001'::uuid, 'Tayson', 'Ala', 80, 48, 82, 78, 90, 76),
  ('00000000-0000-0000-0000-000000000001'::uuid, 'Luan', 'Pivô', 85, 40, 70, 88, 72, 82),
  ('00000000-0000-0000-0000-000000000001'::uuid, 'Erick', 'Pivô', 82, 38, 72, 85, 75, 80);

-- ============================================
-- INSERT ADVERSARY PLAYERS
-- ============================================

-- Atlético Norte
INSERT INTO players (team_id, name, position, attack, defense, pass, finishing, speed, stamina)
VALUES
  ('00000000-0000-0000-0000-000000000002'::uuid, 'Carlos', 'Goleiro', 15, 85, 50, 10, 45, 70),
  ('00000000-0000-0000-0000-000000000002'::uuid, 'Roberto', 'Fixo', 45, 78, 60, 35, 55, 75),
  ('00000000-0000-0000-0000-000000000002'::uuid, 'Marcos', 'Fixo', 48, 75, 58, 38, 58, 72),
  ('00000000-0000-0000-0000-000000000002'::uuid, 'Pedro', 'Ala', 65, 50, 68, 60, 80, 74),
  ('00000000-0000-0000-0000-000000000002'::uuid, 'João', 'Pivô', 72, 35, 62, 75, 68, 78);

-- Real Santarém
INSERT INTO players (team_id, name, position, attack, defense, pass, finishing, speed, stamina)
VALUES
  ('00000000-0000-0000-0000-000000000003'::uuid, 'Felipe', 'Goleiro', 18, 82, 55, 12, 48, 72),
  ('00000000-0000-0000-0000-000000000003'::uuid, 'André', 'Fixo', 50, 76, 62, 40, 56, 74),
  ('00000000-0000-0000-0000-000000000003'::uuid, 'Thiago', 'Fixo', 46, 78, 60, 36, 54, 76),
  ('00000000-0000-0000-0000-000000000003'::uuid, 'Rafael', 'Ala', 68, 48, 70, 62, 82, 76),
  ('00000000-0000-0000-0000-000000000003'::uuid, 'Bruno', 'Pivô', 74, 32, 64, 78, 70, 80);

-- União Amazônica
INSERT INTO players (team_id, name, position, attack, defense, pass, finishing, speed, stamina)
VALUES
  ('00000000-0000-0000-0000-000000000004'::uuid, 'Diego', 'Goleiro', 16, 88, 52, 11, 46, 74),
  ('00000000-0000-0000-0000-000000000004'::uuid, 'Gabriel', 'Fixo', 52, 80, 65, 42, 60, 78),
  ('00000000-0000-0000-0000-000000000004'::uuid, 'Luis', 'Fixo', 48, 82, 62, 38, 58, 76),
  ('00000000-0000-0000-0000-000000000004'::uuid, 'Matheus', 'Ala', 70, 52, 72, 65, 85, 78),
  ('00000000-0000-0000-0000-000000000004'::uuid, 'Gustavo', 'Pivô', 76, 36, 66, 80, 72, 82);

-- Estrela Azul
INSERT INTO players (team_id, name, position, attack, defense, pass, finishing, speed, stamina)
VALUES
  ('00000000-0000-0000-0000-000000000005'::uuid, 'Vinícius', 'Goleiro', 20, 86, 54, 14, 50, 76),
  ('00000000-0000-0000-0000-000000000005'::uuid, 'Henrique', 'Fixo', 54, 78, 64, 44, 62, 78),
  ('00000000-0000-0000-0000-000000000005'::uuid, 'Paulo', 'Fixo', 50, 80, 60, 40, 60, 80),
  ('00000000-0000-0000-0000-000000000005'::uuid, 'Igor', 'Ala', 72, 50, 74, 68, 86, 80),
  ('00000000-0000-0000-0000-000000000005'::uuid, 'Leonardo', 'Pivô', 78, 34, 68, 82, 74, 84);

-- Fênix FC
INSERT INTO players (team_id, name, position, attack, defense, pass, finishing, speed, stamina)
VALUES
  ('00000000-0000-0000-0000-000000000006'::uuid, 'Alex', 'Goleiro', 14, 84, 48, 10, 44, 72),
  ('00000000-0000-0000-0000-000000000006'::uuid, 'Samuel', 'Fixo', 48, 76, 62, 38, 56, 74),
  ('00000000-0000-0000-0000-000000000006'::uuid, 'Victor', 'Fixo', 44, 78, 60, 36, 54, 76),
  ('00000000-0000-0000-0000-000000000006'::uuid, 'Otávio', 'Ala', 66, 48, 68, 62, 80, 76),
  ('00000000-0000-0000-0000-000000000006'::uuid, 'Ricardo', 'Pivô', 72, 34, 62, 76, 70, 78);

-- Águias do Oeste
INSERT INTO players (team_id, name, position, attack, defense, pass, finishing, speed, stamina)
VALUES
  ('00000000-0000-0000-0000-000000000007'::uuid, 'Murilo', 'Goleiro', 18, 88, 56, 12, 48, 74),
  ('00000000-0000-0000-0000-000000000007'::uuid, 'Danilo', 'Fixo', 52, 82, 66, 42, 60, 80),
  ('00000000-0000-0000-0000-000000000007'::uuid, 'Eduardo', 'Fixo', 50, 80, 64, 40, 58, 78),
  ('00000000-0000-0000-0000-000000000007'::uuid, 'Fábio', 'Ala', 74, 52, 76, 70, 88, 80),
  ('00000000-0000-0000-0000-000000000007'::uuid, 'Caio', 'Pivô', 80, 36, 70, 84, 76, 84);

-- Imperial FC
INSERT INTO players (team_id, name, position, attack, defense, pass, finishing, speed, stamina)
VALUES
  ('00000000-0000-0000-0000-000000000008'::uuid, 'Igor', 'Goleiro', 16, 86, 52, 10, 46, 72),
  ('00000000-0000-0000-0000-000000000008'::uuid, 'Luan', 'Fixo', 50, 80, 64, 40, 58, 78),
  ('00000000-0000-0000-0000-000000000008'::uuid, 'Ruan', 'Fixo', 48, 78, 62, 38, 56, 76),
  ('00000000-0000-0000-0000-000000000008'::uuid, 'Kauã', 'Ala', 70, 50, 72, 66, 84, 78),
  ('00000000-0000-0000-0000-000000000008'::uuid, 'Yuri', 'Pivô', 76, 34, 66, 80, 72, 82);

-- Tigres do Tapajós
INSERT INTO players (team_id, name, position, attack, defense, pass, finishing, speed, stamina)
VALUES
  ('00000000-0000-0000-0000-000000000009'::uuid, 'Natan', 'Goleiro', 18, 90, 58, 14, 50, 76),
  ('00000000-0000-0000-0000-000000000009'::uuid, 'Otávio', 'Fixo', 56, 84, 70, 46, 64, 82),
  ('00000000-0000-0000-0000-000000000009'::uuid, 'Pedro', 'Fixo', 52, 82, 68, 42, 62, 80),
  ('00000000-0000-0000-0000-000000000009'::uuid, 'Sérgio', 'Ala', 76, 54, 78, 72, 90, 82),
  ('00000000-0000-0000-0000-000000000009'::uuid, 'Tiago', 'Pivô', 82, 38, 72, 86, 78, 86);

-- ============================================
-- INITIALIZE STANDINGS
-- ============================================
INSERT INTO standings (team_id, season, points, wins, draws, losses, goals_for, goals_against, played)
SELECT id, 1, 0, 0, 0, 0, 0, 0, 0 FROM teams
ON CONFLICT (team_id, season) DO NOTHING;

-- ============================================
-- INITIALIZE SEASON STATS FOR PORTO FC PLAYERS
-- ============================================
INSERT INTO season_stats (player_id, season, goals, assists, mvp_count, yellow_cards, red_cards)
SELECT p.id, 1, 0, 0, 0, 0, 0
FROM players p
WHERE p.team_id = '00000000-0000-0000-0000-000000000001'::uuid
ON CONFLICT (player_id, season) DO NOTHING;