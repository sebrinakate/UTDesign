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

// get student total hours
router.get("/", async (Req, res) => {
 try {
  const totalHours = await studentModel.find({loggedIn: true}).select("totalHours");
  res.send(totalHours);
} catch (err) {
  res.status(500).json({message: err.message});
}
});

// get tutor total hours
router.get("/", async (Req, res) => {
  try {
   const totalHours = await tutorModel.find({loggedIn: true}).select("totalHours");
   res.send(totalHours);
 } catch (err) {
   res.status(500).json({message: err.message});
 }
 // might have to use render to output on the frontend
 });