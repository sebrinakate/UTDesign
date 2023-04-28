require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const port = 4000;

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
const tutorLoginRoute = require("./routes/tutorSignUp.js");

// Handling routes requests
app.use("/", homeRoute);
app.use("/userLogin", userLoginRoute);
app.use("/tutorLogin", tutorLoginRoute);

// THIS IS JUST TO TEST CONNECTION TO DATABASE
// YOU CAN DELETE THIS
// CAN USE AS A REFERENCE FOR HOW TO USE MONGOOSE
const studentSchema = require("./models/student");
const tutorSchema = require("./models/tutor");
app.get("/test", async (req, res) => {
  res.send(await studentSchema.find());
});

app.listen(port, () => {
  console.log(`Server open on port: ${port}`);
}); 