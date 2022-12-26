const express = require("express");
const router = express.Router();
// DB Import
const Register = require("../../scemas/registration");
const CreateEvents = require("../../scemas/createevent");
const authenticateJWT = require("../../middleware/auth");
var multer  = require('multer')
var fs = require('fs');

const fileStorageEngine = multer.diskStorage({
  destination:(req,file,cb) =>{
    var path;


      path = `./images/${file.originalname.split('.')[0]}/events`
    
 
   
    fs.mkdirSync(path, { recursive: true })
    return cb(null, path)
},
filename:(req,file,cb) =>{
    cb(null,Date.now() + '_' + file.originalname)
}
});
const upload = multer({storage: fileStorageEngine});
router.post("/createevent", authenticateJWT, upload.single('image'),  async (req, res, next) => {
  console.log('requested')
  const createEventData = {
    title: req.body.title,
    eventduration: req.body.eventduration,
    eventDiscription : req.body.eventDiscription
  }
 

  const username = await Register.findOne({ _id: req.userId }, { password: 0 });
  console.log(username)
  const CreateEvent = new CreateEvents({
    createrid: username._id,
    creatorname: username.name,
    eventtitle: createEventData.title,
    creatorusername: username.username,
    creatorcompany:username.companyname,
    eventdiscription: createEventData.eventDiscription,
    eventduration: createEventData.eventduration,
    eventcoverpic:req.file
   
   
  });
  const eventData = await CreateEvent.save();
  res.status(200).json({
    sucessStatus: true,
    data: eventData,
  });



});

module.exports = router;
