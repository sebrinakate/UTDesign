const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 3000;

app.post("/studentSignup", (req, res) => {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;

    var data = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password": password
    }

    db.collection('Student').insertOne(data, (err, collection) => {
        if (err) throw err;
        console.log("Record inserted successfully");
    });

    return res.redirect('signup_success.html');
});

app.post("/userLogin", (req, res) => {

});

