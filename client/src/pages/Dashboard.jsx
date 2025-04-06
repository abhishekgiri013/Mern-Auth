import React from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiActivity } from "react-icons/fi";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 p-6 relative overflow-hidden">
      {/* Top Logo */}
      <div className="absolute top-6 left-6">
        <img
          onClick={() => navigate("/")}
          src="/logo.svg"
          alt="Logo"
          className="w-28 sm:w-32 cursor-pointer hover:scale-105 transition-transform duration-200"
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center mt-24">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white text-center mb-4 drop-shadow-lg">
          Welcome to Your Dashboard
        </h1>
        <p className="text-lg text-white/80 text-center mb-12 max-w-2xl">
          Get insights, track your data, and manage your content seamlessly from one place.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-4">
          <DashboardCard
            icon={<FiUser size={28} className="text-indigo-400" />}
            title="Profile Views"
            value="1,234"
          />
          <DashboardCard
            icon={<FiMail size={28} className="text-pink-400" />}
            title="New Messages"
            value="87"
          />
          <DashboardCard
            icon={<FiActivity size={28} className="text-green-400" />}
            title="Activity"
            value="99%"
          />
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ icon, title, value }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl text-white hover:scale-105 hover:shadow-indigo-500/30 transition-transform duration-300 ease-in-out">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-white/20 p-3 rounded-full">{icon}</div>
        <h2 className="text-lg font-semibold tracking-wide">{title}</h2>
      </div>
      <p className="text-4xl font-bold tracking-wide">{value}</p>
    </div>
  );
};

export default Dashboard;
