const mongoose = require("mongoose");

const userProfileSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    name: String,
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    github: String,
    portfolio: String,
    summary: String,
    education: [
        {
            degree: String,
            school: String,
            duration: String,
            relevantCourses: String
        }
    ],
    experience: [
        {
            company: String,
            location: String,
            role: String,
            duration: String,
            details: [String]
        }
    ],
    projects: [
        {
            title: String,
            link: String,
            details: [String]
        }
    ],
    skills: [
        {
            category: String,
            techStack: [String]
        }
    ]
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);
module.exports = UserProfile;