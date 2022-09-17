const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("./db/db");

const cors = require("cors");
const https = require("https");

const path = require("path");
//const bodyParser = require('body-parser');
const http = require("http").Server(app);

app.use(cors());
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
app.get("/login", loginPage);

const users = require("./modules/users/users");
app.get("/users", users);
const editprofile = require("./modules/editprofile/editprofile");
app.post("/editprofile", editprofile);
http.listen(3001, function () {
  console.log("listening on *:4000");
});
