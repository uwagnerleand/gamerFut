import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { simulateMatch, getRandomAdversary } from '../services/matchSimulation';
import { PORTO_PLAYERS } from '../services/gameData';
import './Pages.css';

function Standings() {
  const navigate = useNavigate();
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topScorers, setTopScorers] = useState([]);
  const [topAssists, setTopAssists] = useState([]);

  const generateStandings = async () => {
    setLoading(true);

    const teams = [
      { name: 'Porto FC', id: 'home' },
      { name: 'Atlético Norte', id: 'adv-1' },
      { name: 'Real Santarém', id: 'adv-2' },
      { name: 'União Amazônica', id: 'adv-3' },
      { name: 'Estrela Azul', id: 'adv-4' },
      { name: 'Fênix FC', id: 'adv-5' },
      { name: 'Águias do Oeste', id: 'adv-6' },
      { name: 'Imperial FC', id: 'adv-7' },
      { name: 'Tigres do Tapajós', id: 'adv-8' }
    ];

    // Simulate a season of matches
    const teamStats = {};
    teams.forEach(t => {
      teamStats[t.id] = {
        name: t.name,
        points: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        played: 0
      };
    });

    const scorersMap = {};

    // Simulate matches between all teams (round robin)
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        const adv = getRandomAdversary();
        const portoTeam = { id: teams[i].id, name: teams[i].name };
        const awayTeam = { id: teams[j].id, name: teams[j].name };
        const homePlayers = teams[i].id === 'home' ? PORTO_PLAYERS : adv.players;
        const awayPlayers = teams[j].id === 'home' ? PORTO_PLAYERS : adv.players;

        const result = simulateMatch(portoTeam, awayTeam, homePlayers, awayPlayers);

        // Update home team
        teamStats[teams[i].id].goalsFor += result.homeScore;
        teamStats[teams[i].id].goalsAgainst += result.awayScore;
        teamStats[teams[i].id].played++;

        if (result.homeScore > result.awayScore) {
          teamStats[teams[i].id].points += 3;
          teamStats[teams[i].id].wins++;
        } else if (result.homeScore === result.awayScore) {
          teamStats[teams[i].id].points += 1;
          teamStats[teams[i].id].draws++;
        } else {
          teamStats[teams[i].id].losses++;
        }

        // Update away team
        teamStats[teams[j].id].goalsFor += result.awayScore;
        teamStats[teams[j].id].goalsAgainst += result.homeScore;
        teamStats[teams[j].id].played++;

        if (result.awayScore > result.homeScore) {
          teamStats[teams[j].id].points += 3;
          teamStats[teams[j].id].wins++;
        } else if (result.awayScore === result.homeScore) {
          teamStats[teams[j].id].points += 1;
          teamStats[teams[j].id].draws++;
        } else {
          teamStats[teams[j].id].losses++;
        }

        // Track scorers locally
        if (result.homeGoalScorers.length > 0) {
          result.homeGoalScorers.forEach(name => {
            if (!scorersMap[name]) {
              scorersMap[name] = { name, team: teams[i].name, goals: 0, assists: 0 };
            }
            scorersMap[name].goals++;
          });
        }

        if (result.homeAssists.length > 0) {
          result.homeAssists.forEach(name => {
            if (!scorersMap[name]) {
              scorersMap[name] = { name, team: teams[i].name, goals: 0, assists: 0 };
            }
            scorersMap[name].assists++;
          });
        }
      }
    }

    // Convert to array and sort
    const standingsArray = Object.values(teamStats);
    standingsArray.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      const gdA = a.goalsFor - a.goalsAgainst;
      const gdB = b.goalsFor - b.goalsAgainst;
      if (gdB !== gdA) return gdB - gdA;
      return b.goalsFor - a.goalsFor;
    });

    setStandings(standingsArray);

    const localScorers = Object.values(scorersMap);
    // Sort scorers
    const sortedScorers = [...localScorers].sort((a, b) => b.goals - a.goals).slice(0, 10);
    setTopScorers(sortedScorers);

    const sortedAssists = [...localScorers].sort((a, b) => (b.assists || 0) - (a.assists || 0)).slice(0, 10);
    setTopAssists(sortedAssists);

    setLoading(false);
  };

  useEffect(() => {
    generateStandings();
  }, []);

  return (
    <div className="page standings-page">
      <div className="container">
        <div className="page-header">
          <h2 className="page-title">🏆 Classificação</h2>
          <button className="btn btn-secondary" onClick={generateStandings} disabled={loading}>
            <span className="btn-icon">🔄</span>
            Atualizar
          </button>
        </div>

        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Gerando classificação...</p>
          </div>
        )}

        {!loading && (
          <div className="standings-content">
            {/* Main Standings Table */}
            <div className="standings-table-container">
              <h3 className="section-title">Tabela</h3>
              <div className="standings-table">
                <div className="standings-header">
                  <span className="col-pos">#</span>
                  <span className="col-team">Time</span>
                  <span className="col-stat">P</span>
                  <span className="col-stat">J</span>
                  <span className="col-stat">V</span>
                  <span className="col-stat">E</span>
                  <span className="col-stat">D</span>
                  <span className="col-stat">GP</span>
                  <span className="col-stat">GC</span>
                  <span className="col-stat">SG</span>
                </div>
                {standings.map((team, index) => (
                  <div
                    key={team.name}
                    className={`standings-row ${team.name === 'Porto FC' ? 'porto-row' : ''} ${
                      index < 4 ? 'zone-qualify' : ''
                    } ${index >= standings.length - 2 ? 'zone-relegate' : ''}`}
                  >
                    <span className="col-pos">{index + 1}</span>
                    <span className="col-team">
                      <span className="team-badge">
                        {team.name === 'Porto FC' ? 'PFC' : team.name.charAt(0)}
                      </span>
                      {team.name}
                    </span>
                    <span className="col-stat points">{team.points}</span>
                    <span className="col-stat">{team.played}</span>
                    <span className="col-stat wins">{team.wins}</span>
                    <span className="col-stat draws">{team.draws}</span>
                    <span className="col-stat losses">{team.losses}</span>
                    <span className="col-stat">{team.goalsFor}</span>
                    <span className="col-stat">{team.goalsAgainst}</span>
                    <span className={`col-stat ${team.goalsFor - team.goalsAgainst > 0 ? 'positive' : team.goalsFor - team.goalsAgainst < 0 ? 'negative' : ''}`}>
                      {team.goalsFor - team.goalsAgainst > 0 ? '+' : ''}{team.goalsFor - team.goalsAgainst}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Scorers & Assists */}
            <div className="standings-extras">
              <div className="top-scorers">
                <h3 className="section-title">⚽ Artilharia</h3>
                <div className="top-list">
                  {topScorers.length === 0 && (
                    <p className="empty-text">Nenhum gol marcado ainda.</p>
                  )}
                  {topScorers.map((scorer, index) => (
                    <div key={index} className="top-item">
                      <span className="top-position">{index + 1}º</span>
                      <div className="top-info">
                        <span className="top-name">{scorer.name}</span>
                        <span className="top-team">{scorer.team}</span>
                      </div>
                      <span className="top-stat">{scorer.goals} gols</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="top-assists">
                <h3 className="section-title">🎯 Assistências</h3>
                <div className="top-list">
                  {topAssists.filter(a => a.assists > 0).length === 0 && (
                    <p className="empty-text">Nenhuma assistência registrada.</p>
                  )}
                  {topAssists.filter(a => a.assists > 0).map((scorer, index) => (
                    <div key={index} className="top-item">
                      <span className="top-position">{index + 1}º</span>
                      <div className="top-info">
                        <span className="top-name">{scorer.name}</span>
                        <span className="top-team">{scorer.team}</span>
                      </div>
                      <span className="top-stat">{scorer.assists} assists</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Standings;