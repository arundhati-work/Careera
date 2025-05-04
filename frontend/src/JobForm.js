import React, {useState} from "react";
import axios from "./api/axios";

const JobForm = ({onJobCreated, closeForm}) => {

    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [applicationDate, setApplicationDate] = useState(new Date().toISOString().split("T")[0]);
    const [status, setStatus] = useState("Applied");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newJob = {
            companyName: company,
            role: role,
            applicationDate: applicationDate,
            status: status
        }
        axios.post("/jobs", newJob)
        .then(res => console.log(res))
        .then(() => {
            setCompany("");
            setRole("");
            setApplicationDate(new Date().toISOString().split("T")[0]);
            setStatus("Applied");
            onJobCreated();
        })
        .catch(err => console.error(err));
    }

    return (
        <div>
            <div>
                <h1> Add Job </h1>
                <button onClick={closeForm}>❌</button>
            </div>
            
            <form onSubmit={handleSubmit}>
                <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name"/>
                <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role"/>
                <input type="date" value={applicationDate} onChange={(e) => setApplicationDate(e.target.value)} placeholder="Application Date"/>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Applied">Applied</option>
                    <option value="Under consideration">Under Consideration</option>
                    <option value="Interview">Interview</option>
                    <option value="Stale">Stale</option>
                    <option value="Rejected">Rejected</option>
                </select>
                <input type="submit" value="Add Job"/>
            </form>
        </div>
    )
};

export default JobForm;