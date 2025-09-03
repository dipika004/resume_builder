// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      if (!user) return;
      try {
        const res = await axios.get("https://resume-builder-6izk.onrender.com/api/resumes", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setResumes(res.data);
      } catch (err) {
        console.error("Failed to fetch resumes:", err);
      }
    };

    fetchResumes();
  }, [user]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="p-6 flex-1 overflow-y-auto">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.length === 0 ? (
              <NoResumesCard />
            ) : (
              resumes.map((resume) => (
                <ResumeCard key={resume._id} resume={resume} />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

// Show when no resumes exist
function NoResumesCard() {
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

// Card for each resume
function ResumeCard({ resume }) {
  return (
    <div className="rounded-2xl border bg-white p-5 flex flex-col justify-between shadow hover:shadow-md transition">
      <div>
        <h3 className="font-semibold text-lg mb-1">{resume.personal.name || "Untitled Resume"}</h3>
        <p className="text-sm text-gray-600">
          {resume.personal.email || "No email provided"}
        </p>
      </div>
      <Link
        to={`/resume-builder?edit=${resume._id}`}
        className="inline-block mt-4 px-3 py-2 rounded-xl border text-center text-gray-900 hover:bg-gray-50 transition"
      >
        Edit Resume
      </Link>
    </div>
  );
}
