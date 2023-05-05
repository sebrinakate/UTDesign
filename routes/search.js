const express = require("express");
const path = require("path");
 
const router = express.Router();

const Tutor = require("../models/tutor");

router.get('/search/:query', async (req, res) => {
    const searchResults = await getSearchResults(req.params.query);
    res.json(searchResults);
  });
  
  //should be able to find based on first name, last name, subjects, or full name
  //assuming spelling is exact
  const getSearchResults = async function (query) {
    const querySplit = query.split(" ");

    let finds;
    if (querySplit.length > 1) {
      finds = [
        Tutor.find({ $or: [{'name.firstName' : querySplit[0], 'name.lastName' : querySplit[1]}, {'name.firstName' : querySplit[1], 'name.lastName' : querySplit[0]}] }).exec(),
        Tutor.find({ subjects : query }).exec()
      ];
    } else {
      finds = [
        Tutor.find({ $or: [{'name.firstName' : querySplit[0]}, {'name.firstName' : querySplit[1]}, {'name.lastName' : querySplit[0]}, {'name.lastName' : querySplit[1]}] }).exec(),
      ];
    }
  
    const results = await Promise.all(finds);  
    const flatResults = results.flat().filter((result, index) => {
      return index === results.flat().findIndex(o => result.id === o.id);
    });
    console.log('results', flatResults);
    if (flatResults[0] == flatResults[1]) {
      console.log('equal')
    }
    
  
    return flatResults;
  }

module.exports = router;