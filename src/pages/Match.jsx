import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { simulateMatch, getRandomAdversary } from '../services/matchSimulation';
import { PORTO_PLAYERS } from '../services/gameData';
import './Pages.css';

function Match() {
  const navigate = useNavigate();
  const [matchState, setMatchState] = useState('pregame'); // pregame, playing, halftime, secondhalf, finished
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
    home: { shots: 0, shotsOnTarget: 0, fouls: 0, yellowCards: 0, saves: 0, corners: 0 },
    away: { shots: 0, shotsOnTarget: 0, fouls: 0, yellowCards: 0, saves: 0, corners: 0 }
  });
  const [possession, setPossession] = useState({ home: 50, away: 50 });
  const [adversary, setAdversary] = useState(null);
  const [matchResult, setMatchResult] = useState(null);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [isFirstHalf, setIsFirstHalf] = useState(true);

  const eventsRef = useRef([]);
  const timeRef = useRef({ minutes: 0, seconds: 0 });
  const simulationRef = useRef(null);
  const eventsContainerRef = useRef(null);
  const intervalRef = useRef(null);
  const matchDataRef = useRef(null);
  const eventIndexRef = useRef(0);

  const startMatch = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    const adv = getRandomAdversary();
    setAdversary(adv);
    setMatchState('playing');
    setHomeScore(0);
    setAwayScore(0);
    setEvents([]);
    setStats({
      home: { shots: 0, shotsOnTarget: 0, fouls: 0, yellowCards: 0, saves: 0, corners: 0 },
      away: { shots: 0, shotsOnTarget: 0, fouls: 0, yellowCards: 0, saves: 0, corners: 0 }
    });
    setPossession({ home: 50, away: 50 });
    setMatchResult(null);
    setIsFirstHalf(true);
    eventsRef.current = [];
    timeRef.current = { minutes: 0, seconds: 0 };
    eventIndexRef.current = 0;

    // Simulate match data (fast)
    const portoTeam = { id: 'home', name: 'Porto FC' };
    const awayTeam = { id: adv.id, name: adv.name };
    const result = simulateMatch(portoTeam, awayTeam, PORTO_PLAYERS, adv.players);
    matchDataRef.current = result;
  }, []);

  // Handle real-time event playback
  useEffect(() => {
    if (matchState !== 'playing' || !matchDataRef.current) return;

    const data = matchDataRef.current;
    const totalEvents = data.events.length;

    if (totalEvents === 0) return;

    const intervalTime = 1000 / simulationSpeed; // Base speed: ~1 game minute per real second

    intervalRef.current = setInterval(() => {
      if (eventIndexRef.current >= totalEvents) {
        clearInterval(intervalRef.current);
        setMatchState('finished');
        setMatchResult({
          homeScore: data.homeScore,
          awayScore: data.awayScore,
          mvp: data.mvp,
          homeGoalScorers: data.homeGoalScorers,
          awayGoalScorers: data.awayGoalScorers,
          homeAssists: data.homeAssists,
          awayAssists: data.awayAssists
        });
        return;
      }

      const event = data.events[eventIndexRef.current];
      eventIndexRef.current++;

      // Update time based on event minute
      timeRef.current = { minutes: event.minute, seconds: 0 };

      // Update scores
      setHomeScore(event.homeScore);
      setAwayScore(event.awayScore);

      // Update stats progressively
      const homeShots = data.homeStats.shots;
      const awayShots = data.awayStats.shots;
      const progress = eventIndexRef.current / totalEvents;

      setStats({
        home: {
          shots: Math.round(data.homeStats.shots * progress),
          shotsOnTarget: Math.round(data.homeStats.shotsOnTarget * progress),
          fouls: Math.round(data.homeStats.fouls * progress),
          yellowCards: Math.round(data.homeStats.yellowCards * progress),
          saves: Math.round(data.homeStats.saves * progress),
          corners: Math.round(data.homeStats.corners * progress)
        },
        away: {
          shots: Math.round(data.awayStats.shots * progress),
          shotsOnTarget: Math.round(data.awayStats.shotsOnTarget * progress),
          fouls: Math.round(data.awayStats.fouls * progress),
          yellowCards: Math.round(data.awayStats.yellowCards * progress),
          saves: Math.round(data.awayStats.saves * progress),
          corners: Math.round(data.awayStats.corners * progress)
        }
      });

      // Update possession
      const totalActions = data.homePossession + data.awayPossession;
      if (totalActions > 0) {
        setPossession({
          home: Math.round(data.homePossession * progress),
          away: Math.round(data.awayPossession * progress)
        });
      }

      // Add event
      eventsRef.current = [...eventsRef.current, event];
      setEvents([...eventsRef.current]);

      // Check halftime (minute 20)
      if (event.minute >= 20 && isFirstHalf && eventIndexRef.current < totalEvents) {
        // Continue to second half
        setIsFirstHalf(false);
      }

      // Update time display
      setTime({ ...timeRef.current });
    }, intervalTime);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [matchState, simulationSpeed, isFirstHalf]);

  // Auto-scroll events
  useEffect(() => {
    if (eventsContainerRef.current) {
      eventsContainerRef.current.scrollTop = eventsContainerRef.current.scrollHeight;
    }
  }, [events]);

  const formatTime = (minutes) => {
    const m = Math.min(minutes, 40);
    return `${String(m).padStart(2, '0')}:00`;
  };

  const renderPregame = () => (
    <div className="match-pregame">
      <div className="pregame-content">
        <div className="pregame-shield">
          <div className="shield-large">PFC</div>
        </div>
        <h2>Nova Partida</h2>
        <p>O Porto FC está pronto para mais um desafio!</p>
        <div className="pregame-info">
          <div className="pregame-stat">
            <span className="pregame-stat-value">40</span>
            <span className="pregame-stat-label">Minutos</span>
          </div>
          <div className="pregame-stat">
            <span className="pregame-stat-value">2</span>
            <span className="pregame-stat-label">Tempos</span>
          </div>
          <div className="pregame-stat">
            <span className="pregame-stat-value">~3</span>
            <span className="pregame-stat-label">Min Reais</span>
          </div>
        </div>
        <button className="btn btn-primary btn-large" onClick={startMatch}>
          <span className="btn-icon">⚽</span>
          Iniciar Partida
        </button>
      </div>
    </div>
  );

  const renderMatch = () => {
    if (!adversary && matchState !== 'finished') return null;

    return (
      <div className="match-live">
        {/* Scoreboard */}
        <div className="match-scoreboard">
          <div className="scoreboard-team home">
            <div className="team-shield-small">PFC</div>
            <span className="team-name">Porto FC</span>
          </div>
          <div className="scoreboard-center">
            <div className="score-display">
              <span className="score-number">{homeScore}</span>
              <span className="score-separator">-</span>
              <span className="score-number">{awayScore}</span>
            </div>
            <div className="score-timer">
              <span className="timer-icon">⏱️</span>
              <span>{formatTime(time.minutes)}</span>
            </div>
            <div className="score-half">
              {time.minutes < 20 ? '1º Tempo' : '2º Tempo'}
            </div>
          </div>
          <div className="scoreboard-team away">
            <div className="team-shield-small away-shield">
              {adversary?.name?.charAt(0) || '?'}
            </div>
            <span className="team-name">{adversary?.name || 'Visitante'}</span>
          </div>
        </div>

        {/* Speed Control */}
        <div className="match-controls">
          <div className="speed-control">
            <span>Velocidade:</span>
            <button
              className={`speed-btn ${simulationSpeed === 0.5 ? 'active' : ''}`}
              onClick={() => setSimulationSpeed(0.5)}
            >
              0.5x
            </button>
            <button
              className={`speed-btn ${simulationSpeed === 1 ? 'active' : ''}`}
              onClick={() => setSimulationSpeed(1)}
            >
              1x
            </button>
            <button
              className={`speed-btn ${simulationSpeed === 2 ? 'active' : ''}`}
              onClick={() => setSimulationSpeed(2)}
            >
              2x
            </button>
            <button
              className={`speed-btn ${simulationSpeed === 4 ? 'active' : ''}`}
              onClick={() => setSimulationSpeed(4)}
            >
              4x
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="match-content">
          {/* Events Feed */}
          <div className="match-events" ref={eventsContainerRef}>
            <h3 className="section-title-small">Narração</h3>
            <div className="events-list">
              {events.length === 0 && (
                <div className="events-placeholder">
                  Aguardando eventos da partida...
                </div>
              )}
              {events.map((event, index) => (
                <div
                  key={index}
                  className={`event-item ${event.eventType === 'gol' ? 'event-goal' : ''} ${
                    event.description.includes('Porto FC') ? 'event-porto' : 'event-opponent'
                  }`}
                >
                  <span className="event-time">[{formatTime(event.minute)}]</span>
                  <span className="event-text">{event.description}</span>
                  {event.eventType === 'gol' && (
                    <span className="event-score-badge">
                      {event.homeScore} - {event.awayScore}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="match-stats-panel">
            <h3 className="section-title-small">Estatísticas</h3>
            <StatRow label="Posse de Bola" home={possession.home} away={possession.away} unit="%" />
            <StatRow label="Finalizações" home={stats.home.shots} away={stats.away.shots} />
            <StatRow label="No Alvo" home={stats.home.shotsOnTarget} away={stats.away.shotsOnTarget} />
            <StatRow label="Defesas" home={stats.home.saves} away={stats.away.saves} />
            <StatRow label="Faltas" home={stats.home.fouls} away={stats.away.fouls} />
            <StatRow label="Cartões Amarelos" home={stats.home.yellowCards} away={stats.away.yellowCards} />
            <StatRow label="Escanteios" home={stats.home.corners} away={stats.away.corners} />

            {/* Goal Scorers */}
            {matchDataRef.current && (
              <div className="stats-goal-scorers">
                <h4>Artilheiros</h4>
                {matchDataRef.current.homeGoalScorers.length > 0 && (
                  <div className="scorers-list">
                    <span className="scorers-team">Porto FC:</span>
                    {getScorerCounts(matchDataRef.current.homeGoalScorers).map((s, i) => (
                      <span key={i} className="scorer-item">{s.name} ({s.count})</span>
                    ))}
                  </div>
                )}
                {matchDataRef.current.awayGoalScorers.length > 0 && (
                  <div className="scorers-list">
                    <span className="scorers-team">{adversary?.name}:</span>
                    {getScorerCounts(matchDataRef.current.awayGoalScorers).map((s, i) => (
                      <span key={i} className="scorer-item">{s.name} ({s.count})</span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderFinished = () => (
    <div className="match-finished">
      <div className="finished-content">
        <div className="finished-badge">
          <span className="finished-icon">🏁</span>
        </div>
        <h2>Partida Finalizada!</h2>

        <div className="finished-scoreboard">
          <div className="finished-team">
            <div className="finished-shield">PFC</div>
            <span className="finished-team-name">Porto FC</span>
          </div>
          <div className="finished-score">
            <span className="finished-score-number">{matchResult?.homeScore || 0}</span>
            <span className="finished-score-separator">-</span>
            <span className="finished-score-number">{matchResult?.awayScore || 0}</span>
          </div>
          <div className="finished-team">
            <div className="finished-shield away-shield">
              {adversary?.name?.charAt(0) || '?'}
            </div>
            <span className="finished-team-name">{adversary?.name || 'Visitante'}</span>
          </div>
        </div>

        {matchResult?.homeScore > matchResult?.awayScore && (
          <div className="finished-result victory">
            <span className="result-icon">🏆</span>
            <span>VITÓRIA DO PORTO FC!</span>
          </div>
        )}
        {matchResult?.homeScore === matchResult?.awayScore && (
          <div className="finished-result draw">
            <span className="result-icon">🤝</span>
            <span>EMPATE!</span>
          </div>
        )}
        {matchResult?.homeScore < matchResult?.awayScore && (
          <div className="finished-result defeat">
            <span className="result-icon">😔</span>
            <span>DERROTA DO PORTO FC</span>
          </div>
        )}

        {matchResult?.mvp && (
          <div className="finished-mvp">
            <h3>MVP da Partida</h3>
            <div className="mvp-card">
              <span className="mvp-star">⭐</span>
              <div className="mvp-info">
                <span className="mvp-name">{matchResult.mvp.name}</span>
                <span className="mvp-team">{matchResult.mvp.team}</span>
              </div>
            </div>
          </div>
        )}

        <div className="finished-actions">
          <button className="btn btn-primary btn-large" onClick={startMatch}>
            <span className="btn-icon">🔄</span>
            Nova Partida
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/')}>
            <span className="btn-icon">🏠</span>
            Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="page match-page">
      <div className="container">
        {matchState === 'pregame' && renderPregame()}
        {(matchState === 'playing') && renderMatch()}
        {matchState === 'finished' && renderFinished()}
      </div>
    </div>
  );
}

function StatRow({ label, home, away, unit = '' }) {
  return (
    <div className="stat-row">
      <span className="stat-value home">{home}{unit}</span>
      <div className="stat-bar-container">
        <div className="stat-bar">
          <div
            className="stat-bar-fill home"
            style={{ width: `${(home / (home + away || 1)) * 100}%` }}
          />
          <div
            className="stat-bar-fill away"
            style={{ width: `${(away / (home + away || 1)) * 100}%` }}
          />
        </div>
        <span className="stat-label">{label}</span>
      </div>
      <span className="stat-value away">{away}{unit}</span>
    </div>
  );
}

function getScorerCounts(scorers) {
  const counts = {};
  scorers.forEach(name => {
    counts[name] = (counts[name] || 0) + 1;
  });
  return Object.entries(counts).map(([name, count]) => ({ name, count }));
}

export default Match;