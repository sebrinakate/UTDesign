const express = require("express");
const path = require("path");
const router = express.Router();

const {createHash}  = require('crypto');

const Student = require("../models/student");
const Tutor = require("../models/tutor");

// Displaying user login page
router.get("/login", (req, res) => {
    try {
        res.render("../frontend/templates/userLogin", {});
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// Handling user signup
router.post("/api/signup", async (req, res) => {

    // Creating user document
    const student = new Student({
        name: {
            firstName: req.body.fname,
            lastName: req.body.lname
        },
        email: req.body.email,
        password: createHash("sha256").update(req.body.password).digest("hex"),
        favoriteTutors: [],
        totalHours: 0,
        upcomingAppointments: [],
        loggedIn: true
    });

    // Saving user document to database
    try {
        await student.save();
        res.status(200);
    }
    catch (err) {
        res.status(400).json({message: err.message});
    }
});

// Handling user login
router.post("/api/login", async (req, res) => {

    // const email = req.body.email;
    // const password = req.body.password;
    // const hashPassword = createHash("sha256").update(password).digest("hex")

    const emailSubmit = req.body.email;
    const submittedPassword = createHash("sha256").update(req.body.password).digest("hex");

    // Finding user document in database
    let person, userRole;
    try {
        person = await Tutor.findOne({ $and: [ { email: emailSubmit }, { password: submittedPassword }  ] })
        userRole = "tutor";
    } catch (error) {
        console.log(error);
    }
    if (!person) {
        try {
            person = await Student.findOne({ $and: [ { email: emailSubmit }, { password: submittedPassword }  ] });
            userRole = "student";
        } catch (error) {
            console.log(error);
        }
    }

    if (person && Object.keys(person).length > 0) {
        return res.json({ id: person.id, role: userRole });
    }
    else
        return res.json({ id: false });
});

module.exports = router;