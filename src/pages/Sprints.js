import React, { useState, useEffect } from "react";
import teamData from "../services/sprints.json";
import userData from "../services/users.json";
import "../styles/Sprints.css";

function Sprints() {
  const [view, setView] = useState("teams"); // "teams" o "users"
  const [data, setData] = useState(teamData); // Datos iniciales
  const [expandedYear, setExpandedYear] = useState(null); // Año desplegado

  useEffect(() => {
    if (view === "teams") {
      setData(teamData);
    } else {
      setData(userData);
    }
  }, [view]);

  const handleViewChange = (event) => {
    setView(event.target.value);
  };

  const toggleYear = (year) => {
    setExpandedYear((prevYear) => (prevYear === year ? null : year));
  };

  const getRankClass = (rank) => {
    switch (rank) {
      case 1:
        return "gold";
      case 2:
        return "silver";
      case 3:
        return "bronze";
      default:
        return "";
    }
  };

  const renderSprints = () => {
    return Object.entries(data).map(([year, months]) => (
      <div key={year} className="year">
        <h2 onClick={() => toggleYear(year)} className="year-header">
          {year}
          <span className="toggle-icon">{expandedYear === year ? "▲" : "▼"}</span>
        </h2>
        {expandedYear === year && (
          <div className="year-content">
            {Object.entries(months).map(([month, entries]) => {
              // Clasificar por puntaje total (descendente)
              const sortedEntries = Array.isArray(entries)
                ? [...entries].sort((a, b) => b.Total - a.Total) // Para usuarios
                : Object.entries(entries)
                    .map(([team, stats]) => ({ team, ...stats }))
                    .sort((a, b) => b.Total - a.Total); // Para equipos

              return (
                <div key={month} className="month">
                  <h3>{month}</h3>
                  <div className="table-container">
                    <table className="table">
                      <thead>
                        <tr>
                          {view === "teams" ? (
                            <>
                              <th>Equipo</th>
                              <th>Backlog</th>
                              <th>Trello</th>
                              <th>Total</th>
                            </>
                          ) : (
                            <>
                              <th>Nombre</th>
                              <th>Backlog</th>
                              <th>Trello</th>
                              <th>Total</th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {sortedEntries.map((entry, index) => {
                          const rankClass = getRankClass(index + 1); // Posición (1 = oro, 2 = plata, 3 = bronce)
                          return (
                            <tr key={index} className={rankClass}>
                              {view === "teams" ? (
                                <>
                                  <td>{entry.team}</td>
                                  <td>{entry.Backlog}</td>
                                  <td>{entry.Trello}</td>
                                  <td>{entry.Total}</td>
                                </>
                              ) : (
                                <>
                                  <td>{entry.Name}</td>
                                  <td>{entry.Backlog}</td>
                                  <td>{entry.Trello}</td>
                                  <td>{entry.Total}</td>
                                </>
                              )}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="sprints">
      <div className="filters">
        <label>
          Ver por:
          <select value={view} onChange={handleViewChange}>
            <option value="teams">Por equipos</option>
            <option value="users">Por usuarios</option>
          </select>
        </label>
      </div>
      <div className="sprints-data">{renderSprints()}</div>
    </div>
  );
}

export default Sprints;
