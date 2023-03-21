const express = require("express");
const path = require("path");

// Creating express router  
const router = express.Router();

//for(let numFav of tutor){
    if(student.favorites[numFav.tutorID])
        // display list of favorited tutors
//}

// get favorites
router.get("/favorites", async (req, res) => {
    const studentID = req.session.studentID;
    const query = { tutorID: studentID };

    const student = await db.Student.findOne(ObjectID(studentID));
    const tutor = await db.Tutor.find(query).toArray();

    res.render("favorites", { student, tutor });
});

// Exporting router
module.exports = router;