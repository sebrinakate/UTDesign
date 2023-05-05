require("dotenv").config();

const express = require("express");
const app = express();

// const session = require('express-session');

app.set('view engine', 'ejs');
const cors = require('cors');
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
const tutorProfileRoute = require("./routes/tutorProfile.js");
const favoriteTutors = require("./routes/favorites.js");
const upcomingApptsRoute = require("./routes/home.js");
const tutorSignupRoute = require("./routes/tutorSignup.js");
const searchRoute = require("./routes/search.js");
const myProfileRoute = require("./routes/myProfile.js");

// app.use(session({
//   secret: 'something secret',
//   resave: true,
//   saveUninitialized: false
// }));
app.use(cors());
app.use(express.json())

// Handling routes requests
app.use("/home", homeRoute);
app.use("/", userLoginRoute);
app.use("/api", searchRoute);
app.use("/", tutorProfileRoute);
app.use("/favorites", favoriteTutors);
app.use("/api", upcomingApptsRoute);
app.use("/api", tutorSignupRoute);
app.use("/", myProfileRoute);

app.listen(port, () => {
  console.log(`Server open on port: ${port}`);
});