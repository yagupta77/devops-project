import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const uptimeData = [
  { time: "10:00", uptime: 99 },
  { time: "11:00", uptime: 99.2 },
  { time: "12:00", uptime: 98.8 },
  { time: "13:00", uptime: 99.5 },
];

const usersData = [
  { time: "10:00", users: 120 },
  { time: "11:00", users: 132 },
  { time: "12:00", users: 140 },
  { time: "13:00", users: 125 },
];

function Metrics() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>📈 Server Uptime</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={uptimeData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="time" />
          <YAxis domain={[98, 100]} />
          <Tooltip />
          <Line type="monotone" dataKey="uptime" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

      <h2 style={{ marginTop: "40px" }}>👥 Active Users</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={usersData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="users" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Metrics;
