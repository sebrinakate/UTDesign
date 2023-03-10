const express = require("express");
const path = require("path");
const router = express.Router();
const mongoose = require("mongoose");

// Displaying user login page
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/userLogin.html"));
});

// Handling user signup
router.post("/signup", (req, res) => {

    // Creating user document
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });

    // Saving user document to database
    user.save((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("User saved to database");
        }
    });
});

// Handling user login
router.post("/login", (req, res) => {

    // Finding user document in database

    // Redurecting to home page
    res.redirect("/");
});

module.exports = router;