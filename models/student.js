const mongoose = require("mongoose");

// Creating Student schema
const studentSchema = new mongoose.Schema({
    name: {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true}
    },
    email: {type: String, required: true},
    password:{type: String, required: true},
    favoriteTutors: [
        {
            tutorID: {type: mongoose.Schema.Types.ObjectId, ref: "Tutor"},
            tutorName: {type: mongoose.Schema.Types.String}
        }
    ],
    totalHours: {Number},
    upcomingAppointments: [
        {type: mongoose.Schema.Types.ObjectId, ref: "Appointment"}
    ]
});

// Creating user model
const Student = mongoose.model("Student", studentSchema, "Student");

// Exporting model
module.exports = Student;