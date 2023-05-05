const express = require("express");
const path = require("path");
const router = express.Router();
const Student = require("../models/student");
const Tutor = require("../models/tutor");

router.post("/tutor-signup", async (req, res) => {

    //find student by id
    const student = await Student.findById(req.body.userId);
    console.log(req.body)

    if (student) {
        const newTutor = new Tutor({
            name:{
                firstName: student.name.firstName,
                lastName: student.name.lastName
            },
            email: student.email,
            password: student.password,
            aboutMe: req.body.description,
            availablility: req.body.availability,
            subjects: req.body.subjectsArray,
            upcomingAppointments: student.upcomingAppointments,
            totalHours: student.totalHours
        });
        console.log(newTutor);
        await newTutor.save();
        res.status(200).send('Tutor created successfully');
    }
});


module.exports = router;