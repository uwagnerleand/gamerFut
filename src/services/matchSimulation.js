// ============================================
// PORTO FC MANAGER SIMULATOR - MATCH SIMULATION
// ============================================

import {
  NARRATIONS,
  POSSESSION_EVENTS,
  PORTO_PLAYERS,
  ADVERSARY_TEAMS,
  TEAM_IDS
} from './gameData';

// ============================================
// UTILITY FUNCTIONS
// ============================================

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const randomChance = (probability) => Math.random() * 100 < probability;

// ============================================
// MATCH STATE
// ============================================

class MatchState {
  constructor(homeTeam, awayTeam, homePlayers, awayPlayers) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.homePlayers = homePlayers;
    this.awayPlayers = awayPlayers;
    this.homeScore = 0;
    this.awayScore = 0;
    this.minute = 0;
    this.possession = { home: 50, away: 50 };
    this.possessionCount = { home: 0, away: 0 };
    this.stats = {
      home: {
        shots: 0,
        shotsOnTarget: 0,
        fouls: 0,
        yellowCards: 0,
        redCards: 0,
        saves: 0,
        corners: 0
      },
      away: {
        shots: 0,
        shotsOnTarget: 0,
        fouls: 0,
        yellowCards: 0,
        redCards: 0,
        saves: 0,
        corners: 0
      }
    };
    this.events = [];
    this.ballPossession = 'home'; // 'home' or 'away'
    this.homeGoalScorers = [];
    this.awayGoalScorers = [];
    this.homeAssists = [];
    this.awayAssists = [];
    this.yellowCardedPlayers = new Set();
    this.redCardedPlayers = new Set();
    this.lastEvent = null;
  }

  getTeamName(teamId) {
    if (teamId === this.homeTeam.id || teamId === 'home') return this.homeTeam.name;
    return this.awayTeam.name;
  }

  getTeamStats(teamId) {
    if (teamId === this.homeTeam.id || teamId === 'home') return this.stats.home;
    return this.stats.away;
  }

  getOpponentStats(teamId) {
    if (teamId === this.homeTeam.id || teamId === 'home') return this.stats.away;
    return this.stats.home;
  }

  getTeamPlayers(teamId) {
    if (teamId === this.homeTeam.id || teamId === 'home') return this.homePlayers;
    return this.awayPlayers;
  }

  getOpponentPlayers(teamId) {
    if (teamId === this.homeTeam.id || teamId === 'home') return this.awayPlayers;
    return this.homePlayers;
  }

  getGoalkeeper(teamId) {
    const players = this.getTeamPlayers(teamId);
    return players.find(p => p.position === 'Goleiro') || players[0];
  }

  updatePossession(teamId) {
    if (teamId === this.homeTeam.id || teamId === 'home') {
      this.possessionCount.home++;
    } else {
      this.possessionCount.away++;
    }
    const total = this.possessionCount.home + this.possessionCount.away;
    if (total > 0) {
      this.possession.home = Math.round((this.possessionCount.home / total) * 100);
      this.possession.away = 100 - this.possession.home;
    }
  }
}

// ============================================
// PLAYER SELECTION
// ============================================

function selectPlayerByPosition(players, position, redCardedPlayers = new Set()) {
  const candidates = players.filter(p => p.position === position && !redCardedPlayers.has(p.id));
  return candidates.length > 0 ? randomPick(candidates) : randomPick(players.filter(p => !redCardedPlayers.has(p.id)));
}

function selectAttackingPlayer(players, excludePositions = []) {
  const candidates = players.filter(p =>
    (p.position === 'Ala' || p.position === 'Pivô') &&
    !excludePositions.includes(p.position)
  );
  return candidates.length > 0 ? randomPick(candidates) : randomPick(players);
}

function selectDefensivePlayer(players) {
  const candidates = players.filter(p => p.position === 'Fixo' || p.position === 'Goleiro');
  return candidates.length > 0 ? randomPick(candidates) : randomPick(players);
}

function selectRandomPlayer(players) {
  return randomPick(players);
}

// ============================================
// EVENT GENERATION
// ============================================

function getNarration(type, replacements) {
  const narrations = NARRATIONS[type];
  if (!narrations || narrations.length === 0) return 'Evento não registrado.';
  let text = randomPick(narrations);
  for (const [key, value] of Object.entries(replacements)) {
    text = text.replace(`{${key}}`, value);
  }
  return text;
}

function generatePass(state, teamId) {
  const players = state.getTeamPlayers(teamId);
  const passer = selectAttackingPlayer(players);
  const receiver = randomPick(players.filter(p => p.id !== passer.id));

  const passSuccess = passer.pass + randomInt(-20, 20);
  let description;

  if (passSuccess > 60) {
    description = getNarration('passe', { player: passer.name, player2: receiver.name });
    state.lastEvent = { type: 'passe', team: teamId, player: passer, success: true };
  } else {
    // Pass fails - opponent recovers
    const opponent = selectDefensivePlayer(state.getOpponentPlayers(teamId));
    description = `${passer.name} erra o passe e ${opponent.name} recupera a bola.`;
    state.ballPossession = state.ballPossession === 'home' ? 'away' : 'home';
    state.lastEvent = { type: 'desarme', team: state.ballPossession, success: true };
  }

  return description;
}

function generateShot(state, teamId) {
  const players = state.getTeamPlayers(teamId);
  const shooter = selectAttackingPlayer(players);
  const goalkeeper = state.getGoalkeeper(state.ballPossession === 'home' ? 'away' : 'home');

  const shotPower = shooter.finishing + randomInt(-15, 15);
  const saveAbility = goalkeeper.defense + randomInt(-15, 15);

  const stats = state.getTeamStats(teamId);
  stats.shots++;

  let description;
  let isGoal = false;

  if (shotPower > saveAbility + 20) {
    // GOAL!
    isGoal = true;
    if (teamId === state.homeTeam.id || teamId === 'home') {
      state.homeScore++;
      state.homeGoalScorers.push(shooter.name);
    } else {
      state.awayScore++;
      state.awayGoalScorers.push(shooter.name);
    }
    stats.shotsOnTarget++;
    description = getNarration('gol', {
      player: shooter.name,
      team: state.getTeamName(teamId)
    });

    // Check for assist from last event
    if (state.lastEvent && state.lastEvent.type === 'passe' && state.lastEvent.success) {
      const assistText = getNarration('assistencia', {
        player: state.lastEvent.player.name,
        player2: shooter.name
      });
      if (teamId === state.homeTeam.id || teamId === 'home') {
        state.homeAssists.push(state.lastEvent.player.name);
      } else {
        state.awayAssists.push(state.lastEvent.player.name);
      }
      description = `${description} ${assistText}`;
    }

    state.ballPossession = state.ballPossession === 'home' ? 'away' : 'home';
  } else if (shotPower > saveAbility) {
    // Shot on target, saved
    stats.shotsOnTarget++;
    const oppStats = state.getOpponentStats(teamId);
    oppStats.saves++;
    description = getNarration('defesa', { player: goalkeeper.name });
    state.ballPossession = 'home';
  } else {
    // Shot off target
    const missTexts = [
      `${shooter.name} chuta por cima do gol!`,
      `${shooter.name} manda para fora!`,
      `${shooter.name} chuta fraco, sem perigo.`,
      `A bola de ${shooter.name} passa à direita do gol!`
    ];
    description = randomPick(missTexts);
    state.ballPossession = state.ballPossession === 'home' ? 'away' : 'home';
  }

  return description;
}

function generateDefense(state, teamId) {
  const goalkeeper = state.getGoalkeeper(teamId);
  const stats = state.getTeamStats(teamId);
  stats.saves++;

  const description = getNarration('defesa', { player: goalkeeper.name });
  return description;
}

function generateTackle(state, teamId) {
  const players = state.getTeamPlayers(teamId);
  const tackler = selectDefensivePlayer(players);

  const description = getNarration('desarme', { player: tackler.name });
  state.ballPossession = teamId === state.homeTeam.id || teamId === 'home' ? 'home' : 'away';
  state.lastEvent = { type: 'desarme', team: teamId, player: tackler, success: true };
  return description;
}

function generateCounterAttack(state, teamId) {
  const players = state.getTeamPlayers(teamId);
  const player = selectAttackingPlayer(players);

  const description = getNarration('contraAtaque', { player: player.name });
  state.lastEvent = { type: 'contraAtaque', team: teamId, player, success: true };
  return description;
}

function generateFoul(state, teamId) {
  const players = state.getTeamPlayers(teamId);
  const fouler = selectDefensivePlayer(players);
  const stats = state.getTeamStats(teamId);
  stats.fouls++;

  let description = getNarration('falta', { player: fouler.name });

  // Chance of yellow card (30% on foul)
  if (randomChance(30)) {
    stats.yellowCards++;
    state.yellowCardedPlayers.add(fouler.id);
    const yellowText = getNarration('cartaoAmarelo', { player: fouler.name });
    description = `${description} ${yellowText}`;

    // Check if this is a second yellow (simulated)
    if (randomChance(10)) {
      stats.redCards++;
      description = `${description} ${fouler.name} está suspenso!`;
    }
  }

  return description;
}

function generateCorner(state, teamId) {
  const stats = state.getTeamStats(teamId);
  stats.corners++;

  const description = getNarration('escanteio', {
    team: state.getTeamName(teamId)
  });

  // Corner kick can lead to a goal chance
  if (randomChance(15)) {
    const players = state.getTeamPlayers(teamId);
    const scorer = selectAttackingPlayer(players);
    if (teamId === state.homeTeam.id || teamId === 'home') {
      state.homeScore++;
      state.homeGoalScorers.push(scorer.name);
    } else {
      state.awayScore++;
      state.awayGoalScorers.push(scorer.name);
    }
    const goalText = getNarration('gol', {
      player: scorer.name,
      team: state.getTeamName(teamId)
    });
    return `${description} E É GOL DE CABEÇA! ${goalText}`;
  }

  return description;
}

function generateRecovery(state, teamId) {
  const players = state.getTeamPlayers(teamId);
  const player = selectRandomPlayer(players);

  const description = getNarration('recuperacao', { player: player.name });
  state.ballPossession = teamId === state.homeTeam.id || teamId === 'home' ? 'home' : 'away';
  state.lastEvent = { type: 'recuperacao', team: teamId, player, success: true };
  return description;
}

function generateInjury(state, teamId) {
  const players = state.getTeamPlayers(teamId);
  const player = selectRandomPlayer(players);

  const description = getNarration('lesao', { player: player.name });
  return description;
}

function generateCross(state, teamId) {
  const players = state.getTeamPlayers(teamId);
  const player = selectAttackingPlayer(players);

  const description = getNarration('cruzamento', { player: player.name });

  // Cross can lead to a shot
  if (randomChance(40)) {
    return `${description} ${generateShot(state, teamId)}`;
  }

  return description;
}

// ============================================
// EVENT RESOLVER
// ============================================

function resolveEvent(state, teamId) {
  const possessionType = state.ballPossession === 'home' ? 'attacking' : 'defending';

  // Determine possible events based on game situation
  let possibleEvents = [...POSSESSION_EVENTS.neutral];

  if (state.ballPossession === teamId || teamId === 'home') {
    possibleEvents = [...possibleEvents, ...POSSESSION_EVENTS.attacking];
  } else {
    possibleEvents = [...possibleEvents, ...POSSESSION_EVENTS.defending];
  }

  // Weighted event selection
  const weights = {
    passe: 25,
    chute: 15,
    defesa: 5,
    desarme: 12,
    contraAtaque: 5,
    falta: 10,
    cartaoAmarelo: 3,
    escanteio: 5,
    gol: 2,
    lesao: 2,
    recuperacao: 10,
    cruzamento: 6
  };

  // Build weighted pool
  const pool = [];
  for (const eventType of possibleEvents) {
    const weight = weights[eventType] || 5;
    for (let i = 0; i < weight; i++) {
      pool.push(eventType);
    }
  }

  const eventType = randomPick(pool);

  // Generate the event
  let description;
  switch (eventType) {
    case 'passe':
      description = generatePass(state, teamId);
      break;
    case 'chute':
      description = generateShot(state, teamId);
      break;
    case 'defesa':
      description = generateDefense(state, teamId);
      break;
    case 'desarme':
      description = generateTackle(state, teamId);
      break;
    case 'contraAtaque':
      description = generateCounterAttack(state, teamId);
      break;
    case 'falta':
    case 'cartaoAmarelo':
      description = generateFoul(state, teamId);
      break;
    case 'escanteio':
      description = generateCorner(state, teamId);
      break;
    case 'gol':
      description = generateShot(state, teamId);
      break;
    case 'lesao':
      description = generateInjury(state, teamId);
      break;
    case 'recuperacao':
      description = generateRecovery(state, teamId);
      break;
    case 'cruzamento':
      description = generateCross(state, teamId);
      break;
    default:
      description = generatePass(state, teamId);
  }

  // Update possession tracking
  state.updatePossession(state.ballPossession === 'home' ? 'home' : 'away');

  return {
    minute: state.minute,
    description,
    eventType,
    homeScore: state.homeScore,
    awayScore: state.awayScore
  };
}

// ============================================
// MAIN SIMULATION FUNCTION
// ============================================

export function simulateMatch(homeTeam, awayTeam, homePlayers, awayPlayers) {
  const state = new MatchState(homeTeam, awayTeam, homePlayers, awayPlayers);
  const events = [];

  // Simulate minute by minute
  for (state.minute = 1; state.minute <= 40; state.minute++) {
    // Determine which team has possession
    if (state.minute === 1) {
      // Initial kickoff - home team starts
      state.ballPossession = 'home';
    }

    // Sometimes the ball changes possession naturally
    if (randomChance(25) && state.minute > 1) {
      state.ballPossession = state.ballPossession === 'home' ? 'away' : 'home';
    }

    // Generate 0-3 events per minute
    const eventsThisMinute = randomInt(0, 3);

    for (let e = 0; e < eventsThisMinute; e++) {
      // Choose which team is involved
      const teamId = e % 2 === 0
        ? state.ballPossession === 'home' ? state.homeTeam.id : state.awayTeam.id
        : state.ballPossession === 'home' ? state.awayTeam.id : state.homeTeam.id;

      const event = resolveEvent(state, teamId);
      events.push(event);
    }
  }

  // Calculate final possession
  const totalEvents = state.possessionCount.home + state.possessionCount.away;
  const homePossession = totalEvents > 0
    ? Math.round((state.possessionCount.home / totalEvents) * 100)
    : 50;

  return {
    homeTeam: { ...homeTeam },
    awayTeam: { ...awayTeam },
    homeScore: state.homeScore,
    awayScore: state.awayScore,
    homePossession,
    awayPossession: 100 - homePossession,
    homeStats: state.stats.home,
    awayStats: state.stats.away,
    events,
    homeGoalScorers: state.homeGoalScorers,
    awayGoalScorers: state.awayGoalScorers,
    homeAssists: state.homeAssists,
    awayAssists: state.awayAssists,
    mvp: determineMVP(state),
    duration: state.minute
  };
}

// ============================================
// MVP DETERMINATION
// ============================================

function determineMVP(state) {
  // Simple MVP calculation based on goals and assists
  const homeScorers = [...new Set(state.homeGoalScorers)];
  const awayScorers = [...new Set(state.awayGoalScorers)];
  const homeAssisters = [...new Set(state.homeAssists)];
  const awayAssisters = [...new Set(state.awayAssists)];

  const candidates = [];

  // Home team candidates
  for (const name of homeScorers) {
    const goals = state.homeGoalScorers.filter(g => g === name).length;
    const assists = state.homeAssists.filter(a => a === name).length;
    candidates.push({
      name,
      team: state.homeTeam.name,
      score: goals * 10 + assists * 5
    });
  }

  for (const name of homeAssisters) {
    if (!state.homeGoalScorers.includes(name)) {
      const assists = state.homeAssists.filter(a => a === name).length;
      candidates.push({
        name,
        team: state.homeTeam.name,
        score: assists * 5
      });
    }
  }

  // Away team candidates
  for (const name of awayScorers) {
    const goals = state.awayGoalScorers.filter(g => g === name).length;
    const assists = state.awayAssists.filter(a => a === name).length;
    candidates.push({
      name,
      team: state.awayTeam.name,
      score: goals * 10 + assists * 5
    });
  }

  for (const name of awayAssisters) {
    if (!state.awayGoalScorers.includes(name)) {
      const assists = state.awayAssists.filter(a => a === name).length;
      candidates.push({
        name,
        team: state.awayTeam.name,
        score: assists * 5
      });
    }
  }

  if (candidates.length === 0) {
    return { name: 'Ninguém', team: '', score: 0 };
  }

  candidates.sort((a, b) => b.score - a.score);
  return candidates[0];
}

// ============================================
// FIND ADVERSARY TEAM
// ============================================

export function getRandomAdversary() {
  return randomPick(ADVERSARY_TEAMS);
}