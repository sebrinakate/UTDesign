const studentModel = require("../models/student");
const tutorModel = require("../models/tutor");

const express = require("express");
const path = require("path");

// Creating express router  
const router = express.Router();

// ---------- get favorites ----------
router.get("/", async (req, res) => {
    const studentID = req.session.studentID;
    //const studentID = "64079e1948dede36ae877bfe";

    // find student's favorite tutors
    try{
        //const favTutors = await studentModel.findById(studentID).select("favoriteTutors");
        // this returns student id and favoriteTutors
        const favTutors = await studentModel.find({loggedIn: true}).select("favoriteTutors");
        res.send(favTutors);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

// ---------- put favorites ----------
router.put("/", async (req, res) => {
    const studentID = req.session.studentID;
    const tutorID = req.body.tutorID;

    const student = await studentModel.findOne(ObjectID(studentID));
    const tutor = await tutorModel.findOne(ObjectID(tutorID));

    // if tutor is already in favorites, remove it
    if (student.favorites[tutorID]) {
        delete student.favorites[tutorID];
    } else {
        // else add tutor to favorites
        student.favorites[tutorID] = tutor;
    }

    // update student favorites
    await studentModel.updateOne(
        // find student
        { _id: ObjectID(studentID) },
        // set favorites to student favorites
        { $set: { favorites: student.favorites } }
    );

    // redirect to favorites
    res.redirect("/");
});

// ---------- delete favorites ----------
router.delete("/", async (req, res) => {
    const studentID = req.session.studentID;
    const tutorID = req.body.tutorID;

    // find student
    const student = await studentModel.findOne(ObjectID(studentID));

    // delete tutor from favorites
    delete student.favorites[tutorID];

    // update student favorites
    await studentModel.updateOne(
        // find student
        { _id: ObjectID(studentID) },
        // set favorites to student favorites
        { $set: { favorites: student.favorites } }
    );

    // redirect to favorites
    res.redirect("/");
});

// Exporting router
module.exports = router;