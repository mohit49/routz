const express = require("express");
const router = express.Router();
// DB Import
const Register = require("../../scemas/registration");
const Profileinfo = require("../../scemas/profileinfo");
const authenticateJWT = require("../../middleware/auth");

router.get("/profile/:username", async (req, res) => {
    const username = req.params.username;
    console.log(username)
  const resUserName = await Register.findOne({ username: username }, { password: 0 });
  const userExist = await Profileinfo.findOne(
    { username: resUserName.username },
    { password: 0 }
  );
  res.status(200).json({
    sucessStatus: true,
    data: userExist,
  });
});

module.exports = router;
