const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

// Importing routes
const homeRoute = require("./routes/home.js");

// Handling routes requests
app.use("/", homeRoute);

app.listen(port, () => {
  console.log(`Server open on port: ${port}`);
});