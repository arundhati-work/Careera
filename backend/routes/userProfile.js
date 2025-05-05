const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const {getProfile, createOrUpdateProfile} = require("../controllers/UserProfile");

router.use(authMiddleware);
router.get("/", getProfile);
router.post("/", createOrUpdateProfile);

module.exports = router;