// src/components/dashboard/Topbar.jsx
import React from "react";
import { useAuth } from "../../context/AuthContext";

const Topbar = () => {
  const { user } = useAuth();

  return (
    <div className="w-full bg-white border-b px-6 py-4 flex justify-between items-center shadow-sm">
      <h2 className="text-xl font-bold">Welcome, {user?.name || "User"}</h2>
      <div className="text-gray-600">{user?.email}</div>
    </div>
  );
};

export default Topbar;
