const express = require("express");
const { getAllJobs, createJob, getJobById, updateJobById, deleteJob, deleteRejectedJobs } = require("../controllers/job");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

router.use(authMiddleware);
router.get("/", getAllJobs);
router.post("/", createJob);
router.get("/:jobId", getJobById);
router.patch("/:jobId", updateJobById);
router.delete("/rejected", deleteRejectedJobs);
router.delete("/:jobId", deleteJob);

module.exports = router;