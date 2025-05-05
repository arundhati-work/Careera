import React, { useState, useEffect } from "react";
import axios from "./api/axios";
import { Link } from "react-router-dom";
import "./CSS/UserProfile.css";

const UserProfile = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [summary, setSummary] = useState("");
  const [education, setEducation] = useState([{ degree: "", school: "", duration: "", relevantCourses: [] }]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);

  const [visibleSections, setVisibleSections] = useState({
    personal: true,
    education: true,
    experience: true,
    projects: true,
    skills: true
  });

  useEffect(() => {
    axios.get("/profile")
      .then(res => {
        if (res.data.userProfile) {
          const profile = res.data.userProfile;
          setFullName(profile.name || "");
          setEmail(profile.email || "");
          setPhone(profile.phone || "");
          setLocation(profile.location || "");
          setLinkedin(profile.linkedin || "");
          setGithub(profile.github || "");
          setPortfolio(profile.portfolio || "");
          setSummary(profile.summary || "");
          setEducation(profile.education?.length ? profile.education : [{ degree: "", school: "", duration: "", relevantCourses: [] }]);
          setExperience(profile.experience || []);
          setProjects(profile.projects || []);
          setSkills(profile.skills || []);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const toggleSection = (section) => {
    setVisibleSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleEduChange = (index, field, value) => {
    const updated = [...education];
    updated[index][field] = value;
    setEducation(updated);
  };

  const handleAddEducation = () => {
    setEducation([...education, { degree: "", school: "", duration: "", relevantCourses: [] }]);
  };

  const handleRemoveEducation = (index) => {
    const updated = [...education];
    updated.splice(index, 1);
    setEducation(updated);
  };

  const handleAddExperience = () => {
    setExperience([...experience, { company: "", location: "", role: "", duration: "", details: [""] }]);
  };

  const handleExpChange = (index, field, value) => {
    const updated = [...experience];
    updated[index][field] = value;
    setExperience(updated);
  };

  const handleExpDetailsChange = (expIdx, detailIdx, value) => {
    const updated = [...experience];
    updated[expIdx].details[detailIdx] = value;
    setExperience(updated);
  };

  const handleAddExpDetail = (index) => {
    const updated = [...experience];
    updated[index].details.push("");
    setExperience(updated);
  };

  const removeExpDetail = (expIdx, detailIdx) => {
    const updated = [...experience];
    updated[expIdx].details.splice(detailIdx, 1);
    setExperience(updated);
  };

  const handleRemoveExperience = (index) => {
    const updated = [...experience];
    updated.splice(index, 1);
    setExperience(updated);
  };

  const handleAddProject = () => {
    setProjects([...projects, { title: "", link: "", details: [""] }]);
  };

  const handleProjectChange = (index, field, value) => {
    const updated = [...projects];
    updated[index][field] = value;
    setProjects(updated);
  };

  const handleProjectDetailsChange = (projIdx, detailIdx, value) => {
    const updated = [...projects];
    updated[projIdx].details[detailIdx] = value;
    setProjects(updated);
  };

  const handleAddProjectDetail = (projIdx) => {
    const updated = [...projects];
    updated[projIdx].details.push("");
    setProjects(updated);
  };

  const removeProjectDetail = (projIdx, detailIdx) => {
    const updated = [...projects];
    updated[projIdx].details.splice(detailIdx, 1);
    setProjects(updated);
  };

  const handleRemoveProject = (index) => {
    const updated = [...projects];
    updated.splice(index, 1);
    setProjects(updated);
  };

  const handleAddSkillCategory = () => {
    setSkills([...skills, { category: "", techStack: [""] }]);
  };

  const handleSkillChange = (index, field, value) => {
    const updated = [...skills];
    updated[index][field] = value;
    setSkills(updated);
  };

  const handleTechChange = (skillIdx, techIdx, value) => {
    const updated = [...skills];
    updated[skillIdx].techStack[techIdx] = value;
    setSkills(updated);
  };

  const handleAddTech = (skillIdx) => {
    const updated = [...skills];
    updated[skillIdx].techStack.push("");
    setSkills(updated);
  };

  const handleRemoveSkillCategory = (index) => {
    const updated = [...skills];
    updated.splice(index, 1);
    setSkills(updated);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const payload = {
      name: fullName,
      email,
      phone,
      location,
      linkedin,
      github,
      portfolio,
      summary,
      education,
      experience,
      projects,
      skills
    };

    axios.post("/profile", payload)
      .then(() => alert("Profile saved successfully"))
      .catch(err => {
        console.error("Failed to save profile:", err);
        alert("Error saving profile");
      });
  };

  return (
    <div className="user-profile">
      <div className="header-bar">
        <h1>User Profile</h1>
        <div className="header-actions">
          <Link to="/dashboard" className="back-link">← Back to Dashboard</Link>
          <button className="save-top-btn" onClick={handleSaveProfile}>Save Profile</button>
        </div>
      </div>

      <form onSubmit={handleSaveProfile}>
        {/* Personal Info */}
        <div className="section-block">
          <h2 className="section-header" onClick={() => toggleSection("personal")}>
            {visibleSections.personal ? "▾" : "▸"} Personal Information
          </h2>
          {visibleSections.personal && (
            <div className="two-col-grid">
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" />
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" />
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Current Location" />
              <input type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="LinkedIn Profile" />
              <input type="text" value={github} onChange={(e) => setGithub(e.target.value)} placeholder="GitHub Profile" />
              <input type="text" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} placeholder="Link to Portfolio" />
            </div>
          )}
        </div>

        {/* Summary */}
        <input type="text" value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Professional Summary" />

        {/* Education */}
        <div className="section-block">
          <h2 className="section-header" onClick={() => toggleSection("education")}>
            {visibleSections.education ? "▾" : "▸"} Education
          </h2>
          {visibleSections.education && (
            <div>
              {education.map((edu, idx) => (
                <div key={idx}>
                  <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => handleEduChange(idx, "degree", e.target.value)} />
                  <input type="text" placeholder="School" value={edu.school} onChange={(e) => handleEduChange(idx, "school", e.target.value)} />
                  <input type="text" placeholder="Duration" value={edu.duration} onChange={(e) => handleEduChange(idx, "duration", e.target.value)} />
                  <input type="text" placeholder="Relevant Courses (comma-separated)" value={edu.relevantCourses.join(", ")} onChange={(e) => handleEduChange(idx, "relevantCourses", e.target.value.split(",").map(c => c.trim()))} />
                  <button type="button" className="remove-btn" onClick={() => handleRemoveEducation(idx)}>🗑️</button>
                </div>
              ))}
              <button type="button" onClick={handleAddEducation}>+ Add Education</button>
            </div>
          )}
        </div>

        {/* Experience */}
        <div className="section-block">
          <h2 className="section-header" onClick={() => toggleSection("experience")}>
            {visibleSections.experience ? "▾" : "▸"} Experience
          </h2>
          {visibleSections.experience && (
            <div>
              {experience.map((exp, idx) => (
                <div key={idx}>
                  <input type="text" placeholder="Company" value={exp.company} onChange={e => handleExpChange(idx, "company", e.target.value)} />
                  <input type="text" placeholder="Location" value={exp.location} onChange={e => handleExpChange(idx, "location", e.target.value)} />
                  <input type="text" placeholder="Role" value={exp.role} onChange={e => handleExpChange(idx, "role", e.target.value)} />
                  <input type="text" placeholder="Duration" value={exp.duration} onChange={e => handleExpChange(idx, "duration", e.target.value)} />
                  <label>Details:</label>
                  {exp.details.map((detail, dIdx) => (
                    <input type="text" key={dIdx} value={detail} onChange={e => handleExpDetailsChange(idx, dIdx, e.target.value)} />
                  ))}
                  <button type="button" onClick={() => handleAddExpDetail(idx)}>+ Add Detail</button>
                  <button type="button" className="remove-btn" onClick={() => handleRemoveExperience(idx)}>🗑️</button>
                </div>
              ))}
              <button type="button" onClick={handleAddExperience}>+ Add Experience</button>
            </div>
          )}
        </div>

        {/* Projects */}
        <div className="section-block">
          <h2 className="section-header" onClick={() => toggleSection("projects")}>
            {visibleSections.projects ? "▾" : "▸"} Projects
          </h2>
          {visibleSections.projects && (
            <div>
              {projects.map((proj, idx) => (
                <div key={idx}>
                  <input type="text" placeholder="Project Title" value={proj.title} onChange={(e) => handleProjectChange(idx, "title", e.target.value)} />
                  <input type="text" placeholder="Project Link" value={proj.link} onChange={(e) => handleProjectChange(idx, "link", e.target.value)} />
                  <label>Details:</label>
                  {proj.details.map((detail, detailIdx) => (
                    <input type="text" key={detailIdx} value={detail} onChange={(e) => handleProjectDetailsChange(idx, detailIdx, e.target.value)} />
                  ))}
                  <button type="button" onClick={() => handleAddProjectDetail(idx)}>+ Add Detail</button>
                  <button type="button" className="remove-btn" onClick={() => handleRemoveProject(idx)}>🗑️</button>
                </div>
              ))}
              <button type="button" onClick={handleAddProject}>+ Add Project</button>
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="section-block">
          <h2 className="section-header" onClick={() => toggleSection("skills")}>
            {visibleSections.skills ? "▾" : "▸"} Skills
          </h2>
          {visibleSections.skills && (
            <div>
              {skills.map((skill, idx) => (
                <div key={idx}>
                  <input type="text" placeholder="Category (e.g., Frontend, Backend)" value={skill.category} onChange={(e) => handleSkillChange(idx, "category", e.target.value)} />
                  {skill.techStack.map((tech, techIdx) => (
                    <input key={techIdx} type="text" placeholder={`Tech ${techIdx + 1}`} value={tech} onChange={(e) => handleTechChange(idx, techIdx, e.target.value)} />
                  ))}
                  <button type="button" onClick={() => handleAddTech(idx)}>+ Add Tech</button>
                  <button type="button" className="remove-btn" onClick={() => handleRemoveSkillCategory(idx)}>🗑️</button>
                </div>
              ))}
              <button type="button" onClick={handleAddSkillCategory}>+ Add Skill Category</button>
            </div>
          )}
        </div>

        <button type="submit" className="save-btn">Save Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;
