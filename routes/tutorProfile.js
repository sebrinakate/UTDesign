const express = require("express");
const app = express();
const mongodb = require('mongodb');

const path = require("path");
const router = express.Router();

const Student = require("../models/student");
const Tutor = require("../models/tutor");
const Appointment = require("../models/appointments");

router.get("/tutor/:tutorId", async (req, res) => {
    const tutor = await Tutor.findById(req.params.tutorId);

    // Calculate times tutor is free -> tutor.availability - tutor.upcomingAppointments
    let upcomingAppointmentTimes = [];
    await Promise.all(tutor.upcomingAppointments.map(async appointmentId => {
        const appointment = await Appointment.findById(appointmentId);
        if (appointment) {
            upcomingAppointmentTimes.push(appointment.date);
        }
    }));
    //time string to render
    let times = [];
    console.log(tutor.availablility);
    tutor.availablility.days.forEach(d => {
        console.log(d)
        tutor.availablility.hours.forEach(h => {
            times.push({
                'day': d,
                'hour': h
            });
        });
    });
    console.log(times)
    const renderTimes = times.map(t => [getNextDate(t.day, t.hour).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', hour12: true })])
    function getNextDate(day, time) {
        const currentDate = new Date();
        const currentTime = currentDate.getTime();
    
        const [hours, minutes] = time.match(/\d+/g).map(Number);
        const timeInMs = hours * 60 * 60 * 1000 + minutes * 60 * 1000;
      
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayIndex = days.indexOf(day);
        let daysUntil = (dayIndex - currentDate.getDay() + 7) % 7;
        if (daysUntil === 0 && currentDate.getTime() + timeInMs <= currentTime) {
          daysUntil = 7;
        }
        const dateInMs = currentDate.getTime() + daysUntil * 24 * 60 * 60 * 1000 + timeInMs - (10 * 2520000);
      
        return new Date(dateInMs);
      }

    let tutorRenderData = {
        name: tutor.name.firstName + ' ' + tutor.name.lastName, 
        aboutMe: tutor.aboutMe,
        subjects: tutor.subjects,
        times: renderTimes
    };

    try {
        res.render("../frontend/templates/tutorProfile", { tutorRenderData });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post("/api/appointment-sign-up", async function (req, res) {
    const data = req.body;
    try {
        // Get the JSON data from the request body
        const { studentId, tutorId, date } = req.body;

        // Look up the student and tutor by their IDs
        const student = await Student.findById(studentId);
        const tutor = await Tutor.findById(tutorId);

        // Create and save new appointment with the student, tutor, and date
        const appointment = new Appointment({
            studentId: student._id,
            studentName: student.name.firstName,
            tutorId: tutor._id,
            tutorName: tutor.name.firstName,
            date: new Date(date),
            link: ' '
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
});

router.delete("/api/appointment-delete/:id", function (req, res) {
    Appointment.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    .then(result => {
      console.log(`Deleted ${result.deletedCount} document(s)`);
      res.send({message: `Deleted ${result.deletedCount} document(s)`});
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({message: 'Failed to delete document'});
    });
});


module.exports = router;