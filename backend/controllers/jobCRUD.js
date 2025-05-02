const Job = require("../models/Job");

const getAllJobs = async (req, res) => {   
    try{
        const jobs = await Job.find({userId: req.user.id}).sort({applicationDate: -1});
        res.status(200).json({
            jobs
        });
    }
    catch(err) {
        res.status(500).json({message: "Server error"});
    }
}

const createJob = async (req, res) =>{
    const {companyName, role, location, payRange, description, applicationDate, status, resume, coverLetter} = req.body;
    try{
        const newJob = new Job({
            companyName,
            role,
            location,
            payRange,
            description,
            applicationDate,
            status,
            resume,
            coverLetter,
            userId: req.user.id
        });
        await newJob.save();
        res.status(201).json({message: "New Job created", job: newJob});
    } catch(err){
        res.status(500).json({message: "Server Error"});
    }
}

module.exports = {
    getAllJobs,
    createJob
};