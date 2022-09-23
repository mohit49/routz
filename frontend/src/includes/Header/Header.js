import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { Data } from "../../App";
function Header() {
  const { loginState, setLoginState } = useContext(Data);
  return (
    <>
      <Navbar bg="primary" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              {!loginState && (
                <Nav.Link m="5" href="#link">
                  Sing Up
                </Nav.Link>
              )}

              {!loginState && (
                <Button m="5" href="/login" variant="primary">
                  Login
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
