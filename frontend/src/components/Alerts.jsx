import React, { useEffect, useState } from "react";

const ALERT_TYPES = ["all", "info", "warning", "critical"];

function Alerts({ darkMode }) {
  const [alerts, setAlerts] = useState([]);
  const [typeFilter, setTypeFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAlerts = async (type) => {
    setLoading(true);
    setError(null);
    try {
      const query = type && type !== "all" ? `?type=${type}` : "";
      const response = await fetch(`http://localhost:5000/alerts${query}`);

      if (!response.ok) throw new Error("Failed to fetch alerts");

      const data = await response.json();
      setAlerts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts(typeFilter);
  }, [typeFilter]);

  return (
    <div className={darkMode ? "alerts-page dark" : "alerts-page"}>
      <h2>🚨 Alerts</h2>

      <div>
        <label>Filter by Type: </label>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          {ALERT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Loading alerts...</p>}
      {error && <p className="error">Error: {error}</p>}

      {!loading && !error && (
        <div style={{ maxHeight: "400px", overflowY: "auto", marginTop: "1rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Message</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert) => (
                <tr key={alert.id}>
                  <td>{alert.id}</td>
                  <td style={{ textTransform: "capitalize" }}>{alert.type}</td>
                  <td>{alert.message}</td>
                  <td>{new Date(alert.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {alerts.length === 0 && <p>No alerts found.</p>}
        </div>
      )}
    </div>
  );
}

export default Alerts;
