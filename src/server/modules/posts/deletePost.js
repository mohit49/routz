const querystring = require("querystring");
const express = require("express");
const authenticateJWT = require("../../middleware/auth");
const router = express.Router();

// DB Import
const Postsfetch = require("../../scemas/uploadPosts");

router.delete("/api/deletePost", authenticateJWT, async (req, res) => {

  const postId = req.query?.postId;
const userId = req.userId;

  var profileSearch = await Postsfetch.find({
    _id: postId
  })

if(profileSearch[0].authorid == userId) {
    var profileSearch = await Postsfetch.deleteOne({
        _id: postId
      })
    
    res.status(200).json({
        sucessStatus: true,
        data: "Post Deleted Sucessfully",
      });
} else {
    res.status(200).json({
        sucessStatus: false,
        data: "Action not Premitted",
      });
}
   
 
  
});

module.exports = router;