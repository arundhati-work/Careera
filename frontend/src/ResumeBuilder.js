import React, { useState, useEffect } from "react";
import axios from "./api/axios";
import "./CSS/ResumeBuilder.css";
import jsPDF from "jspdf";

const ResumeBuilder = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get("/profile").then((res) => {
      if (res.data.userProfile) {
        setProfile(res.data.userProfile);
      }
    });
  }, []);

  const updateField = (section, index, field, value) => {
    const updated = { ...profile };
    updated[section][index][field] = value;
    setProfile(updated);
  };

  const updateArray = (section, index, arrayName, arrayIndex, value) => {
    const updated = { ...profile };
    updated[section][index][arrayName][arrayIndex] = value;
    setProfile(updated);
  };

  const addItem = (section, newItem) => {
    setProfile({ ...profile, [section]: [...profile[section], newItem] });
  };

  const removeItem = (section, index) => {
    const updated = [...profile[section]];
    updated.splice(index, 1);
    setProfile({ ...profile, [section]: updated });
  };

  const handleSave = () => {
    axios.post("/profile", profile)
      .then(() => alert("Resume saved to profile"))
      .catch(() => alert("Failed to save"));
  };

  const handleExport = () => {
    const doc = new jsPDF();
    let y = 10;
    doc.setFontSize(12);
    doc.text(profile.name || "", 10, y); y += 10;
    doc.text(profile.email || "", 10, y); y += 10;
    doc.text(profile.phone || "", 10, y); y += 10;
    doc.text(profile.location || "", 10, y); y += 10;
    doc.text("LinkedIn: " + profile.linkedin, 10, y); y += 10;
    doc.text("GitHub: " + profile.github, 10, y); y += 10;
    doc.text("Portfolio: " + profile.portfolio, 10, y); y += 10;
    doc.text("Summary:", 10, y); y += 10;
    doc.text(profile.summary || "", 10, y); y += 10;
    doc.save("resume.pdf");
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="resume-builder">
      <div className="resume-form">
        <h2>Resume Editor</h2>

        <label>Summary</label>
        <textarea
          value={profile.summary}
          onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
        />

        <h3>Education</h3>
        {profile.education.map((edu, idx) => (
          <div key={idx}>
            <input placeholder="Degree" value={edu.degree} onChange={(e) => updateField("education", idx, "degree", e.target.value)} />
            <input placeholder="School" value={edu.school} onChange={(e) => updateField("education", idx, "school", e.target.value)} />
            <input placeholder="Duration" value={edu.duration} onChange={(e) => updateField("education", idx, "duration", e.target.value)} />
            <input
            placeholder="Relevant Courses"
            value={edu.relevantCourses}
            onChange={(e) =>
                updateField("education", idx, "relevantCourses", e.target.value)
            }
            />

            <button onClick={() => removeItem("education", idx)}>Remove</button>
          </div>
        ))}
        <button onClick={() => addItem("education", { degree: "", school: "", duration: "", relevantCourses: "" })}>+ Add Education</button>

        <h3>Experience</h3>
        {profile.experience.map((exp, idx) => (
          <div key={idx}>
            <input placeholder="Company" value={exp.company} onChange={(e) => updateField("experience", idx, "company", e.target.value)} />
            <input placeholder="Location" value={exp.location} onChange={(e) => updateField("experience", idx, "location", e.target.value)} />
            <input placeholder="Role" value={exp.role} onChange={(e) => updateField("experience", idx, "role", e.target.value)} />
            <input placeholder="Duration" value={exp.duration} onChange={(e) => updateField("experience", idx, "duration", e.target.value)} />
            {exp.details.map((detail, dIdx) => (
              <input key={dIdx} value={detail} onChange={(e) => updateArray("experience", idx, "details", dIdx, e.target.value)} />
            ))}
            <button onClick={() => updateField("experience", idx, "details", [...exp.details, ""])}>+ Add Detail</button>
            <button onClick={() => removeItem("experience", idx)}>Remove</button>
          </div>
        ))}
        <button onClick={() => addItem("experience", { company: "", location: "", role: "", duration: "", details: [""] })}>+ Add Experience</button>

        <h3>Skills</h3>
        {profile.skills.map((skill, idx) => (
          <div key={idx}>
            <input placeholder="Category" value={skill.category} onChange={(e) => updateField("skills", idx, "category", e.target.value)} />
            {skill.techStack.map((tech, tIdx) => (
              <input key={tIdx} value={tech} onChange={(e) => updateArray("skills", idx, "techStack", tIdx, e.target.value)} />
            ))}
            <button onClick={() => updateField("skills", idx, "techStack", [...skill.techStack, ""])}>+ Add Tech</button>
            <button onClick={() => removeItem("skills", idx)}>Remove</button>
          </div>
        ))}
        <button onClick={() => addItem("skills", { category: "", techStack: [""] })}>+ Add Skill Category</button>

        <div className="resume-actions">
          <button onClick={handleSave}>Save to Profile</button>
          <button onClick={handleExport}>Export to PDF</button>
        </div>
      </div>

      <div className="resume-preview">
        <h1>{profile.name}</h1>
        <p>{profile.phone} | {profile.email} | {profile.location}</p>
        <p>{profile.linkedin} | {profile.github} | {profile.portfolio}</p>

        <h2>Summary</h2>
        <p>{profile.summary}</p>

        <h2>Education</h2>
        {profile.education.map((edu, idx) => (
          <div key={idx}>
            <p><strong>{edu.degree}</strong>, {edu.school} ({edu.duration})</p>
            {edu.relevantCourses?.trim() && (
            <p><em>Courses:</em> {edu.relevantCourses}</p>
            )}
          </div>
        ))}

        <h2>Experience</h2>
        {profile.experience.map((exp, idx) => (
          <div key={idx}>
            <p><strong>{exp.role}</strong>, {exp.company} - {exp.location} ({exp.duration})</p>
            <ul>
              {exp.details.map((detail, dIdx) => <li key={dIdx}>{detail}</li>)}
            </ul>
          </div>
        ))}

        <h2>Skills</h2>
        {profile.skills.map((skill, idx) => (
          <div key={idx}>
            <p><strong>{skill.category}:</strong> {skill.techStack.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeBuilder;