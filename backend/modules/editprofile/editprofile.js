const express = require("express");
const router = express.Router();
// DB Import
const Register = require("../../scemas/registration");
const Profileinfo = require("../../scemas/profileinfo");
const authenticateJWT = require("../../middleware/auth");
var multer  = require('multer')
var fs = require('fs');
const fileStorageEngine = multer.diskStorage({
  destination:(req,file,cb) =>{

  const path = `./images/profile_pic/${file.originalname.split('.')[0]}`
      fs.mkdirSync(path, { recursive: true })
      return cb(null, path)
  },
  filename:(req,file,cb) =>{
      cb(null,Date.now() + '_' + file.originalname)
  }

})
const upload = multer({storage: fileStorageEngine});
router.post("/editprofile", authenticateJWT, upload.single('image'), async (req, res, next) => {




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
          profilepic: req.file,
          coverpic: req.body.coverpic,
          ridingsince: req.body.ridingsince,
          location: req.body.location,
          intro: req.body.intro,
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
