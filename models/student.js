const { ObjectId } = require("bson");
const mongoose = require("mongoose");

// Creating Student schema
const studentSchema = new mongoose.Schema({
    name: {
        firstName: {String, required: true},
        lastName: {String, required: true}
    },
    email: {String, required: true},
    password: {String, required: true},
    favoriteTutors: [
        {
            tutorId: {type: mongoose.Schema.Types.ObjectId, ref: "Tutor"},
            tutorName: {String, required: true}
        }
    ],
    totalHours: {Number},
    upcomingAppointments: [
        
    ]
});

// Creating user model
const User = mongoose.model("Student", studentSchema);