// Description: This file contains the routes for the user login page
const express = require("express");
const path = require("path");
const router = express.Router();

const {createHash} = require("crypto");

// Importing models
const studentModel = require("../models/student");
const tutorModel = require("../models/tutor");

currentUserId = 0;

// Displaying user login page
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/userLogin.html"));
});

// Handling user signup
router.post("/signup", async (req, res) => {
    // password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number
    const strongPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

    // Creating user document
    const student = new studentModel({
        name: {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        },
        email: req.body.email,
        password: createHash("sha256").update(req.body.password).digest("hex"),
        favoriteTutors: [
        ],
        totalHours: "0",
        upcomingAppointments: [
        ],
        loggedIn: true
    });

    // Checking if all fields are filled
    if(!student.firstName || !student.lastName || !student.email || !student.password) {
        console.log("Please fill in all fields");
        return;
    }

    if(!strongPassword.test(student.password)) {
        console.log("Password is not strong enough");
        return;
    }

    // Saving user document to database
    try {
        const newStudent = await student.save();
        currentUserId = newStudent.id;
        res.status(201).json(newStudent);
    }
    catch (err) {
        res.status(400).json({message: err.message});
    }

    // Redirecting to home page
    res.redirect("/");
});

// Handling user login
router.put("/login", async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    const hashPassword = createHash("sha256").update(password).digest("hex")

    // Finding user document in database
    // Find the email the user input
    // still don't know if i want to do the password hashed for use bycrypt
    // if so, then i need to use bcrypt.compareSync(password, user.password)
    try {
        const student = await studentModel.find({email: email, password: hashPassword}).select("id email");
        currentUserId = student.id;
        res.send(student);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }

    // Update student document to loggedIn to true
    // IDK IF THIS WORKS
    try {
        const student = await studentModel.updateOne({email: email, password: hashPassword}, {loggedIn: true});
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }

    // Redirecting to home page
    res.redirect("/");
});

// USED FOR TESTING PURPOSES
// DELETE THIS LATER
// Get first student from database
router.get("/getStudent", async (req, res) => {
    const hashPass = createHash("sha256").update("hashTestPassword").digest("hex");
    try {
        const student = await studentModel.find({email: "jimbo@gmail.com", password: hashPass}).select("name.firstName id email password");
        res.send(student);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// USED FOR TESTING PURPOSES
// DELETE THIS LATER
router.post("/writeStudent", async (req, res) => {
    // Creating user document
    const student = new studentModel({
        name: {
            firstName: "Jimbo",
            lastName: "John"
        },
        email: "jimbo@gmail.com",
        password: createHash("sha256").update("hashTestPassword").digest("hex"),
        favoriteTutors: [
        ],
        totalHours: "0",
        upcomingAppointments: [
        ]
    });

    // Saving user document to database
    try {
        const newStudent = await student.save();
        currentUserId = newStudent.id;
        res.status(201).json(newStudent);
    }
    catch (err) {
        res.status(400).json({message: err.message});
    }
});

module.exports = router;