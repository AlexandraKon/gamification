// src/components/ThemeToggle.js
import React from "react";

function ThemeToggle({ theme, toggleTheme }) {
  return (
    <div className="divCrear">
      <button className="btnToggleTheme" onClick={toggleTheme}>
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
    </div>
  );
}

export default ThemeToggle;
