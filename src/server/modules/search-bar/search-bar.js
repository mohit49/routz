const querystring = require("querystring");
const express = require("express");
const router = express.Router();

// DB Import
const Createevent = require("../../scemas/createevent");
const RegisterData = require("../../scemas/registration");
const authenticateJWT = require("../../middleware/auth");

router.get("/api/search-bar", async (req, res) => {
  const searchtype = req.query?.searchtype;
  const limit = Number(req.query?.limit);
  const queryIndex = 0;
  const query = req.query?.query?.toLowerCase() || "";
  const state = req.query?.state || "";
  const city = req.query?.city || "";
  if (searchtype?.length > 0) {
    var searchArray = { resultBikers: {}, resultEvents: {} };
    const searchArr = searchtype.split(",");
    var profileSearch, eventSearch;

    for await (const ele of searchArr) {
      if ((await ele) == "biker") {
        profileSearch = await RegisterData.aggregate([
          {
            $match: {
              usertype: "biker",
              $and: [
                {
                  $or: [
                    { name: { $regex: new RegExp(query, "i") } },
                    { username: { $regex: new RegExp(query, "i") } },
                  ],
                },
              ],
            },
          },
          { $skip: queryIndex ? queryIndex : 0 },

          { $limit: limit ? limit : 0 },

          {
            $lookup: {
              from: `profileinfos`,
              localField: "username",
              foreignField: "username",
              as: "more",
            },
          },

          { $unset: "password" },
        ]);
        searchArray.resultBikers = profileSearch;
        res.status(200).json({
          sucessStatus: true,
          data: searchArray,
        });
      } else if (ele == "event") {
        var eventResultSearch = await Createevent.find({
          $and: [
            {
              $or: [
                { eventtitle: { $regex: new RegExp(query , "i") } },
                { creatorname: { $regex: new RegExp(query , "i") } },
                { "state.name": { $regex: new RegExp(query , "i") } },
                { "city.name": { $regex: new RegExp(query , "i") } },
              ],
            },
          ],
        })
          .limit(limit)
          .skip(queryIndex);
          searchArray.eventSearch = eventResultSearch;
          res.status(200).json({
            sucessStatus: true,
            data: searchArray,
          });
      }
    }
  } else {
    res.status(200).json({
      sucessStatus: false,
      data: { message: "Error occured bacause Search type not included" },
    });
  }
});

module.exports = router;
