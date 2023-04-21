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
    //const student = await studentModel.find({loggedIn: true});
    const tutor = await tutorModel.findbyId(tutorID);

    // testing
    //const studentID = "64079e1948dede36ae877bfe";
    //const tutorID = "6435ba187c0414d71edd8e62";
    //const student = await studentModel.findById(studentID);
    //const tutor = await tutorModel.findById(tutorID);

    const tutor_name = tutor.name.firstName + " " + tutor.name.lastName;
    var objTutor = {tutorID: tutorID, tutorName: tutor_name};

    //res.send(tutor_name)
    //res.send(objTutor)

    try{
        
        // update student favorites
        const favTutors = await studentModel.findOneAndUpdate(
            { _id: studentID },
            // add tutor to student favorites
            { $addToSet: { favoriteTutors: objTutor} },
            {upsert: true, multi: false, new: true}
        );
        
        res.send(favTutors)

    }
    catch(err){
        res.status(500).json({message: err.message});
    }

    // redirect to favorites
    res.redirect("/");
});


// ---------- delete favorites ----------
router.delete("/", async (req, res) => {
    //const studentID = req.session.studentID;
    //const tutorID = req.body.tutorID;

    // testing
    const studentID = "64079e1948dede36ae877bfe";
    const tutorID = "6435ba187c0414d71edd8e62";
    const student = await studentModel.findById(studentID);
    const tutor = await tutorModel.findById(tutorID).select("name");

    const tutor_name = tutor.name.firstName + " " + tutor.name.lastName;
    objTutor = {tutorID: tutorID, tutorName: tutor_name};
    try{ 

        // update student favorites
        await studentModel.findOneAndUpdate(
            // find student
            { id: studentID },
            // remove tutor to student favorites
            { $pull: { favoriteTutors: objTutor } },
            {safe: true, multi: false}
        );
        return res.status(200).json({message: "Tutor removed from favorites"});

    }
    catch(err){
        res.status(500).json({message: err.message})
    }


    // redirect to favorites
    res.redirect("/");
});


// Exporting router
module.exports = router;
