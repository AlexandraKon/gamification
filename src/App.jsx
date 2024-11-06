// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./styles/App.css";
import { FaSun, FaMoon } from "react-icons/fa"; // Íconos para el cambio de tema
import Home from "./pages/Home";
import Sonidos from "./pages/Sonidos";
import Cards from "./pages/Cards";

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
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/sonidos" className="nav-link">Sonidos</Link>
            <Link to="/cards" className="nav-link">Cards</Link>
          </div>
          <button className="btnToggleTheme" onClick={toggleTheme}>
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sonidos" element={<Sonidos />} />
          <Route path="/cards" element={<Cards />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
