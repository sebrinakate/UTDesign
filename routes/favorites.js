const studentModel = require("../models/student");
const tutorModel = require("../models/tutor");

const express = require("express");
const path = require("path");

// Creating express router  
const router = express.Router();

// ---------- get favorites ----------
router.get("/", async (req, res) => {
    //const studentID = req.session.studentID;

    // find student
    const student = await studentModel.findById("64024d793a406ec318e03661");

    // find tutors in favorites
    const tutors = await tutorModel.find({
        _id: {
            $in: Object.keys(student.favorites).map((id) => ObjectID(id)),
        },
    });

    res.send(tutors);
    // render favorites page
    //res.render("favorites", {
    //    title: "Favorites",
    //    tutors,
    //});
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