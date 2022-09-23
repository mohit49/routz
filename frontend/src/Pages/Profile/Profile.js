import React, { useEffect, useContext } from "react";
import axios from "axios";
import "../Profile/Profile.scss";
import { Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Data } from "../../App";
import Coverpic from "../../uiElements/Coverpic/Coverpic";
const profileFetch =
  process.env.REACT_BASE_API_URL + process.env.REACT_APP_PROFILE_FETCH;
function Profile() {
  let navigate = useNavigate();
  const { loginState, setLoginState } = useContext(Data);
  useEffect(() => {
    axios
      .get(profileFetch, { withCredentials: true })
      .then(function (response) {
        if (!response.data.sucessStatus) {
          console.log(response.data.data);
        }
        if (response.data.data == "loginError") {
          console.log(response.data.data);
          setLoginState(false);
          navigate("/login");
        } else {
          console.log(response.data.data);
          setLoginState(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Coverpic />
    </>
  );
}

export default Profile;
