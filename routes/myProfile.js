const express = require("express");
const app = express();

const path = require("path");
const router = express.Router();

const Student = require("../models/student");
const Tutor = require("../models/tutor");
const Appointment = require("../models/appointments");

router.get("/profile/:userId", async (req, res) => {
    const student = await Student.findById(req.params.userId);

    let myRenderData = {
        name: student.name.firstName + " " + student.name.lastName,
        email: student.email
    }

    try {
        res.render("../frontend/templates/myProfile", { myRenderData });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;