const mongoose = require("mongoose");

// Creating Tutor schema
const tutorSchema = new mongoose.Schema({
    name: {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true}
    },
    email: {type: String, required: true},
    password: {type: String, required: true},
    aboutMe: {type: String},
    availablility: {
            days: [
                {type: String}
            ],
            hours: [
                {type: String}
            ]
        },
    subjects: [
        {type: String}
    ],
    upcomingAppointments: [
        {type: mongoose.Schema.Types.ObjectId, ref: "Appointment"}
    ],
    totalHours: {type: Number},
    profilePic: {type: String}
});

// Creating user model
const Tutor = mongoose.model("Tutor", tutorSchema, "Tutor");

// Exporting model
module.exports = Tutor;
