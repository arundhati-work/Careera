import React, {useState, useEffect} from 'react';
import axios from './api/axios';
import JobForm from './JobForm';

const Dashhboard = () => {
    const [jobs, setJobs] = useState([]);
    const [showForm, setShowForm] = useState(false);
  
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
  
  
    return (
      <div className="App">
        <div>
          <h1>Job Application Tracker</h1>
          <button onClick={() => setShowForm(true)}>Add Job</button>
        </div>
        {showForm && <JobForm onJobCreated={onJobCreated} closeForm={() => setShowForm(false)}/>}
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Status</th>
              <th>Application Date</th>
            </tr>
          </thead>
          <tbody>
          {
            jobs.map(job => {
              return <tr key={job._id}>
                <td>{job.companyName}</td>
                <td>{job.role}</td>
                <td>{job.status}</td>
                <td>{new Date(job.applicationDate).toLocaleDateString()}</td>
              </tr>
            })
          }
          </tbody>
        </table>
        
      </div>
    );
}

export default Dashhboard;