const express = require("express");
const router = express.Router();

// DB Import
const Register = require("../../scemas/registration");

router.post("/register", async (req, res) => {
  try {
    const getEmail = await Register.findOne(
      { email: req.body.email },
      { email: 1 }
    );
    const username = await Register.findOne(
      { username: req.body.username },
      { username: 1 }
    );
    const phone = await Register.findOne(
      { phone: req.body.phone },
      { phone: 1 }
    );
    console.log(getEmail, username);
    if (getEmail !== null || username !== null || phone !== null) {
      if (username !== null) {
        res.status(200).json({
          sucessStatus: false,
          error: "username is already exist",
        });
        return false;
      }

      if (getEmail !== null) {
        res.status(200).json({
          sucessStatus: false,
          error: "Email is already exist",
        });
        return false;
      }

      if (phone !== null) {
        res.status(200).json({
          sucessStatus: false,
          error: "Phone Number is already exist",
        });
        return false;
      }
    } else {
      const registerUsers = new Register({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        usertype: req.body.usertype,
        companyname: req.body.companyname,
        password: req.body.password,
      });
      const userData = await registerUsers.save();

      res.status(200).json({
        sucessStatus: true,
        data: `Hi! ${userData.name} Sucessfully Registerd`,
      });
    }
  } catch (error) {
    res.status(200).json({
      sucessStatus: false,
      data: `Something Went Wrong while connecting with servies`,
    });
  }
});

module.exports = router;
