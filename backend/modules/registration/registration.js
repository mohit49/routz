const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// DB Import
const Register = require("../../scemas/registration");

const UpdateprofileData = require("../../scemas/profileinfo");
const accessTokenSecret = "NOTESAPI";
router.post("/register",  (req, res) => {
  console.log(req.body.name)
 
    const registerUsers = new Register({
      name: req.body.name,
    });

    console.log(registerUsers);
    const userData =  registerUsers.save();
   
    
console.log('sss')

});

module.exports = router;
