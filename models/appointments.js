const mongoose = require("mongoose");

// Creating Appointment schema
const appointmentSchema = new mongoose.Schema({
    studentId: {type: mongoose.Schema.Types.ObjectId, ref: "Student"},
    studentName: {type: String, required: true},
    tutorId: {type: mongoose.Schema.Types.ObjectId, ref: "Tutor"},
    tutorName: {type: String, required: true},
    date: {type: Date, required: true},
    link: {type: String, required: true}
});

// Creating appointment model
const Appointment = mongoose.model("Appointment", appointmentSchema, "Appointment");

// Exporting model
module.exports = Appointment;