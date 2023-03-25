const querystring = require("querystring");
const express = require("express");
const router = express.Router();

// DB Import
const Postsfetch = require("../../scemas/uploadPosts");

router.get("/api/posts", async (req, res) => {
 
  const limit = req.query?.limit;
  const postType = req.query?.type;
  const queryIndex = 0;
  const query = req.query?.query?.toLowerCase() || "";
  
  console.log(req.query?.query);
  var profileSearch = await Postsfetch.find({
    postType: postType,
    $and: [
      {
        $or: [
          { postdiscription: { $regex: new RegExp(query, 'i') } },
          { 'authorinfo.name': { $regex: new RegExp(query, 'i') } },
          { 'authorinfo.username': { $regex: new RegExp(query, 'i') } }
        ],
      },
     
    ],
  })
    .limit(limit)
    .skip(queryIndex);

  
  res.status(200).json({
    sucessStatus: true,
    data: profileSearch,
  });
});

module.exports = router;