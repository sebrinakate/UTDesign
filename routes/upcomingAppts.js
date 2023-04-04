const express = require("express");
const path = require("path");

// Creating express router  
const router = express.Router();

// Handling request to /home to route to index.html
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Exporting router
module.exports = router;

// Handling upcomingAppts for student
router.get("/upcomingAppts", async (req, res) => {
    const email = req.body.email;

    // Finding user document in database with email of logged in account
    // retrieve the upcoming appointments
    try {
        const upcomingAppts = await studentModel.find({email: email}).select("upcomingAppts");
        res.send(upcomingAppts);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
    // Redirecting to home page
    res.redirect("/");
});

// Handling upcomingAppts for tutor
router.get("/upcomingAppts", async (req, res) => {
    const email = req.body.email;

    // Finding user document in database with email of logged in account
    // retrieve the upcoming appointments
    try {
        const upcomingAppts = await tutorModel.find({email: email}).select("upcomingAppts");
        res.send(upcomingAppts);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
    // Redirecting to home page
    res.redirect("/");
});