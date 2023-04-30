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
  const indexNo = req.query?.index || 0;
  const query = req.query?.query || "";

  var dataQuery;
  if (!city && !creatorId) {
    const dataEvent = await Createevent.find({}).limit(limit).skip(indexNo);

    res.json(dataEvent);
  } else {
    console.log("eeee");
    const dataEvent = await Createevent.find({
      $and: [
        {
          $or:[{ createrid: { $regex: new RegExp(creatorId, 'i') } }],
          $or: [{ "city.name": { $regex: new RegExp(city, "i") } }],
        },
      ],
    })
      .limit(limit)
      .skip(indexNo);
    res.json(dataEvent);
  }
});
module.exports = router;
