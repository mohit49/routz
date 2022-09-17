const express = require("express");
const router = express.Router();
// DB Import
const Register = require("../../scemas/registration");
const Profileinfo = require("../../scemas/profileinfo");
const authenticateJWT = require("../../middleware/auth");

router.post("/editprofile", authenticateJWT, async (req, res) => {
  console.log(req.userId);
  const username = await Register.findOne({ _id: req.userId }, { password: 0 });
  const userExist = await Profileinfo.findOne(
    { username: username.username },
    { username: 1 }
  );

  if (userExist.username.length > 0) {
    const dataUpdate = await Profileinfo.updateMany(
      { username: userExist.username },
      {
        $set: {
          bikeinfo: req.body.bikeinfo,
          companyinfo: req.body.companyinfo,
          about: req.body.about,
          followers: req.body.followers,
          likes: req.body.likes,
          kms: req.body.kms,
          profilepic: req.body.profilepic,
          coverpic: req.body.coverpic,
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
      bikeinfo: req.body.bikeinfo,
      companyinfo: req.body.companyinfo,
      about: req.body.about,
      followers: req.body.followers,
      likes: req.body.likes,
      kms: req.body.kms,
      profilepic: req.body.profilepic,
      coverpic: req.body.coverpic,
    });
    const userData = await ProfileinfoUsers.save();
    res.status(200).json({
      sucessStatus: true,
      data: userData,
    });
  }

  console.log(userExist.username);
});

module.exports = router;
