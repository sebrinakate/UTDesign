const express = require("express");
const path = require("path");

// Creating express router  
const router = express.Router();

const student = await db.Student.findOne(ObjectID(studentID));
const tutor = await db.Tutor.find(query).toArray();

for(let numFav of tutor){
    if(student.favorites[numFav.tutorID])
        // display list of favorited tutors
}


// Exporting router
module.exports = router;