import React, { useState, createContext } from "react";
import { Routes, Route, Link } from "react-router-dom";

import Header from "./includes/Header/Header";
import Login from "./Pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./Pages/Profile/Profile";
export const Data = createContext();
export function App() {
  const [loginState, setLoginState] = useState(false);
  const [profileData, setProfileData] = useState(false);
  const webStore = {
    setLoginState,
    loginState,
    setProfileData,
    profileData,
  };
  return (
    <Data.Provider value={webStore}>
      {loginState && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Data.Provider>
  );
}
