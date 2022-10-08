const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// DB Import
const Register = require("../../scemas/registration");

const UpdateprofileData = require("../../scemas/profileinfo");
const accessTokenSecret = "NOTESAPI";
router.post("register", async (req, res) => {
  console.log('inregister')
  try {
    const registerUsers = new Register({
      name: req.body.name,
      username: req.body.username.toLowerCase(),
      email: req.body.email,
      phone: req.body.phone,
      usertype: req.body.usertype,
      companyname: req.body.companyname,
      password: req.body.password,
    });
    const updateprofileData = new UpdateprofileData({
      name: req.body.name,
      username: req.body.username.toLowerCase(),
      companyinfo: req.body.companyname,
    });
    console.log(registerUsers);
    const pdata = await updateprofileData.save();
    const userData = await registerUsers.save();

  } catch (error) {
    res.status(200).json({
      sucessStatus: false,
      data: `Something Went Wrong while connecting with servies`,
    });
  }
});

module.exports = router;
