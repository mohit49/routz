const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("./db/db");
const { createProxyMiddleware } = require("http-proxy-middleware");
const http = require("http");
const cors = require("cors");
const https = require("https");

const path = require("path");
//const bodyParser = require('body-parser');

const httpProxy = require('http-proxy');

httpProxy.createProxyServer({target:'http://82.180.137.231:8080'}).listen(8000);
app.use(
  cors({
    origin: "http://localhost:8080",
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
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();
}).listen(3001);