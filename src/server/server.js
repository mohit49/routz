
import path from 'path';
import fs from 'fs';

import express, { json } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import App from '../client/App';

import { Helmet } from "react-helmet";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
const webpackMiddleware = require('webpack-dev-middleware');


const appReact = App;

const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("./db/db");
const { createProxyMiddleware } = require("http-proxy-middleware");

const cors = require("cors");
const https = require("https");
const router = express.Router()


const bodyParser = require('body-parser');
const http = require("http").Server(app);

app.use(
  cors({
    origin: "http://localhost:3004",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "500mb" }));
//app.use(express.urlencoded({limit: '50mb'}));
app.use(cookieParser());



// tell the app to use the above rules
app.use(router)

app.use(express.static(__dirname + '/images'));

app.use(express.static('server-build'));

/**
 * Api require Modules Name
 * @type {string}
 */
app.use(express.static(__dirname + '/images'));

app.use('/images', express.static(path.join(__dirname, 'images')))
const registerPage = require("./modules/registration/registration");
app.post("/api/register", registerPage);

const loginPage = require("./modules/login/login");
app.post("/api/login", loginPage);

const users = require("./modules/users/users");
app.get("/api/users", users);
const editprofile = require("./modules/editprofile/editprofile");
app.post("/api/editprofile", editprofile);

const createevent = require("./modules/createevent/createevent");
app.post("/api/createevent", createevent);

const viewevent = require("./modules/createevent/fetchEvent");
const searchEvent = require("./modules/createevent/viewEvents");
app.get("/api/viewevent/search", searchEvent);
app.get("/api/viewevent/:eventName", viewevent);



const followers = require("./modules/follow/follow");
app.post("/api/follow", followers);
const unfollow = require("./modules/follow/unfollow");
app.post("/api/unfollow", unfollow);
const getProfile = require("./modules/editprofile/fetchprofile");
app.get("/api/profile", getProfile);
const viewProfile = require("./modules/editprofile/viewProfile");
app.get("/api/profile/:username", viewProfile);

const posts = require("./modules/posts/fetchPosts");
app.get("/api/posts", posts);


const showrooms = require("./modules/showrooms/searchshowrooms");
app.get("/api/showrooms", showrooms);

const uploadpostImage = require("./modules/uploadImage/uploadImage");
app.post("/api/uploadpostImage", uploadpostImage);
const addPosts = require("./modules/posts/addPosts");
app.post("/api/addPosts", addPosts);

const searchBar = require("./modules/search-bar/search-bar");
app.get("/api/search-bar", searchBar);

app.use('^/*',(req, res) => {
  const app = ReactDOMServer.renderToString(  <StaticRouter location={req.url}>
    <App />
  </StaticRouter>);
   const helmet = Helmet.renderStatic();
  
  const indexFile = path.resolve('public/index.html');
  const html = `
  <!DOCTYPE html>
  <html ${helmet.htmlAttributes.toString()}>
    <head>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
      <link rel="stylesheet" href="main.css"/>
    </head>
    <body ${helmet.bodyAttributes.toString()}>
      <div id="root">
        ${app}
      </div>
      </body>
      <script src="index.min.js"></script>
  </html>
`;
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }
    res.set('content-type','text/html');
    return res.send(data.replace(data , html));
  });
});

// Fallback when no previous route was matched

http.listen(process.env.PORT || 3004, function (req,res) {


  console.log("listening on *:4000");
});