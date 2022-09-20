const express = require("express");
const router = express.Router();
// DB Import
const Register = require("../../scemas/registration");
const Profileinfo = require("../../scemas/profileinfo");
const authenticateJWT = require("../../middleware/auth");

router.post("/editprofile", authenticateJWT, async (req, res) => {
  const username = await Register.findOne({ _id: req.userId }, { password: 0 });
  const userExist = await Profileinfo.findOne(
    { username: username.username },
    { username: 1 }
  );

  if (userExist !== null) {
    const dataUpdate = await Profileinfo.updateMany(
      { username: userExist.username },
      {
        $set: {
          bikeinfo: req.body.bikeinfo,
          companyinfo: req.body.companyinfo,
          about: req.body.about,
          followers: req.body.followers,
          kms: req.body.kms,
          profilepic: req.body.profilepic,
          coverpic: req.body.coverpic,
          ridingsince: req.body.ridingsince,
          location: req.body.location,
        },
      }
    );

    const userUpdates = await Profileinfo.findOne(
      { username: username.username },
      { password: 0 }
    );
    res.status(200).json({
      sucessStatus: true,
      data: userUpdates,
    });
  } else {
    const ProfileinfoUsers = new Profileinfo({
      username: username.username,
      bikeinfo: req.body.bikeinfo,
      companyinfo: req.body.companyinfo,
      about: req.body.about,
      followers: req.body.followers,
      kms: req.body.kms,
      profilepic: req.body.profilepic,
      coverpic: req.body.coverpic,
      ridingsince: req.body.ridingsince,
      location: req.body.location,
    });
    const userData = await ProfileinfoUsers.save();
    res.status(200).json({
      sucessStatus: true,
      data: userData,
    });
  }
});

module.exports = router;
