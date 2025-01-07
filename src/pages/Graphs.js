import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import teamData from "../services/sprints.json";
import userData from "../services/users.json";
import "../styles/Graphs.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Graphs() {
  const [view, setView] = useState("teams"); // "teams" o "users"
  const [expandedYear, setExpandedYear] = useState(null); // Año desplegado
  const data = view === "teams" ? teamData : userData;

  const toggleYear = (year) => {
    setExpandedYear((prevYear) => (prevYear === year ? null : year));
  };

  const handleViewChange = (event) => {
    setView(event.target.value);
  };

  const getGraphData = (entries) => {
    const labels = entries.map((entry) => view === "teams" ? entry.team : entry.Name);
    const backlogData = entries.map((entry) => entry.Backlog);
    const trelloData = entries.map((entry) => entry.Trello);
    const totalData = entries.map((entry) => entry.Total);

    return {
      labels,
      datasets: [
        {
          label: "Backlog",
          data: backlogData,
          backgroundColor: "rgba(75, 192, 192, 0.5)"
        },
        {
          label: "Trello",
          data: trelloData,
          backgroundColor: "rgba(54, 162, 235, 0.5)"
        },
        {
          label: "Total",
          data: totalData,
          backgroundColor: "rgba(255, 99, 132, 0.5)"
        }
      ]
    };
  };

  const renderGraphs = () => {
    return Object.entries(data).map(([year, months]) => (
      <div key={year} className="year">
        <h2 onClick={() => toggleYear(year)} className="year-header">
          {year}
          <span className="toggle-icon">{expandedYear === year ? "▲" : "▼"}</span>
        </h2>
        {expandedYear === year && (
          <div className="year-content">
            {Object.entries(months).map(([month, entries]) => {
              const sortedEntries = Array.isArray(entries)
                ? [...entries].sort((a, b) => b.Total - a.Total) // Para usuarios
                : Object.entries(entries)
                    .map(([team, stats]) => ({ team, ...stats }))
                    .sort((a, b) => b.Total - a.Total); // Para equipos

              return (
                <div key={month} className="month">
                  <h3>{month}</h3>
                  <div className="chart-container">
                    <Bar
                      data={getGraphData(sortedEntries)}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: "top"
                          },
                          title: {
                            display: true,
                            text: `${month} - ${year}`
                          }
                        }
                      }}
                    />
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
    <div className="graphs">
      <div className="filters">
        <label>
          Ver por:
          <select value={view} onChange={handleViewChange}>
            <option value="teams">Por equipos</option>
            <option value="users">Por usuarios</option>
          </select>
        </label>
      </div>
      <div className="graphs-data">{renderGraphs()}</div>
    </div>
  );
}

export default Graphs;
