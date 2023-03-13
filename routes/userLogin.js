// Description: This file contains the routes for the user login page
const express = require("express");
const path = require("path");
const router = express.Router();

// Importing models
const studentModel = require("../models/student");
const tutorModel = require("../models/tutor");

// Displaying user login page
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/userLogin.html"));
});

// Handling user signup
router.post("/signup", (req, res) => {

    // Creating user document
    const student = new studentModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });

    // Checking if all fields are filled
    if(!student.firstName || !student.lastName || !student.email || !student.password) {
        console.log("Please fill in all fields");
        return;
    }

    if(password.length < 8) {
        console.log("Password must be at least 8 characters long");
        return;
    }

    // Saving user document to database
    student.save((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Student saved to database");
        }
    });

    // Redirecting to home page
    res.redirect("/");
});

// Handling user login
router.post("/login", (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    // Finding user document in database
    // Find the email the user input
    // still don't know if i want to do the password hashed for use bycrypt
    studentModel.find({email: email, password: password}, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            if (user) {
                console.log("User found");
            } else {
                console.log("User not found");
            }
        }
    });

    // Redirecting to home page
    res.redirect("/");
});

// USED FOR TESTING PURPOSES
// DELETE THIS LATER
// Get first student from database
router.get("/getStudent", async (req, res) => {
    try {
        const student = await studentModel.find();
        res.send(student);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// USED FOR TESTING PURPOSES
// DELETE THIS LATER
router.post("/writeStudent", async (req, res) => {
    const student = new studentModel({
        name: {
            firstName: "John",
            lastName: "Doe"
        },
        email: "jd@gmail.com",
        password: "password",
        favoriteTutors: [
        ],
        totalHours: "0",
        upcomingAppointments: [
        ]
    });

    try {  
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

module.exports = router;