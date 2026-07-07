import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRandomAdversary } from '../services/matchSimulation';
import { PORTO_PLAYERS } from '../services/gameData';
import { simulateMatch } from '../services/matchSimulation';
import './Pages.css';

function History() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateHistory = async () => {
    setLoading(true);
    const history = [];
    const adversaryTeams = [
      'Atlético Norte', 'Real Santarém', 'União Amazônica',
      'Estrela Azul', 'Fênix FC', 'Águias do Oeste',
      'Imperial FC', 'Tigres do Tapajós'
    ];

    const results = ['Vitória', 'Vitória', 'Derrota', 'Vitória', 'Empate', 'Vitória', 'Derrota', 'Empate'];
    const scores = [
      { h: 3, a: 1 }, { h: 2, a: 0 }, { h: 1, a: 2 },
      { h: 4, a: 2 }, { h: 2, a: 2 }, { h: 3, a: 0 },
      { h: 0, a: 1 }, { h: 1, a: 1 }
    ];

    // Generate some sample history
    for (let i = 0; i < 12; i++) {
      const adv = getRandomAdversary();
      // Simulate a quick match for realistic data
      const portoTeam = { id: 'home', name: 'Porto FC' };
      const awayTeam = { id: adv.id, name: adv.name };
      const result = simulateMatch(portoTeam, awayTeam, PORTO_PLAYERS, adv.players);

      const date = new Date();
      date.setDate(date.getDate() - (12 - i) * 3);

      history.push({
        id: `match-${i}`,
        date: date.toLocaleDateString('pt-BR'),
        adversary: adv.name,
        homeScore: result.homeScore,
        awayScore: result.awayScore,
        result: result.homeScore > result.awayScore ? 'Vitória' :
                result.homeScore < result.awayScore ? 'Derrota' : 'Empate',
        mvp: result.mvp.name,
        homeGoalScorers: result.homeGoalScorers,
        awayGoalScorers: result.awayGoalScorers,
        homeAssists: result.homeAssists,
        awayAssists: result.awayAssists,
        homePossession: result.homePossession,
        awayPossession: result.awayPossession
      });
    }

    // Sort by date (most recent first)
    history.sort((a, b) => new Date(b.date.split('/').reverse().join('-')) - new Date(a.date.split('/').reverse().join('-')));

    setMatches(history);
    setLoading(false);
  };

  // Generate history on mount
  React.useEffect(() => {
    generateHistory();
  }, []);

  const getResultClass = (result) => {
    if (result === 'Vitória') return 'result-win';
    if (result === 'Derrota') return 'result-loss';
    return 'result-draw';
  };

  return (
    <div className="page history-page">
      <div className="container">
        <div className="page-header">
          <h2 className="page-title">📋 Histórico de Partidas</h2>
          <button className="btn btn-secondary" onClick={generateHistory} disabled={loading}>
            <span className="btn-icon">🔄</span>
            Atualizar
          </button>
        </div>

        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Gerando histórico...</p>
          </div>
        )}

        {!loading && matches.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">📋</span>
            <h3>Nenhuma partida encontrada</h3>
            <p>Jogue algumas partidas para ver o histórico aqui.</p>
            <button className="btn btn-primary" onClick={() => navigate('/match')}>
              <span className="btn-icon">⚽</span>
              Jogar Agora
            </button>
          </div>
        )}

        {!loading && matches.length > 0 && (
          <div className="history-list">
            {matches.map((match) => (
              <div key={match.id} className={`history-card ${getResultClass(match.result)}`}>
                <div className="history-date">{match.date}</div>
                <div className="history-score">
                  <div className="history-team home">
                    <span className="history-team-name">Porto FC</span>
                    <span className="history-goals">{match.homeScore}</span>
                  </div>
                  <span className="history-divider">-</span>
                  <div className="history-team away">
                    <span className="history-goals">{match.awayScore}</span>
                    <span className="history-team-name">{match.adversary}</span>
                  </div>
                </div>
                <div className="history-result">
                  <span className={`result-badge ${getResultClass(match.result)}`}>
                    {match.result === 'Vitória' ? '🏆' : match.result === 'Derrota' ? '❌' : '🤝'}
                    {match.result}
                  </span>
                </div>
                <div className="history-details">
                  <div className="history-stats">
                    <span>📊 Posse: {match.homePossession}% - {match.awayPossession}%</span>
                  </div>
                  {match.homeGoalScorers.length > 0 && (
                    <div className="history-scorers">
                      <span>⚽ Artilheiros: </span>
                      {match.homeGoalScorers.map((s, i) => (
                        <span key={i} className="scorer-tag">{s}</span>
                      ))}
                    </div>
                  )}
                  {match.mvp && match.mvp !== 'Ninguém' && (
                    <div className="history-mvp">
                      <span>⭐ MVP: {match.mvp}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;