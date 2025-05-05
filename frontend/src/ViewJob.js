import React, {useState, useEffect} from 'react';
import axios from './api/axios';
import {useNavigate, useParams} from 'react-router-dom';
import "./CSS/ViewJob.css";

const ViewJob = ({params}) => {
    const {id} = useParams;
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [location, setLocation] = useState("");
    const [payRange, setPayRange] = useState("");
    const [description, setDescription] = useState("");
    const [applicationDate, setApplicationDate] = useState(new Date().toISOString().split("T")[0]);
    const [status, setStatus] = useState("Applied");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/jobs/${id}`)
        .then(res => {
            const job = res.data.job;
            setCompany(job.company);
            setRole(job.role);
            setLocation(job.location);
            setPayRange(job.payRange);
            setDescription(job.description);
            setApplicationDate(job.applicationDate);
            setStatus(job.status);
        })
        .catch(err => {
            console.error(err);
        }) 
    }, []);

    return (
        <div className="view-job-container">
            <div className="view-job-header">
                <h1>Job Details</h1>
                <button className="back-link" onClick={() => navigate("/dashboard")}>
                    Back to Dashboard
                </button>
            </div>

            <div className="view-job-title">
                <h2>{company}</h2>
                <h3>{role}</h3>
            </div>

            <div className="view-job-info">
                <p><strong>Average Pay:</strong> {payRange}</p>
                <p><strong>Location:</strong> {location}</p>
                <p><strong>Applied on:</strong> {applicationDate}</p>
                <p><strong>Status:</strong> {status}</p>
            </div>

            <div className="view-job-description">
                <h3>Job Description</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default ViewJob;
