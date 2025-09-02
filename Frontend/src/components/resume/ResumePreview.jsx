// src/components/resume/ResumePreview.jsx
import React from "react";

const ResumePreview = ({ resumeData }) => {
  const { personal, education, experience, projects, certifications, skills } = resumeData;

  return (
    <div className="max-w-3xl mx-auto border border-gray-300 p-8 rounded-lg bg-white shadow-lg text-gray-900">
      {/* ===== Header ===== */}
      <div className="text-center mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold">{personal.name || "Your Name"}</h1>
        <p className="text-gray-700 text-sm">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span> | {personal.phone}</span>}
          {personal.address && <span> | {personal.address}</span>}
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm mt-2">
          {personal.linkedin && (
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              LinkedIn
            </a>
          )}
          {personal.github && (
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              GitHub
            </a>
          )}
          {personal.portfolio && (
            <a
              href={personal.portfolio}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              Portfolio
            </a>
          )}
        </div>
        {personal.summary && (
          <p className="mt-3 text-gray-700 text-sm italic">{personal.summary}</p>
        )}
      </div>

      {/* ===== Education ===== */}
      <Section title="Education">
        {education.length === 0 ? (
          <Empty text="No education added" />
        ) : (
          education.map((edu, idx) => (
            <div key={idx} className="mb-3">
              <p className="font-semibold">{edu.school}</p>
              <p className="text-sm text-gray-600">
                {edu.degree} {edu.field && `in ${edu.field}`} | {edu.year}
              </p>
            </div>
          ))
        )}
      </Section>

      {/* ===== Experience ===== */}
      <Section title="Experience">
        {experience.length === 0 ? (
          <Empty text="No experience added" />
        ) : (
          experience.map((exp, idx) => (
            <div key={idx} className="mb-3">
              <p className="font-semibold">
                {exp.role} at {exp.company}
              </p>
              <p className="text-sm text-gray-600">{exp.year}</p>
              {exp.description && (
                <p className="text-sm text-gray-700">{exp.description}</p>
              )}
            </div>
          ))
        )}
      </Section>

      {/* ===== Projects ===== */}
      {projects?.length > 0 && (
        <Section title="Projects">
          {projects.map((proj, idx) => (
            <div key={idx} className="mb-3">
              <p className="font-semibold">{proj.title}</p>
              <p className="text-sm text-gray-700">{proj.description}</p>
              {proj.link && (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 text-sm hover:underline"
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* ===== Certifications ===== */}
      {certifications?.length > 0 && (
        <Section title="Certifications">
          {certifications.map((cert, idx) => (
            <div key={idx} className="mb-3">
              <p className="font-semibold">{cert.name}</p>
              <p className="text-sm text-gray-600">{cert.org}</p>
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 text-sm hover:underline"
                >
                  View Certificate
                </a>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* ===== Skills ===== */}
      <Section title="Skills">
        {skills.length === 0 ? (
          <Empty text="No skills added" />
        ) : (
          <ul className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <li
                key={idx}
                className="px-3 py-1 bg-gray-100 rounded-md text-sm border"
              >
                {skill}
              </li>
            ))}
          </ul>
        )}
      </Section>
    </div>
  );
};

// 📌 Small reusable Section wrapper
const Section = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="text-lg font-bold border-b pb-1 mb-3">{title}</h2>
    {children}
  </div>
);

// 📌 Placeholder if empty
const Empty = ({ text }) => <p className="text-gray-500 text-sm">{text}</p>;

export default ResumePreview;
