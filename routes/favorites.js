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
router.get("/peaches", async (req, res) => {
    //const studentID = req.session.studentID;
    //const tutorID = req.body.tutorID;
    //const student = await studentModel.find({loggedIn: true});
    //const tutor = await tutorModel.findbyId(tutorID);

    // testing
    const studentID = "64079e1948dede36ae877bfe";
    const tutorID = "643efe14eea3bf3880f15a21";
    const student = await studentModel.findById(studentID);
    const tutor = await tutorModel.findById(tutorID).select("name");

    const tutor_name = tutor.name.firstName + " " + tutor.name.lastName;
    //const tutor_name = JSON.stringify(tutor.name);
    var objTutor = {tutorID: tutorID, tutorName: tutor_name};

    //const tst = student.favoriteTutors.includes(objTutor);
    //res.send(tst)
    //res.send(objTutor)

    try{
        /*
        // if tutor is already in favorites, remove it
        if (student.favoriteTutors.includes(tutorID)) {
            
            //delete student.favoriteTutors[tutorID];
            //student.favoriteTutors.pull(tutor);

            const favTutors = await studentModel.findOneAndUpdate(
                { _id: studentID },
                // remove tutor to student favorites
                { $pull: { favoriteTutors: objTutor } },
            );
            
            res.send(favTutors)
        }   
        // else add tutor to favorites
        else {
            
            //student.favoriteTutors[tutorID] = tutor;
            //student.favoriteTutors.push(tutor);

            // update student favorites
            const favTutors = await studentModel.findOneAndUpdate(
                { _id: studentID },
                // add tutor to student favorites
                { $addToSet: { favoriteTutors: objTutor} },
            );
            
            res.send(favTutors)
        }
        */

        // update student favorites
        const favTutors = await studentModel.findOneAndUpdate(
            { _id: studentID },
            // add tutor to student favorites
            { $addToSet: { favoriteTutors: objTutor} },
        );
        
        res.send(favTutors)
        

    }
    catch(err){
        res.status(500).json({message: err.message});
    }

    // redirect to favorites
    res.redirect("/");
});

/*
// ---------- delete favorites ----------
router.delete("/", async (req, res) => {
    const studentID = req.session.studentID;
    const tutorID = req.body.tutorID;

    try{

        // find student
        const student = await studentModel.findById(studentID);

        // delete tutor from favorites
        delete student.favoriteTutors[tutorID];

        // update student favorites
        await studentModel.findOneAndUpdate(
            // find student
            { id: studentID },
            // set favorites to student favorites
            { $set: { favoriteTutors: tutor } }
        );

    }
    catch(err){
        res.status(500).json({message: err.message})
    }


    // redirect to favorites
    res.redirect("/");
});
*/

// Exporting router
module.exports = router;
