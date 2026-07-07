import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="page home-page">
      <div className="home-hero">
        <div className="home-logo">
          <div className="home-logo-shield">
            <div className="shield-inner">
              <span className="shield-text">PFC</span>
              <span className="shield-year">2026</span>
            </div>
          </div>
        </div>

        <h1 className="home-title">Porto FC</h1>
        <p className="home-subtitle">Manager Simulator</p>
        <p className="home-description">
          Simule partidas de futsal emocionantes, acompanhe estatísticas em tempo real
          e lidere o Porto FC à glória!
        </p>

        <div className="home-actions">
          <button
            className="btn btn-primary btn-large home-btn"
            onClick={() => navigate('/match')}
          >
            <span className="btn-icon">⚽</span>
            Nova Partida
          </button>

          <div className="home-secondary-actions">
            <button
              className="btn btn-secondary"
              onClick={() => navigate('/history')}
            >
              <span className="btn-icon">📋</span>
              Histórico
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate('/standings')}
            >
              <span className="btn-icon">🏆</span>
              Classificação
            </button>
          </div>
        </div>
      </div>

      <div className="home-info">
        <div className="info-cards">
          <div className="info-card">
            <div className="info-card-icon">👥</div>
            <h3>9 Jogadores</h3>
            <p>Elenco completo do Porto FC</p>
          </div>
          <div className="info-card">
            <div className="info-card-icon">🏟️</div>
            <h3>8 Adversários</h3>
            <p>Times desafiadores para enfrentar</p>
          </div>
          <div className="info-card">
            <div className="info-card-icon">⏱️</div>
            <h3>40 Minutos</h3>
            <p>Partidas completas de futsal</p>
          </div>
          <div className="info-card">
            <div className="info-card-icon">📊</div>
            <h3>Estatísticas</h3>
            <p>Acompanhe todos os dados</p>
          </div>
        </div>
      </div>

      <div className="home-squad">
        <h2 className="section-title">Elenco do Porto FC</h2>
        <div className="squad-grid">
          <SquadCard name="Wagner" position="Goleiro" number={1} />
          <SquadCard name="Lucas" position="Fixo" number={2} />
          <SquadCard name="Daniel" position="Fixo" number={3} />
          <SquadCard name="Gledisson" position="Fixo" number={4} />
          <SquadCard name="Cadu" position="Ala" number={5} />
          <SquadCard name="Vyni" position="Ala" number={6} />
          <SquadCard name="Tayson" position="Ala" number={7} />
          <SquadCard name="Luan" position="Ala" number={8} />
          <SquadCard name="Erick" position="Pivô" number={9} />
          <SquadCard name="Gabriel" position="Pivô" number={10} />
        </div>
      </div>
    </div>
  );
}

function SquadCard({ name, position, number }) {
  const positionColors = {
    'Goleiro': '#22c55e',
    'Fixo': '#3b82f6',
    'Ala': '#f59e0b',
    'Pivô': '#ef4444'
  };

  return (
    <div className="squad-card">
      <div className="squad-number" style={{ background: positionColors[position] }}>
        {number}
      </div>
      <div className="squad-info">
        <h4 className="squad-name">{name}</h4>
        <span className="squad-position">{position}</span>
      </div>
    </div>
  );
}

export default Home;