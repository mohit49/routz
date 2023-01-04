const querystring = require("querystring");
const express = require("express");
const router = express.Router();

// DB Import
const Createevent = require("../../scemas/createevent");
const RegisterData = require("../../scemas/registration");
const authenticateJWT = require("../../middleware/auth");

router.get("/search-bar", async (req, res) => {
  const searchtype = req.query?.searchtype;
  const limit = req.query?.limit;
  const queryIndex = 0;
  const query = req.query?.query || "";
  console.log(searchtype + limit + query);
  var searchArray = { resultBikers: {}, resultEvents: {} };
  var profileSearch = await RegisterData.find({
    usertype: "biker",
    $and: [
      {
        $or: [
          { name: { $regex: new RegExp(query) } },
          { username: { $regex: new RegExp(query) } },
          { phone: { $regex: new RegExp(query) } },
        ],
      },
     
    ],
  }, { password: 0 })
    .limit(limit)
    .skip(queryIndex);
  var eventResultSearch = await Createevent.find({
    $and: [
      {
        $or: [
          { eventtitle: { $regex: new RegExp(query) } },
          { creatorname: { $regex: new RegExp(query) } },
        ],
      },
    ],
  })
    .limit(limit)
    .skip(queryIndex);
  if (searchtype?.includes(",")) {
    var searchTypeArray = searchtype.split(",");
    if (searchTypeArray.indexOf("biker") > -1) {
      searchArray.resultBikers = profileSearch;
    }
    if (searchTypeArray.indexOf("event") > -1) {
      searchArray.resultEvents = eventResultSearch;
    }
   
  } else if (searchtype?.length > 0) {
    console.log(searchtype + "kjgh");
    if (searchtype == "biker") {
      searchArray.resultBikers = profileSearch;
      console.log(profileSearch);
    }
    if (searchtype == "event") {
      searchArray.resultEvents = eventResultSearch;
    }
 
  } else {
    console.log("step3");
  }
  res.status(200).json({
    sucessStatus: true,
    data: searchArray,
  });
});

module.exports = router;
