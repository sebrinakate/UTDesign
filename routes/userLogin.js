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

    // Finding user document in database

    // Redirecting to home page
    res.redirect("/");
});

module.exports = router;