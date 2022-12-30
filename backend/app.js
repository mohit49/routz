const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("./db/db");
const { createProxyMiddleware } = require("http-proxy-middleware");

const cors = require("cors");
const https = require("https");

const path = require('path')
app.use('/images', express.static(path.join(__dirname, 'images')))
//const bodyParser = require('body-parser');
const http = require("http").Server(app);

app.use(
  cors({
    origin: "http://82.180.137.231/",
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
//app.use(express.urlencoded({limit: '50mb'}));
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.method + req.url);
  next();
});

/**
 * Api require Modules Name
 * @type {string}
 */
app.use(express.static(__dirname + '/images'));
const registerPage = require("./modules/registration/registration");
app.post("/register", registerPage);

const loginPage = require("./modules/login/login");
app.post("/login", loginPage);

const users = require("./modules/users/users");
app.get("/users", users);
const editprofile = require("./modules/editprofile/editprofile");
app.post("/editprofile", editprofile);

const createevent = require("./modules/createevent/createevent");
app.post("/createevent", createevent);

const viewevent = require("./modules/createevent/fetchEvent");
const searchEvent = require("./modules/createevent/viewEvents");
app.get("/viewevent/search", searchEvent);
app.get("/viewevent/:eventName", viewevent);



const followers = require("./modules/follow/follow");
app.post("/follow", followers);
const unfollow = require("./modules/follow/unfollow");
app.post("/unfollow", unfollow);
const getProfile = require("./modules/editprofile/fetchprofile");
app.get("/profile", getProfile);
const uploadpostImage = require("./modules/uploadImage/uploadImage");
app.post("/uploadpostImage", uploadpostImage);
http.listen(3004, function () {
  console.log("listening on *:4000");
});