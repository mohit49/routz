const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
require("./db/db");
const { createProxyMiddleware } = require("http-proxy-middleware");

const cors = require("cors");
const https = require("https");

const path = require("path");

const http = require("http").Server(app);
app.use(bodyParser.urlencoded({ extended: false }))

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.method + req.url);
  next();
});

/**
 * Api require Modules Name
 * @type {string}
 */

const registerPage = require("./modules/registration/registration");
app.post("/register", registerPage);

const loginPage = require("./modules/login/login");
app.post("/login", loginPage);

const users = require("./modules/users/users");
app.get("/users", users);
const editprofile = require("./modules/editprofile/editprofile");
app.post("/editprofile", editprofile);

const followers = require("./modules/follow/follow");
app.post("/follow", followers);
const unfollow = require("./modules/follow/unfollow");
app.post("/unfollow", unfollow);
const getProfile = require("./modules/editprofile/fetchprofile");
app.get("/profile", getProfile);
http.listen(3004, function () {
  console.log("listening on *:4000");
});
