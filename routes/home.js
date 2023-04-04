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

// handling student total hours
router.get("/", async (Req, res) => {
// TODO: specify the specific student?
const email = req.body.email;

 try {
  const totalHours = await studentModel.find({email: email}).select("totalHours");
  res.send(totalHours);
} catch (err) {
  res.status(500).json({message: err.message});
}
});

// handling tutor total hours
router.get("/", async (Req, res) => {
  // TODO: specify the specific tutor?
  const email = req.body.email;

  try {
   const totalHours = await tutorModel.find({email: email}).select("totalHours");
   res.send(totalHours);
 } catch (err) {
   res.status(500).json({message: err.message});
 }
 });