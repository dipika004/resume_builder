import React from "react";

const ResumeForm = ({ resumeData, setResumeData }) => {
  // Personal Info Change
  const handlePersonalChange = (e) => {
    setResumeData({
      ...resumeData,
      personal: { ...resumeData.personal, [e.target.name]: e.target.value },
    });
  };

  // Education
  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, { school: "", degree: "", year: "" }],
    });
  };
  const removeEducation = (index) => {
    const updated = [...resumeData.education];
    updated.splice(index, 1);
    setResumeData({ ...resumeData, education: updated });
  };
  const handleEducationChange = (index, e) => {
    const updated = [...resumeData.education];
    updated[index][e.target.name] = e.target.value;
    setResumeData({ ...resumeData, education: updated });
  };

  // Experience
  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, { company: "", role: "", year: "" }],
    });
  };
  const removeExperience = (index) => {
    const updated = [...resumeData.experience];
    updated.splice(index, 1);
    setResumeData({ ...resumeData, experience: updated });
  };
  const handleExperienceChange = (index, e) => {
    const updated = [...resumeData.experience];
    updated[index][e.target.name] = e.target.value;
    setResumeData({ ...resumeData, experience: updated });
  };

  // Projects
  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [...(resumeData.projects || []), { title: "", description: "", link: "" }],
    });
  };
  const removeProject = (index) => {
    const updated = [...resumeData.projects];
    updated.splice(index, 1);
    setResumeData({ ...resumeData, projects: updated });
  };
  const handleProjectChange = (index, e) => {
    const updated = [...resumeData.projects];
    updated[index][e.target.name] = e.target.value;
    setResumeData({ ...resumeData, projects: updated });
  };

  // Certifications
  const addCertification = () => {
    setResumeData({
      ...resumeData,
      certifications: [...(resumeData.certifications || []), { name: "", org: "", link: "" }],
    });
  };
  const removeCertification = (index) => {
    const updated = [...resumeData.certifications];
    updated.splice(index, 1);
    setResumeData({ ...resumeData, certifications: updated });
  };
  const handleCertificationChange = (index, e) => {
    const updated = [...resumeData.certifications];
    updated[index][e.target.name] = e.target.value;
    setResumeData({ ...resumeData, certifications: updated });
  };

  // Skills
  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value.split(",").map((s) => s.trim());
    setResumeData({ ...resumeData, skills: skillsArray });
  };

  return (
    <div className="space-y-6">
      {/* Personal Info */}
      <div>
        <h3 className="font-semibold mb-2">Personal Info</h3>
        <input type="text" name="name" placeholder="Full Name" value={resumeData.personal.name} onChange={handlePersonalChange} className="w-full border rounded p-2 mb-2" />
        <input type="email" name="email" placeholder="Email" value={resumeData.personal.email} onChange={handlePersonalChange} className="w-full border rounded p-2 mb-2" />
        <input type="text" name="phone" placeholder="Phone" value={resumeData.personal.phone} onChange={handlePersonalChange} className="w-full border rounded p-2 mb-2" />
        <input type="text" name="address" placeholder="Address" value={resumeData.personal.address} onChange={handlePersonalChange} className="w-full border rounded p-2 mb-2" />
        <input type="text" name="linkedin" placeholder="LinkedIn URL" value={resumeData.personal.linkedin || ""} onChange={handlePersonalChange} className="w-full border rounded p-2 mb-2" />
        <input type="text" name="github" placeholder="GitHub URL" value={resumeData.personal.github || ""} onChange={handlePersonalChange} className="w-full border rounded p-2 mb-2" />
        <input type="text" name="portfolio" placeholder="Portfolio / Website URL" value={resumeData.personal.portfolio || ""} onChange={handlePersonalChange} className="w-full border rounded p-2 mb-2" />
        <textarea name="summary" placeholder="Professional Summary / Objective" value={resumeData.personal.summary || ""} onChange={handlePersonalChange} className="w-full border rounded p-2 mb-2" rows={3} />
      </div>

      {/* Education */}
      <div>
        <h3 className="font-semibold mb-2">Education</h3>
        {resumeData.education.map((edu, idx) => (
          <div key={idx} className="mb-3 border p-2 rounded">
            <input type="text" name="school" placeholder="School/College" value={edu.school} onChange={(e) => handleEducationChange(idx, e)} className="w-full border rounded p-1 mb-1" />
            <input type="text" name="degree" placeholder="Degree/Certification" value={edu.degree} onChange={(e) => handleEducationChange(idx, e)} className="w-full border rounded p-1 mb-1" />
            <input type="text" name="year" placeholder="Year" value={edu.year} onChange={(e) => handleEducationChange(idx, e)} className="w-full border rounded p-1 mb-1" />
            <button type="button" onClick={() => removeEducation(idx)} className="text-red-500 text-sm">Remove</button>
          </div>
        ))}
        <button type="button" onClick={addEducation} className="px-3 py-1 bg-blue-600 text-white rounded">Add Education</button>
      </div>

      {/* Experience */}
      <div>
        <h3 className="font-semibold mb-2">Experience</h3>
        {resumeData.experience.map((exp, idx) => (
          <div key={idx} className="mb-3 border p-2 rounded">
            <input type="text" name="company" placeholder="Company" value={exp.company} onChange={(e) => handleExperienceChange(idx, e)} className="w-full border rounded p-1 mb-1" />
            <input type="text" name="role" placeholder="Role" value={exp.role} onChange={(e) => handleExperienceChange(idx, e)} className="w-full border rounded p-1 mb-1" />
            <input type="text" name="year" placeholder="Year" value={exp.year} onChange={(e) => handleExperienceChange(idx, e)} className="w-full border rounded p-1 mb-1" />
            <button type="button" onClick={() => removeExperience(idx)} className="text-red-500 text-sm">Remove</button>
          </div>
        ))}
        <button type="button" onClick={addExperience} className="px-3 py-1 bg-blue-600 text-white rounded">Add Experience</button>
      </div>

      {/* Projects */}
      <div>
        <h3 className="font-semibold mb-2">Projects</h3>
        {(resumeData.projects || []).map((proj, idx) => (
          <div key={idx} className="mb-3 border p-2 rounded">
            <input type="text" name="title" placeholder="Project Title" value={proj.title} onChange={(e) => handleProjectChange(idx, e)} className="w-full border rounded p-1 mb-1" />
            <textarea name="description" placeholder="Project Description" value={proj.description} onChange={(e) => handleProjectChange(idx, e)} className="w-full border rounded p-1 mb-1" rows={2} />
            <input type="text" name="link" placeholder="Project Link / Demo" value={proj.link} onChange={(e) => handleProjectChange(idx, e)} className="w-full border rounded p-1 mb-1" />
            <button type="button" onClick={() => removeProject(idx)} className="text-red-500 text-sm">Remove</button>
          </div>
        ))}
        <button type="button" onClick={addProject} className="px-3 py-1 bg-blue-600 text-white rounded">Add Project</button>
      </div>

      {/* Certifications */}
      <div>
        <h3 className="font-semibold mb-2">Certifications</h3>
        {(resumeData.certifications || []).map((cert, idx) => (
          <div key={idx} className="mb-3 border p-2 rounded">
            <input type="text" name="name" placeholder="Certification Name" value={cert.name} onChange={(e) => handleCertificationChange(idx, e)} className="w-full border rounded p-1 mb-1" />
            <input type="text" name="org" placeholder="Issuing Organization" value={cert.org} onChange={(e) => handleCertificationChange(idx, e)} className="w-full border rounded p-1 mb-1" />
            <input type="text" name="link" placeholder="Certification Link" value={cert.link} onChange={(e) => handleCertificationChange(idx, e)} className="w-full border rounded p-1 mb-1" />
            <button type="button" onClick={() => removeCertification(idx)} className="text-red-500 text-sm">Remove</button>
          </div>
        ))}
        <button type="button" onClick={addCertification} className="px-3 py-1 bg-blue-600 text-white rounded">Add Certification</button>
      </div>

      {/* Skills */}
      <div>
        <h3 className="font-semibold mb-2">Skills (comma separated)</h3>
        <input type="text" value={(resumeData.skills || []).join(", ")} onChange={handleSkillsChange} placeholder="e.g., JavaScript, React, SQL" className="w-full border rounded p-2" />
      </div>
    </div>
  );
};

export default ResumeForm;
