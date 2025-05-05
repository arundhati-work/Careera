const UserProfile = require("../models/UserProfile");

const getProfile = async (req, res) => {
    try {
        let existingProfile = await UserProfile.findOne({ userId: req.user.id });

        if (!existingProfile) {
            existingProfile = new UserProfile({ userId: req.user.id });
            await existingProfile.save();
        }

        res.status(200).json({ userProfile: existingProfile });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};


const createOrUpdateProfile = async (req, res) => {
    try{
        const existingUser = await UserProfile.findOneAndUpdate({userId: req.user.id}, req.body, {new: true});

        if (!existingUser){
            const newProfile = new UserProfile({...req.body, userId: req.user.id});
            await newProfile.save();
            return res.status(201).json({message: "New Profile created"});
        }

        res.status(200).json({message: "User Profile updated"});
    } catch(err){
        res.status(500).json({message: "Server Error"});
    }
    
}

module.exports = {
    getProfile,
    createOrUpdateProfile
};