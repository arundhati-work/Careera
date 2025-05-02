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

const getJobById = async (req, res) => {
    const {jobId} = req.params;
    try{
        const job = await Job.findOne({_id: jobId, userId: req.user.id});
        if (!job){
            return res.status(404).json({message: "Job not found"});
        }
        res.status(200).json({
            job
        });
    }
    catch(err){
        res.status(500).json({message: "Server error"});
    }
}

const updateJobById = async (req, res) => {
    const {jobId} = req.params;
    try{
        const existingJob = await Job.findOneAndUpdate(
            {_id: jobId, userId: req.user.id},
            { $set: req.body },
            {new : true}
         );
        if (!existingJob){
            return res.status(404).json({message: "Job not found"});
        }
        res.status(200).json({message: "Job updated"});
    }
    catch(err){
        res.status(500).json({message: "Server error"});
    }
}

const deleteJob = async (req, res) => {
    const {jobId} = req.params;
    try{
        const existingJob = await Job.findOneAndDelete({_id: jobId, userId: req.user.id});
        if (!existingJob){
            return res.status(404).json({message: "job not found"});
        }
        res.status(200).json({message: "Job deleted"});
    }
    catch(err){
        res.status(500).json({message: "Server error"});
    }
}

const deleteRejectedJobs = async (req, res) => {
    try{
        const rejectedJobs = await Job.deleteMany({userId: req.user.id, status: "Rejected"});
        const count = rejectedJobs.deletedCount;
        res.status(200).json({message: `Deleted ${count} jobs.`});
    } catch (err){
        res.status(500).json({message: "Server error"});
    }
}
 

module.exports = {
    getAllJobs,
    createJob,
    getJobById,
    updateJobById,
    deleteJob,
    deleteRejectedJobs
};