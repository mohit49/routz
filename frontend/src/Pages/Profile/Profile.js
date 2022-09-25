import React, { useEffect, useContext } from "react";
import axios from "axios";
import "../Profile/Profile.scss";
import { Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Data } from "../../App";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Coverpic from "../../uiElements/Coverpic/Coverpic";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ProfileData from "../../includes/ProfileData/ProfileData";
const profileFetch =
  process.env.REACT_BASE_API_URL + process.env.REACT_APP_PROFILE_FETCH;
function Profile() {
  let navigate = useNavigate();
  const { loginState, setLoginState, profileData, setProfileData } =
    useContext(Data);
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
          setLoginState(true);
          setProfileData(response.data.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Coverpic />
      <Container className="p-0 mtop">
        <Row>
          <Col md={3}>
            <Card
              className="shadow-sm p-3 mb-5 bg-white rounded"
              border="light"
              style={{ width: "100%" }}
            >
              <Card.Body>
                <Card.Title>About</Card.Title>
                <Card.Text
                  dangerouslySetInnerHTML={{ __html: profileData.about }}
                ></Card.Text>
                <Card.Text>
                  <p>
                    <strong>Bike Info :</strong> {profileData.bikeinfo}
                  </p>
                  <p>
                    <strong>Distance Covered :</strong> {profileData.kms}
                  </p>
                  <p>
                    <strong>Location :</strong> {profileData.ridingsince}
                  </p>
                  <p>
                    <strong>Company :</strong> {profileData.companyinfo}
                  </p>
                </Card.Text>
                <Button variant="primary">Edit Info</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={7}>
            <ProfileData />
          </Col>
          <Col>
            <Card className="shadow-sm  mb-2 bg-white rounded" border="light">
              <Card.Header>Friends</Card.Header>
              <Card.Body>
                <Card.Title> 200 </Card.Title>
              </Card.Body>
            </Card>
            <Card className="shadow-sm  mb-2 bg-white rounded" border="light">
              <Card.Header>Followers</Card.Header>
              <Card.Body>
                <Card.Title> 200 </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Profile;
