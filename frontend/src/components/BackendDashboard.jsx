import React, { useEffect, useState } from "react";

function BackendDashboard({ darkMode }) {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => setError("Failed to fetch backend message"));
  }, []);

  if (error) return <div className={darkMode ? "dashboard dark" : "dashboard"}>Error: {error}</div>;

  return (
    <div className={darkMode ? "dashboard dark" : "dashboard"}>
      <h2>Backend Dashboard (REST API)</h2>
      {message ? <p>{message}</p> : <p>Loading data...</p>}
    </div>
  );
}

export default BackendDashboard;
