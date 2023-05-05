const express = require("express");
const path = require("path");
 
const router = express.Router();

const Student = require("../models/student");
const Tutor = require("../models/tutor");
const Appointment = require("../models/appointments");

router.get('/:userId', async (req, res) => {
  let homeRenderData = {
    upcomingAppointments: [], 
    searchResults: [],
    favoriteTutors: [],
    totalHours: 0
  };

  let person, isStudent;
  try {
      person = await Tutor.findById(req.params.userId)
      isStudent = false;
  } catch (error) {
      console.log(error);
  }
  if (!person) {
      try {
          person = await Student.findById(req.params.userId)
          isStudent = true;
      } catch (error) {
          console.log(error);
      }
  }
  console.log(person);
  if (person)
    person.totalHours ? homeRenderData.totalHours = person.totalHours : homeRenderData.totalHours = 0;
  
  await Promise.all(person.upcomingAppointments.map(async appointmentId => {
    const appointment = await Appointment.findById(appointmentId);
    if (appointment) {
      homeRenderData.upcomingAppointments.push([appointment.tutorName, appointment.date.toLocaleString('en-US', { hour12: true }), appointment.link, appointment.id])
    }
  }));

  if (isStudent) {
    await Promise.all(person.favoriteTutors.map(async tutorId => {
      const tutor = await Tutor.findById(tutorId);
      if (tutor) {
        homeRenderData.favoriteTutors.push([tutor.id, tutor.name.firstName + ' ' + tutor.name.lastName, tutor.profilePic]);
      }
    }));
  }

  homeRenderData.id = person.id;

  try {
    res.render("../frontend/templates/home", { homeRenderData });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;