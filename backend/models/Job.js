const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    companyName: {type: String, required: true},
    role: {type: String, required: true},
    location: {type: String},
    payRange: {type: String},
    description: {type: String},
    applicationDate: {type: Date},
    status: {type: String, enum: ["Applied", "Under consideration", "Interview", "Stale", "Rejected"]},
    resume: {type: String},
    coverLetter: {type: String},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;