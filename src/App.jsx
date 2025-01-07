// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./styles/App.css";
import { FaSun, FaMoon } from "react-icons/fa"; // Íconos para el cambio de tema
import Graphs from "./pages/Graphs";

import Home from "./pages/Home";
import Sonidos from "./pages/Sonidos";
import Cards from "./pages/Cards";
import Sprints from "./pages/Sprints";


function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <Router>
      <div className={`App ${theme}`}>
        <nav className="navbar">
          <div className="nav-links">
            <Link to="/" className="nav-link">Sprint</Link>
            <Link to="/sonidos" className="nav-link">Sonidos</Link>
            <Link to="/cards" className="nav-link">Post-its</Link>
            <Link to="/sprints" className="nav-link">Sprints</Link>
            <Link to="/graphs" className="nav-link">Gráficos</Link>

          </div>
          <button className="btnToggleTheme" onClick={toggleTheme}>
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sonidos" element={<Sonidos />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/sprints" element={<Sprints />} />
          <Route path="/graphs" element={<Graphs />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
