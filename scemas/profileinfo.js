const mongoose = require("mongoose");

const info = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  bikeinfo: {
    type: String,
    required: true,
  },
  companyinfo: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  followers: {
    type: String,
    required: true,
  },
  likes: {
    type: String,
    required: true,
  },
  kms: {
    type: String,
    required: true,
  },
  profilepic: {
    type: String,
    required: true,
  },
  coverpic: {
    type: String,
    required: true,
  },
});

const Profileinfo = new mongoose.model("Profileinfo", info);
module.exports = Profileinfo;
