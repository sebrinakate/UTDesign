const express = require("express");
const path = require("path");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/userLogin.html"));
});

module.exports = router;