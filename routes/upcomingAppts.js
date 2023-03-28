const express = require("express");
const path = require("path");

// Creating express router  
const router = express.Router();

// Handling request to /home to route to index.html
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Exporting router
module.exports = router;