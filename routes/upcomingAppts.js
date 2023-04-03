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

// Handling upcomingAppts
router.post("/upcomingAppts", async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    const hashPassword = createHash("sha256").update(password).digest("hex")

    // Finding user document in database
    // Find the email the user input
    // still don't know if i want to do the password hashed for use bycrypt
    // if so, then i need to use bcrypt.compareSync(password, user.password)
    // put nothing inside find() if you want all documents
    // specify what to output inside select()
    try {
        const student = await studentModel.find({email: email, password: hashPassword}).select("id email");
        currentUserId = student.id;
        res.send(student);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }

    // Redirecting to home page
    res.redirect("/");
});