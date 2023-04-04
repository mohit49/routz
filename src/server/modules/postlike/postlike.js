const querystring = require("querystring");
const express = require("express");
const authenticateJWT = require("../../middleware/auth");
const router = express.Router();

// DB Import
const Postsfetch = require("../../scemas/uploadPosts");

router.post("/api/postLike", authenticateJWT, async (req, res) => {
  const postId = req.query?.postId;
  const userId = req.userId;
  if (userId) {
    var profileSearch = await Postsfetch.find({
      _id: postId,
    });

   
    if (profileSearch[0].postlikes && profileSearch[0].postlikes?.length > 0) {
        console.log(userId)
      var lastLiked = profileSearch[0].postlikes;
     
      if(lastLiked.includes(',')){
        const convertArray = lastLiked.split(',');

        let filteredArray = convertArray.filter((ele)=> ele !== userId);
      
        const dataUpdate = await Postsfetch.updateMany(
            { _id: postId },
            {
              $set: {
                postlikes: filteredArray?.join(','),
              },
            }
          );
          var CountData = filteredArray?.join(',').split(',').length;

          res.status(200).json({
            sucessStatus: true,
            dataCount: CountData,
            list:filteredArray?.join(',')
          });
      }
      else {

      if(lastLiked == userId) {
    
        const dataUpdate = await Postsfetch.updateMany(
            { _id: postId },
            {
              $unset: {
                postlikes: '',
              },
            }
          );
          var CountData = '0';
          res.status(200).json({
            sucessStatus: true,
            dataCount: CountData,
          });
      } else {
    
   const dataUpdate = await Postsfetch.updateMany(
            { _id: postId },
            {
              $set: {
                postlikes: lastLiked + "," + req.userId,
              },
            }
          );
          var profileSearch = await Postsfetch.find({
            _id: postId,
          });
          res.status(200).json({
            sucessStatus: true,
            dataCount: profileSearch[0].postlikes.split(',').length,
            list:profileSearch[0].postlikes
          });
      }
     
      }
      
    } else {
      const dataUpdate = await Postsfetch.updateMany(
        { _id: postId },
        {
          $set: {
            postlikes: req.userId,
          },
        }
      );
      var profileSearch = await Postsfetch.find({
        _id: postId,
      });
      var CountData = dataUpdate[0]?.postlikes.split(',').length || '1';
      res.status(200).json({
        sucessStatus: true,
  
        dataCount: CountData,
        list: profileSearch[0]?.postlikes
      });
    }

   
  } else {
    res.status(200).json({
      sucessStatus: false,
      data: "Action not Premitted",
    });
  }
});

module.exports = router;
