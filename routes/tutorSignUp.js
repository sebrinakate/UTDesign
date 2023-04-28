const express = require("express");
const path = require("path");
const router = express.Router();
const Student = require("../models/student");
const Tutor = require("../models/tutor");

// Displaying user login page
router.get("/", async (req, res) => {
    //res.sendFile(path.join(__dirname, "../frontend/pages/personalProfile.html"));
    console.log("Tutor Sign In Working");

    //const query = "6418b71544d816b4ba9d3419"; //should work iN THEORY
    const studentID = req.session.studentID;
    
    getTutors(query).then(function(FoundItems){
        console.log(FoundItems)
        console.log("here!")

        res.send(FoundItems)

    });

});


async function getTutors(studentID) {

    //find student by id
    const studentInfo = await Student.findById(studentID);

    // or find the user that is logged in 
    // const studentInfo = await Student.find({loggedIn: true});

    if(studentInfo.length == 0)
    {
        console.log("Student does not exist, please sign up as a student first");
    }
    else
    {
        //console.log(studentInfo.name.firstName)

        const tutorInfo = new Tutor({
            //_id: ObjectId(query),
            name:{
                firstName: studentInfo.name.firstName,
                lastName: studentInfo.name.lastName
            },
            email: studentInfo.email,
            password: studentInfo.password,
            availablility:[],
            subjects: [],
            upcomingAppointments:[],
            totalHours: 0

        });

        
        // Saving user document to database
        try{
            const newTutor = await tutorInfo.save();
            console.log("Student Saved")
        }
        catch(err){
            console.log(err);
        }
        

        return tutorInfo;
    
       
    
    }

  }


module.exports = router;






