const express = require("express");
const router = express.Router();
const Tutor = require("../models/tutor");

//should be able to find based on first name, last name, subjects, or full name
//assuming spelling is exact

async function getTutors(query) {

    //find subjects
    const foundTutorSubj = await Tutor.find({subjects : query});
    if(foundTutorSubj.length == 0)
    {
        console.log("no subjects match this");
    }
    else
    {
        return foundTutorSubj;
    }

    //find by full name using OR
    const querySplit = query.split(" ");
    const foundTutorFullName = await Tutor.find({$or: [{'name.firstName' : querySplit[0], 'name.lastName' : querySplit[1]}, {'name.firstName' : querySplit[1], 'name.lastName' : querySplit[0]}]});

    if(foundTutorFullName.length == 0)
    {
        console.log("no full names match this");
    }
    else
    {
        return foundTutorFullName;
    }

    //find by one name of both using OR
    const foundTutorOneName = await Tutor.find({$or: [{'name.firstName' : querySplit[0]}, {'name.firstName' : querySplit[1]}, {'name.lastName' : querySplit[1]}, {'name.lastName' : querySplit[0]}]});
    if(foundTutorOneName.length == 0)
    {
        console.log("nothing found");
    }
    else
    {
        return foundTutorOneName;
    }

    //{name.firstName : querySplit[0]}

    
  }

// Handling search function
router.get('/', function (req, res) {
    console.log("Search Router Working");

    const query = req; //should work iN THEORY
    //const query = "Uzair Thomas";
    
    getTutors(query).then(function(FoundItems){
        console.log(FoundItems)
        console.log("here!")

        res.send(FoundItems)

    });
})


module.exports = router;