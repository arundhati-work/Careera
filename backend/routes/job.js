const express = require("express");
const { getAllJobs, createJob, getJobById, updateJobById, deleteJob, deleteRejectedJobs } = require("../controllers/job");
const router = express.Router();

router.get("/", getAllJobs);
router.post("/", createJob);
router.get("/:jobId", getJobById);
router.patch("/:jobId", updateJobById);
router.delete("/:jobId", deleteJob);
router.delete("/rejected", deleteRejectedJobs);

module.exports = router;