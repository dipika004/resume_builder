import React, { useState } from "react";
import ResumeBuilderPage from "../../pages/ResumeBuilderPage";

const ResumeEditor = ({ index }) => {
  const savedResumes = JSON.parse(localStorage.getItem("resumes")) || [];
  const [resumeData, setResumeData] = useState(savedResumes[index] || null);

  return <ResumeBuilderPage resumeData={resumeData} setResumeData={setResumeData} editIndex={index} />;
};

export default ResumeEditor;
