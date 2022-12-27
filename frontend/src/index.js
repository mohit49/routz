require("file-loader?name=[name].[ext]!./index.html");
import React from "react";
import { App } from "./App";
import "./App.scss";


import ReactDOM from "react-dom/client";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    
    <App />

  </React.StrictMode>
);

