const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/job");
const profileRoutes = require("./routes/userProfile");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/auth",authRoutes);
app.use("/jobs", jobRoutes);
app.use("/profile", profileRoutes);

mongoose.connect("mongodb://localhost:27018/careera", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}). then(() => {
    console.log("MongoDB connected")
})
.catch(err => console.error(err));

app.listen(8080, () => {
    console.log("App listening on PORT 8080");
})