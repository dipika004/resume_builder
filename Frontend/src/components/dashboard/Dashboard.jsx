// src/pages/DashboardPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar can be added here if you have it */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Welcome, {user?.name || user?.email}</p>
        </div>

        {/* Main content */}
        <main className="p-6 flex-1">
          {/* Action Section */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            <div>
              <h2 className="text-xl font-bold mb-1">Your Resumes</h2>
              <p className="text-gray-600">Create, edit, and manage your resumes</p>
            </div>
            <Link
              to="/resume-builder"
              className="px-4 py-2 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
            >
              + New Resume
            </Link>
          </div>

          {/* Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder Card */}
            <EmptyCard />
            <EmptyCard />
            <EmptyCard />
          </div>
        </main>
      </div>
    </div>
  );
}

function EmptyCard() {
  return (
    <div className="rounded-2xl border bg-white p-5 flex flex-col justify-between shadow hover:shadow-md transition">
      <div>
        <h3 className="font-semibold text-lg mb-1">No resumes yet</h3>
        <p className="text-sm text-gray-600">
          Create your first resume to see it here with version history.
        </p>
      </div>
      <Link
        to="/resume-builder"
        className="inline-block mt-4 px-3 py-2 rounded-xl border text-center text-gray-900 hover:bg-gray-50 transition"
      >
        Build Resume
      </Link>
    </div>
  );
}
