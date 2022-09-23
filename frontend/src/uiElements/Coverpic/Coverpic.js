import React from "react";
import "../Coverpic/Coverpic.scss";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
function Coverpic() {
  return (
    <>
      <div className="coverPic shadow-sm">
        <div className="coverContent">
          <div className="userProfile">
            <div className="profile-image">
              <img src="https://radiustheme.com/demo/html/cirkle/media/banner/user_1.jpg" />
            </div>
            <div className="profile-name">
              <h4>Mohit Sharma</h4>
              <p>delhi India</p>
            </div>
          </div>
          <div className="user-info">
            <div className="detials">
              <span>Distance : 1500KMS</span>
              <span>Posts : 50</span>
              <span>Friends : 50</span>
            </div>
            <div className="mn-btn">
              <Button variant="primary">Message</Button>
              <Button variant="outline-light">Follow Now</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Coverpic;
