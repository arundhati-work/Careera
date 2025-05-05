import React, { useState, useEffect } from "react";
import axios from "./api/axios";
import "./CSS/JobForm.css";

const JobForm = ({ onJobCreated, closeForm, editingJob }) => {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [payRange, setPayRange] = useState("");
  const [description, setDescription] = useState("");
  const [applicationDate, setApplicationDate] = useState(new Date().toISOString().split("T")[0]);
  const [status, setStatus] = useState("Applied");
  const [resume, setResume] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  useEffect(() => {
    if (editingJob) {
      setCompany(editingJob.companyName || "");
      setRole(editingJob.role || "");
      setLocation(editingJob.location || "");
      setPayRange(editingJob.payRange || "");
      setDescription(editingJob.description || "");
      setApplicationDate(new Date(editingJob.applicationDate).toISOString().split("T")[0]);
      setStatus(editingJob.status || "Applied");
      setResume(editingJob.resume || "");
      setCoverLetter(editingJob.coverLetter || "");
    }

    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [editingJob]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const jobData = {
      companyName: company,
      role,
      location,
      payRange,
      description,
      applicationDate,
      status,
      resume,
      coverLetter
    };

    const request = editingJob
      ? axios.patch(`/jobs/${editingJob._id}`, jobData)
      : axios.post("/jobs", jobData);

    request
      .then(() => {
        // Reset form
        setCompany("");
        setRole("");
        setLocation("");
        setPayRange("");
        setDescription("");
        setApplicationDate(new Date().toISOString().split("T")[0]);
        setStatus("Applied");
        setResume("");
        setCoverLetter("");
        onJobCreated();
        closeForm();
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="job-form-modal">
      <div className="job-form-container">
        <h1 className="job-form-heading">{editingJob ? "Edit Job" : "Add Job"}</h1>
        <button className="job-form-close" onClick={closeForm}>❌</button>
        <form onSubmit={handleSubmit}>
          <input className="job-form-input" type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company Name" />
          <input className="job-form-input" type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" />
          <input className="job-form-input" type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
          <input className="job-form-input" type="text" value={payRange} onChange={(e) => setPayRange(e.target.value)} placeholder="Average Pay Range" />
          <textarea className="job-form-textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Job Description" />
          <input className="job-form-input" type="date" value={applicationDate} onChange={(e) => setApplicationDate(e.target.value)} />
          <select className="job-form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Applied">Applied</option>
            <option value="Under consideration">Under Consideration</option>
            <option value="Interview">Interview</option>
            <option value="Stale">Stale</option>
            <option value="Rejected">Rejected</option>
          </select>
          <textarea className="job-form-textarea" value={resume} onChange={(e) => setResume(e.target.value)} placeholder="Paste Resume Content" />
          <textarea className="job-form-textarea" value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} placeholder="Paste Cover Letter Content" />
          <button className="job-form-submit" type="submit">{editingJob ? "Update Job" : "Add Job"}</button>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
