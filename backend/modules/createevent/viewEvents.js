const querystring = require('querystring');
const express = require("express");
const router = express.Router();

// DB Import
const Createevent = require("../../scemas/createevent");

const authenticateJWT = require("../../middleware/auth");


router.get("/viewevent/search", async (req, res) => {
    console.log('ssss')
    const city =  req.query?.city
    const limit =  req.query?.limit
    const creatorId =  req.query?.creatorId
    const indexNo = req.query?.index
    var dataQuery = await Createevent.find({creatorid : creatorId , 'city.name' : city }).limit(limit).skip(indexNo);
    console.log(dataQuery)
   
    console.log('sss' + dataQuery + 'thr')
    res.status(200).json({
      sucessStatus: true,
      data: dataQuery,
    });
   
  
  
  });











module.exports = router;