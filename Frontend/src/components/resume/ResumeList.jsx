// src/components/resume/ResumeList.jsx
import React from "react";
import { Link } from "react-router-dom";

const ResumeList = ({ resumes }) => {
  if (!resumes || resumes.length === 0) {
    return <p className="text-gray-500 text-center">No resumes yet. Create your first resume!</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resumes.map((resume, idx) => (
        <div
          key={idx}
          className="border rounded-2xl p-5 flex flex-col justify-between shadow hover:shadow-md transition"
        >
          <div>
            <h3 className="font-semibold text-lg">{resume.personal.name || "Your Name"}</h3>
            <p className="text-gray-600 text-sm">{resume.personal.email}</p>
          </div>
          <div className="flex gap-2 mt-4">
            <Link
              to={`/resume-builder?edit=${idx}`}
              className="px-3 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
            >
              Edit
            </Link>
            <button
              className="px-3 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this resume?")) {
                  const updated = resumes.filter((_, i) => i !== idx);
                  localStorage.setItem("resumes", JSON.stringify(updated));
                  window.location.reload();
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResumeList;
