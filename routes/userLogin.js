const express = require("express");
const path = require("path");
const router = express.Router();
const Student = require("../models/student");
const Tutor = require("../models/tutor");

// Displaying user login page
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/userLogin.html"));
});

// Handling user signup
router.post("/signup", (req, res) => {

    // Creating user document
    const student = new Student({
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

    // Redirecting to home page
    res.redirect("/");
});

module.exports = router;