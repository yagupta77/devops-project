import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import BackendDashboard from "./components/BackendDashboard";
import Metrics from "./components/Metrics";
import Logs from "./components/Logs";
import Alerts from "./components/Alerts";
import "./styles/App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Router>
        <nav className="navbar">
          <div className="nav-left">
            <span className="logo">DevOps Dashboard</span>
          </div>
          <div className="nav-right">
            <NavLink to="/" className="nav-link">Dashboard</NavLink>
            <NavLink to="/metrics" className="nav-link">Metrics</NavLink>
            <NavLink to="/logs" className="nav-link">Logs</NavLink>
            <NavLink to="/alerts" className="nav-link">Alerts</NavLink>
            <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "🌞" : "🌙"}
            </button>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<BackendDashboard darkMode={darkMode} />} />
          <Route path="/metrics" element={<Metrics darkMode={darkMode} />} />
          <Route path="/logs" element={<Logs darkMode={darkMode} />} />
          <Route path="/alerts" element={<Alerts darkMode={darkMode} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
