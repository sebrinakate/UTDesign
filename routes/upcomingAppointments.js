const express = require("express");
const path = require("path");
const studentModel = require("../models/student");
const tutorModel = require("../models/tutor");

// Creating express router  
const router = express.Router();

// get upcomingAppts for student (possibly join with tutor using same objectID?)
router.get("/get-tutor-upcomingAppts", async (req, res) => {
    // Finding user document in database with email of logged in account
    // retrieve the upcoming appointments
    try {
        const upcomingAppts = await studentModel.find({loggedIn: true}).select("upcomingAppts");
        //const upcomingAppts = await studentModel.find({'name.firstName': 'Rina'}).select("favoriteTutors");
        res.send(upcomingAppts);
        //console.log(upcomingAppts);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
});

// get upcomingAppts for tutor
router.get("/get-student-upcomingAppts", async (req, res) => {
    // Finding user document in database with email of logged in account
    // retrieve the upcoming appointments
    try {
        const upcomingAppts = await tutorModel.find({loggedIn: true}).select("upcomingAppts");
        //const upcomingAppts = await tutorModel.find({'name.firstName': 'Cynthia'}).select("upcomingAppts");
        res.send(upcomingAppts);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Exporting router
module.exports = router;
