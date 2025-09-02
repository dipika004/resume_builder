// src/pages/ResumeBuilderPage.jsx
import React, { useState, useEffect, useRef } from "react";
import ResumeForm from "../components/resume/ResumeForm";
import ResumePreview from "../components/resume/ResumePreview";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import html2pdf from "html2pdf.js";

const ResumeBuilderPage = ({ resumeData: propData, setResumeData: setPropData, editIndex }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const editId = searchParams.get("edit");

  // Delete Resume
const handleDelete = async () => {
  if (!editId) {
    alert("No resume selected to delete");
    return;
  }

  if (!window.confirm("Are you sure you want to delete this resume?")) return;

  try {
    await axios.delete(`http://localhost:8080/api/resumes/${editId}`, {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}` },
    });

    // Remove from localStorage
    let savedResumes = JSON.parse(localStorage.getItem("resumes")) || [];
    savedResumes = savedResumes.filter((_, idx) => idx !== editIndex);
    localStorage.setItem("resumes", JSON.stringify(savedResumes));

    alert("Resume deleted successfully!");
    navigate("/dashboard");
  } catch (err) {
    console.error(err);
    alert("Error deleting resume");
  }
};


  const [resumeData, setResumeData] = useState(
    propData || {
      personal: { name: "", email: "", phone: "", address: "", linkedin: "", github: "", portfolio: "", summary: "" },
      education: [],
      experience: [],
      projects: [],
      certifications: [],
      skills: [],
    }
  );

  const previewRef = useRef();

  // Fetch existing resume from backend if editing
  useEffect(() => {
    if (editId && !propData) {
      axios
        .get(`http://localhost:8080/api/resumes/${editId}`, {
          headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}` },
        })
        .then((res) => setResumeData(res.data))
        .catch((err) => console.log(err));
    }
  }, [editId, propData]);

  // Save / Update Resume
  const handleSave = async () => {
    try {
      if (editId) {
        await axios.put(
          `http://localhost:8080/api/resumes/${editId}`,
          resumeData,
          { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}` } }
        );
        alert("Resume updated successfully!");
      } else {
        await axios.post(
          "http://localhost:8080/api/resumes",
          resumeData,
          { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}` } }
        );
        alert("Resume created successfully!");
      }

      // Save to localStorage
      const savedResumes = JSON.parse(localStorage.getItem("resumes")) || [];
      if (typeof editIndex === "number") {
        savedResumes[editIndex] = resumeData;
      } else {
        savedResumes.push(resumeData);
      }
      localStorage.setItem("resumes", JSON.stringify(savedResumes));

      if (setPropData) setPropData(resumeData);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error saving resume");
    }
  };

  // Download PDF using html2pdf
  const handleDownloadPDF = () => {
    if (!previewRef.current) return;

    const element = previewRef.current;

    const options = {
      margin: 0.5,
      filename: `${resumeData.personal.name || "resume"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="flex flex-col md:flex-row p-6 gap-6">
          {/* Form Section */}
          <div className="flex-1 bg-white rounded-2xl shadow-md p-6 overflow-auto">
            <h2 className="text-xl font-bold mb-4">
              {editId || typeof editIndex === "number" ? "Edit Resume" : "Build Your Resume"}
            </h2>
            <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
              >
                Save Resume
              </button>
              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              >
                Download PDF
              </button>
              {editId && (
    <button
      onClick={handleDelete}
      className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
    >
      Delete Resume
    </button>
  )}
            </div>
          </div>

          {/* Preview Section */}
          <div className="flex-1 bg-white rounded-2xl shadow-md p-6 overflow-auto">
            <h2 className="text-xl font-bold mb-4">Preview</h2>
            {resumeData.personal.name ||
            resumeData.education.length ||
            resumeData.experience.length ||
            resumeData.skills.length ? (
              <div ref={previewRef}>
                <ResumePreview resumeData={resumeData} />
              </div>
            ) : (
              <p className="text-gray-500 text-center mt-4">
                Your resume preview will appear here after adding details.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilderPage;
