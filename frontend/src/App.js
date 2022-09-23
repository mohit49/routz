import React from "react";
import { Routes, Route, Link } from "react-router-dom";
  
import Header from "./includes/Header/Header";
import Login from "./Pages/Login/Login";
export function App() {
  return (
    <>
      {//<Header/>
}
      <Routes>
        <Route path="/" element={<Login />} />
     
      </Routes>
    </>
  );
}
