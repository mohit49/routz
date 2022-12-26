import React, { useContext, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Data } from "../../App";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function Header() {
  let navigate = useNavigate();
  const profileFetch =
  process.env.REACT_BASE_API_URL + process.env.REACT_APP_PROFILE_FETCH;
  const { loginState, setLoginState, profileData, setProfileData } =
  useContext(Data);
  const [show,setShow] = useState(false);
const [loading, setLoading] = useState();
useEffect(() => {
  setLoading(true);
  axios
    .get(profileFetch, { withCredentials: true })
    .then(function (response) {
      if (!response.data.sucessStatus) {
        setLoading(false);
        console.log(response.data.data);
      }
      if (response.data.data == "loginError") {
        console.log(response.data.data);
       
        setLoading(false);
        setLoginState(false);
        navigate("/login");
      } else {
        console.log(response.data.data)
     
        setLoading(false);
        setLoginState(true);
       
        setProfileData(response.data.data);
       
        
      }
    })
    .catch(function (error) {
      console.log(error);
    });
},[!setLoginState]);
  return (
    <>
   
      {['sm'].map((expand) => (
        <Navbar key={expand}  expand={expand} className="mb-3" bg="dark" variant="dark" sticky="top">
          <Container >
            <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1">Home</Nav.Link>
                  <Nav.Link href="#action1">Search Biker</Nav.Link>
                  <Nav.Link href="#action2">Find Event</Nav.Link>
                  <Nav.Link href="#action2">Find Show Room</Nav.Link>
                 
                  <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Menu</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Button variant="primary" href='/create-events'>Create Event</Button>
                </Nav>
              
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>

  );
}

export default Header;
