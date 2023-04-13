const express = require("express");
const app = express();

const path = require("path");
const router = express.Router();

const Student = require("../models/student");
const Tutor = require("../models/tutor");
const Appointment = require("../models/appointments");

router.get("/profile/:tutorId", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/tutorProfile.html"));
});

router.post("/appointment-sign-up", async function (req, res) {
    const data = req.body;
    try {
        // Get the JSON data from the request body
        const { studentId, tutorId, date } = req.body;

        // Look up the student and tutor by their IDs
        const student = await Student.findById(studentId);
        const tutor = await Tutor.findById(tutorId);

        // Check for conflicting appointments

        // Create and save new appointment with the student, tutor, and date
        const appointment = new Appointment({
            studentId: student._id,
            studentName: student.name.firstName,
            tutorId: tutor._id,
            tutorName: tutor.name.firstName,
            date: new Date(date),
            link: 'working-on-it.com'
        });
        await appointment.save();

        //Add appointments to student and tutor objects
        try {
            student.upcomingAppointments.push(appointment._id);
            await student.save();
            tutor.upcomingAppointments.push(appointment._id); 
            await tutor.save();
        }
        catch (error) {
            console.log(error);
        }
        res.status(200).send('Appointment created successfully');
      } catch (error) {
        res.status(500).send('Error creating appointment');
      }
})

module.exports = router;