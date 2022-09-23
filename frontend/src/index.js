require("file-loader?name=[name].[ext]!./index.html");
import React from "react";
import { App } from "./App";
import "./App.scss";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
const appElement = document.getElementById("app");

ReactDOM.render(
    <BrowserRouter>
    <App />
  </BrowserRouter>
, appElement);
