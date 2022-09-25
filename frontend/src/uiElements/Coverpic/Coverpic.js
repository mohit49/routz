import React, { useContext } from "react";
import "../Coverpic/Coverpic.scss";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Data } from "../../App";
import Container from "react-bootstrap/Container";
function Coverpic() {
  const { loginState, setLoginState, profileData, setProfileData } =
    useContext(Data);

  console.log(profileData);
  return (
    <>
      <Container className="coverPic shadow-sm p-0">
        <div className="coverContent">
          <div className="userProfile">
            <div className="profile-image">
              <img src="https://radiustheme.com/demo/html/cirkle/media/banner/user_1.jpg" />
            </div>
            <div className="profile-name">
              <h4>
                {profileData.name} ({profileData.username})
              </h4>
              <p>{profileData.location}</p>
            </div>
          </div>
          <div className="user-info">
            <div className="mn-btn">
              <Button variant="primary">Message</Button>
              <Button variant="outline-light">Follow Now</Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Coverpic;
