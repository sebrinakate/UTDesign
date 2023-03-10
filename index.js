const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

// Setting up static files
// Makes sure that the frontend folder is accessible
app.use(express.static(path.join(__dirname, "frontend")));

// Importing routes
const homeRoute = require("./routes/home.js");

// Handling routes requests
app.use("/", homeRoute);

app.listen(port, () => {
  console.log(`Server open on port: ${port}`);
});