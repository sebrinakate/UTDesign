const express = require("express");
const path = require("path");

// Creating express router  
const router = express.Router();

// ---------- get favorites ----------
router.get("/favorites", async (req, res) => {
    const studentID = req.session.studentID;
    const query = { tutorID: studentID };

    // find student and tutor
    const student = await db.Student.findOne(ObjectID(studentID));
    const tutor = await db.Tutor.find(query).toArray();

    // render favorites page
    res.render("favorites", { student, tutor });
});

// ---------- put favorites ----------
router.put("/favorites", async (req, res) => {
    const studentID = req.session.studentID;
    const tutorID = req.body.tutorID;

    const student = await db.Student.findOne(ObjectID(studentID));
    const tutor = await db.Tutor.findOne(ObjectID(tutorID));

    // if tutor is already in favorites, remove it
    if (student.favorites[tutorID]) {
        delete student.favorites[tutorID];
    } else {
        // else add tutor to favorites
        student.favorites[tutorID] = tutor;
    }

    // update student favorites
    await db.Student.updateOne(
        // find student
        { _id: ObjectID(studentID) },
        // set favorites to student favorites
        { $set: { favorites: student.favorites } }
    );

    // redirect to favorites
    res.redirect("/favorites");
});


// ---------- delete favorites ----------
router.delete("/favorites", async (req, res) => {
    const studentID = req.session.studentID;
    const tutorID = req.body.tutorID;

    // find student
    const student = await db.Student.findOne(ObjectID(studentID));

    // delete tutor from favorites
    delete student.favorites[tutorID];

    // update student favorites
    await db.Student.updateOne(
        // find student
        { _id: ObjectID(studentID) },
        // set favorites to student favorites
        { $set: { favorites: student.favorites } }
    );

    // redirect to favorites
    res.redirect("/favorites");
});

// Exporting router
module.exports = router;