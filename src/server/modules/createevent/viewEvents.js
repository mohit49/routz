const querystring = require("querystring");
const express = require("express");
const router = express.Router();

// DB Import
const Createevent = require("../../scemas/createevent");

const authenticateJWT = require("../../middleware/auth");

router.get("/api/viewevent/search", async (req, res) => {
  const city = req.query?.city;
  const limit = req.query?.limit;
  const creatorId = req.query?.creatorId;
  const indexNo = req.query?.index;
  const query = req.query?.query || "";

  var dataQuery;
if (!city && !creatorId && !query) {

  const dataEvent = Createevent.find({});
  res.json(dataEvent);

} else {

 const dataEvent = await Createevent.find(
    {
      $or: [
        {
          'creatorid': creatorId,
        },
        {
          "city.name": city,
        }
      ],
      'eventtitle': {
        $regex: new RegExp(query),
      }
      
    }
  )
    .limit(limit)
    .skip(indexNo);
    res.json(dataEvent);
}

});
module.exports = router;








