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
            tutorId: {type: mongoose.Schema.Types.ObjectId, ref: "Tutor"},
            tutorName: {String}
        }
    ],
    totalHours: {Number},
    upcomingAppointments: [
        {type: mongoose.Schema.Types.ObjectId, ref: "Appointment"}
    ]
});

// Creating user model
const User = mongoose.model("Student", studentSchema);