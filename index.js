require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

// connect to database
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

// Setting up static files
// Makes sure that the frontend folder is accessible
app.use(express.static(path.join(__dirname, "frontend")));

// Importing routes
const homeRoute = require("./routes/home.js");
const userLoginRoute = require("./routes/userLogin.js");
const tutorProfileRoute = require("./routes/tutorProfile.js")

// Handling routes requests
app.use("/", homeRoute);
app.use("/userLogin", userLoginRoute);

app.use(express.json())
app.use("/api", tutorProfileRoute);

app.listen(port, () => {
  console.log(`Server open on port: ${port}`);
});