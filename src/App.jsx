import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Match from './pages/Match';
import History from './pages/History';
import Standings from './pages/Standings';
import './styles/global.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-logo">
            <div className="logo-icon">PFC</div>
            <div className="logo-text">
              <h1>Porto FC</h1>
              <span>Manager Simulator</span>
            </div>
          </div>
          <nav className="header-nav">
            <NavLink to="/" icon="🏠" label="Início" />
            <NavLink to="/match" icon="⚽" label="Partida" />
            <NavLink to="/history" icon="📋" label="Histórico" />
            <NavLink to="/standings" icon="🏆" label="Classificação" />
          </nav>
        </div>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/match" element={<Match />} />
          <Route path="/history" element={<History />} />
          <Route path="/standings" element={<Standings />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p>&copy; 2026 Porto FC Manager Simulator. Todos os direitos reservados.</p>
          <p className="footer-motto">#ForçaPorto</p>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ to, icon, label }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <button
      className={`nav-btn ${isActive ? 'active' : ''}`}
      onClick={() => navigate(to)}
      title={label}
    >
      <span className="nav-icon">{icon}</span>
      <span className="nav-label">{label}</span>
    </button>
  );
}

export default App;