import React, { useState, useEffect } from 'react';
import axios from './api/axios';
import JobForm from './JobForm';
import { useNavigate, Link } from 'react-router-dom';
import './CSS/Dashboard.css';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/jobs")
      .then(res => setJobs(res.data.jobs))
      .catch(err => console.error(err));
  }, []);

  const onJobCreated = () => {
    axios.get("/jobs")
      .then(res => setJobs(res.data.jobs))
      .catch(err => console.error(err));
  };

  const handleDelete = (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      axios.delete(`/jobs/${jobId}`)
        .then(() => setJobs(jobs.filter(job => job._id !== jobId)))
        .catch(err => console.error("Delete failed", err));
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleStatusChange = (jobId, newStatus) => {
    axios.patch(`/jobs/${jobId}`, { status: newStatus })
      .then(() => {
        setJobs(prevJobs =>
          prevJobs.map(job =>
            job._id === jobId ? { ...job, status: newStatus } : job
          )
        );
      })
      .catch(err => console.error("Failed to update status:", err));
  };
  

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Job Application Tracker</h1>
        <div className="dashboard-buttons">
          <button className="btn logout" onClick={handleLogout}>Logout</button>
          <button className="btn add-job" onClick={() => setShowForm(true)}>+ Add Job</button>
        </div>
      </header>

      {showForm && (
        <JobForm
          onJobCreated={onJobCreated}
          closeForm={() => {
            setShowForm(false);
            setEditingJob(null);
          }}
          editingJob={editingJob}
        />
      )}

      <div className="table-container">
        <table className="jobs-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Location</th>
              <th>Average Pay</th>
              <th>Job Description</th>
              <th>Application Date</th>
              <th>Status</th>
              <th>Resume</th>
              <th>Cover Letter</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              jobs.map(job => (
                <tr key={job._id}>
                  <td>{job.companyName}</td>
                  <td>{job.role}</td>
                  <td>{job.location}</td>
                  <td>{job.payRange}</td>
                  <td>{job.description}</td>
                  <td>{new Date(job.applicationDate).toLocaleDateString()}</td>
                  <td>
                    <select
                      value={job.status}
                      onChange={(e) => handleStatusChange(job._id, e.target.value)}
                    >
                      <option value="Applied">Applied</option>
                      <option value="Under consideration">Under Consideration</option>
                      <option value="Interview">Interview</option>
                      <option value="Stale">Stale</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td>
                    {job.resume ?
                      <Link className="link" to={`/resume/${job._id}`}>View Resume</Link> :
                      <span className="no-link">No resume</span>}
                  </td>
                  <td>
                    {job.coverLetter ?
                      <Link className="link" to={`/coverletter/${job._id}`}>View Cover Letter</Link> :
                      <span className="no-link">No cover letter</span>}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-btn" onClick={() => {setEditingJob(job); setShowForm(true)}}>✏️</button>
                      <button className="delete-btn" onClick={() => handleDelete(job._id)}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
