const express = require("express");
const path = require("path");

// Creating express router  
const router = express.Router();

// get favorites
router.get("/favorites", async (req, res) => {
    const studentID = req.session.studentID;
    const query = { tutorID: studentID };

    const student = await db.Student.findOne(ObjectID(studentID));
    const tutor = await db.Tutor.find(query).toArray();

    res.render("favorites", { student, tutor });

    //for(let numFav of tutor){
        //if(student.favorites[numFav.tutorID])
            // display list of favorited tutors
    //}
});

// post favorites
router.post("/favorites", async (req, res) => {
    const studentID = req.session.studentID;
    const tutorID = req.body.tutorID;

    const student = await db.Student.findOne(ObjectID(studentID));
    const tutor = await db.Tutor.findOne(ObjectID(tutorID));

    if (student.favorites[tutorID]) {
        delete student.favorites[tutorID];
    } else {
        student.favorites[tutorID] = tutor;
    }

    await db.Student.updateOne(
        { _id: ObjectID(studentID) },
        { $set: { favorites: student.favorites } }
    );

    res.redirect("/favorites");
});

// delete favorites
router.delete("/favorites", async (req, res) => {
    const studentID = req.session.studentID;
    const tutorID = req.body.tutorID;

    const student = await db.Student.findOne(ObjectID(studentID));
    const tutor = await db.Tutor.findOne(ObjectID(tutorID));

    if (student.favorites[tutorID]) {
        delete student.favorites[tutorID];
    } else {
        student.favorites[tutorID] = tutor;
    }

    await db.Student.updateOne(
        { _id: ObjectID(studentID) },
        { $set: { favorites: student.favorites } }
    );

    res.redirect("/favorites");
});

// Exporting router
module.exports = router;