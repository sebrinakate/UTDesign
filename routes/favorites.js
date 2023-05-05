const studentModel = require("../models/student");
const tutorModel = require("../models/tutor");

const express = require("express");
const path = require("path");

const mongoose = require("mongoose");

// Creating express router  
const router = express.Router();

// ---------- get favorites ----------
router.get("/:id", async (req, res) => {
    const studentID = req.params.id;
    //const studentID = req.session.studentID;
    //const studentID = "64079e1948dede36ae877bfe";

    // find student's favorite tutors
    try{
        const favTutors = await studentModel.findById(studentID).select("favoriteTutors");
        res.send(favTutors);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

// ---------- put favorites ----------
router.put("/:studentID/:tutorID", async (req, res) => {
    //const studentID = req.session.studentID;
    const studentID = req.params.studentID;
    const tutorID = req.params.tutorID;
    //const student = await studentModel.find({loggedIn: true});
    const tutor = await tutorModel.findById(tutorID);

    // testing
    //const studentID = "64079e1948dede36ae877bfe";
    //const tutorID = "6435ba187c0414d71edd8e62";
    //const student = await studentModel.findById(studentID);
    //const tutor = await tutorModel.findById(tutorID);

    //res.send(tutor_name)
    //res.send(objTutor)

    try{
        // update student favorites
        const favTutors = await studentModel.findOneAndUpdate(
            { _id: studentID },
            // add tutor to student favorites
            { $addToSet: { favoriteTutors: tutor._id} },
            { upsert: true, multi: false, new: true}
        );
        
        res.send(favTutors);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});


// ---------- delete favorites ----------
router.delete("/:studentID/:tutorID", async (req, res) => {
    const studentID = req.params.studentID;
    const tutorID = req.params.tutorID;
    const tutor = await tutorModel.findById(tutorID);

    // testing
    //const studentID = "64079e1948dede36ae877bfe";
    //const tutorID = "6435ba187c0414d71edd8e62";
    //const tutor = await tutorModel.findById(tutorID);

    try{ 

        // update student favorites
        const removeFavTutor = await studentModel.findOneAndUpdate(
            { _id: studentID },
            // remove tutor to student favorites
            { $pull: { favoriteTutors: tutor._id } },
            { safe: true, multi: false, upsert: true}
        );

        res.send(removeFavTutor);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});


// Exporting router
module.exports = router;