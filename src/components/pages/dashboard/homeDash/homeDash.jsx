
import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaClipboardList,
  FaTable,
  FaCheckCircle,
  FaStar,
  FaRegCalendarAlt,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const StatisticCard = ({ title, value, icon, color }) => (
  <div
    className={`flex items-center space-x-4 rounded-xl p-6 text-white shadow-lg ${color}`}
  >
    <div className="text-4xl">{icon}</div>
    <div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const StatisticsPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/statistics")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch statistics");
        return res.json();
      })
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <p className="mt-12 text-center text-gray-500">Loading statistics...</p>
    );
  if (error) return <p className="mt-12 text-center text-red-500">{error}</p>;

  const tableData = [
    { name: "Reserved Tables", value: stats.reserved_tables },
    { name: "Available Tables", value: stats.available_tables },
  ];

  const reservationsData = [
    { name: "Total Reservations", value: stats.total_reservations },
    { name: "Special Reservations", value: stats.special_reservations },
    {
      name: "Special Event Reservations",
      value: stats.special_event_reservations,
    },
  ];

  const COLORS = ["#FFBB28", "#00C49F"];

  return (
    <div className="min-h-screen mx-16 p-10">
      <h1 className="mb-10 text-center text-4xl font-Carter">
        Dashboard Statistics
      </h1>

      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatisticCard
          title="Total Reservations"
          value={stats.total_reservations}
          icon={<FaClipboardList />}
          color="bg-blue-500"
        />
        <StatisticCard
          title="Special Reservations"
          value={stats.special_reservations}
          icon={<FaStar />}
          color="bg-purple-500"
        />
        <StatisticCard
          title="Total Tables"
          value={stats.total_tables}
          icon={<FaTable />}
          color="bg-green-500"
        />
        <StatisticCard
          title="Reserved Tables"
          value={stats.reserved_tables}
          icon={<FaCheckCircle />}
          color="bg-yellow-500"
        />
        <StatisticCard
          title="Available Tables"
          value={stats.available_tables}
          icon={<FaRegCalendarAlt />}
          color="bg-indigo-500"
        />
        <StatisticCard
          title="Total Users"
          value={stats.total_users}
          icon={<FaUsers />}
          color="bg-pink-500"
        />
        <StatisticCard
          title="Special Event Reservations"
          value={stats.special_event_reservations}
          icon={<FaStar />}
          color="bg-red-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-center text-xl font-bold text-gray-700">
            Reservations Overview
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reservationsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-center text-xl font-bold text-gray-700">
            Tables Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={tableData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {tableData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
