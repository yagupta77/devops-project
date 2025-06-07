import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

// === REST Endpoints ===

// GET /logs?level=info|warn|error|all
app.get('/logs', (req, res) => {
  const { level } = req.query;

  const allLogs = [
    { id: 1, level: 'info', message: 'Server started', timestamp: new Date().toISOString() },
    { id: 2, level: 'warn', message: 'Memory usage high', timestamp: new Date().toISOString() },
    { id: 3, level: 'error', message: 'Database error', timestamp: new Date().toISOString() },
  ];

  const filteredLogs = level && level !== 'all'
    ? allLogs.filter(log => log.level === level)
    : allLogs;

  res.json(filteredLogs);
});

// GET /alerts?type=security|performance|all
app.get('/alerts', (req, res) => {
  const { type } = req.query;

  const allAlerts = [
    { id: 1, type: 'info', message: 'Routine system check complete', timestamp: new Date().toISOString() },
    { id: 2, type: 'warning', message: 'High CPU usage detected', timestamp: new Date().toISOString() },
    { id: 3, type: 'critical', message: 'Unauthorized access attempt blocked', timestamp: new Date().toISOString() },
    { id: 4, type: 'info', message: 'New user registered', timestamp: new Date().toISOString() },
  ];

  const filteredAlerts = type && type !== 'all'
    ? allAlerts.filter(alert => alert.type === type)
    : allAlerts;

  res.json(filteredAlerts);
});

// GET /
app.get("/", (req, res) => {
  res.json({ message: "Hello from backend" });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
// Add this AFTER all your other routes
app.use((req, res) => {
  res.status(404).json({ error: "Page not found" });
});
