// src/components/dashboard/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="w-64 bg-white border-r min-h-screen p-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-8">ResumePlatform</h1>

      <nav className="flex flex-col gap-3">
        <Link
          to="/dashboard"
          className="px-3 py-2 rounded hover:bg-gray-100 font-medium"
        >
          Dashboard
        </Link>

        <Link
          to="/resume-builder"
          className="px-3 py-2 rounded hover:bg-gray-100 font-medium"
        >
          Build Resume
        </Link>

        <button
          onClick={logout}
          className="px-3 py-2 mt-auto rounded bg-red-500 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
