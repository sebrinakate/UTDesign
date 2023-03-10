const mongoose = require("mongoose");

// Creating Tutor schema
const tutorSchema = new mongoose.Schema({
    name: {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true}
    },
    email: {type: String, required: true},
    password: {type: String, required: true},
    availablility: [
        {
            day: {type: String},
            hours: []
        }
    ],
    subjects: [
        {type: String}
    ],
    upcomingAppointments: [
        {type: mongoose.Schema.Types.ObjectId, ref: "Appointment"}
    ],
    totalHours: {type: Number}
});

// Creating tutor model
const Tutor = mongoose.model("Tutor", tutorSchema);
