import React, { useEffect, useState } from "react";

const LOG_LEVELS = ["all", "info", "warn", "error"];

function LogsPage({ darkMode }) {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch logs from backend
  const fetchLogs = async (level) => {
    setLoading(true);
    setError(null);

    try {
      const query = level && level !== "all" ? `?level=${level}` : "";
      const response = await fetch(`http://localhost:5000/logs${query}`);

      if (!response.ok) {
        throw new Error("Failed to fetch logs");
      }

      const data = await response.json();
      setLogs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(filter);
  }, [filter]);

  return (
    <div className={darkMode ? "logs-page dark" : "logs-page"}>
      <h2>Server Logs</h2>

      <div>
        <label>Filter by Level: </label>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          {LOG_LEVELS.map(level => (
            <option key={level} value={level}>
              {level.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Loading logs...</p>}
      {error && <p className="error">Error: {error}</p>}

      {!loading && !error && (
        <div className="logs-table-container" style={{ maxHeight: "400px", overflowY: "auto", marginTop: "1rem" }}>
          <table className="logs-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Level</th>
                <th>Message</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id}>
                  <td>{log.id}</td>
                  <td style={{ textTransform: "uppercase" }}>{log.level}</td>
                  <td>{log.message}</td>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {logs.length === 0 && <p>No logs found.</p>}
        </div>
      )}
    </div>
  );
}

export default LogsPage;
