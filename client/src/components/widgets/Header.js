import React, { useState, useEffect } from "react";
import { Nav, Container, Navbar, NavDropdown } from "react-bootstrap";
import { urlApi } from "../helpers/Helpers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Profile_card from "./Profile_card";
import About from "../pages/About";
const Header = () => {
  const URL = urlApi();
  const history = useNavigate();
  let [name, setName] = useState("-");
  useEffect(() => {
    try {
      setName(JSON.parse(localStorage.getItem("us_da_prv")).name);
    } catch (error) {
      setName("error");
    }
  });

  let logout = async () => {
    try {
      localStorage.clear();
      await axios.delete(URL + "/user/logout");
      history("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Navbar className="position-fixed w-100" style={{ zIndex: "100" }} collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid={true}>
        <Navbar.Brand href="/quans/dashboard">Quans</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <About />
          </Nav>
          <Nav>
            {/* <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link> */}
            <NavDropdown title={name} id="collasible-nav-dropdown" align="end">
              {/* <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item> */}
              <Profile_card />
              {/* <NavDropdown.Item href="#action/3.2">My Question</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">My Answer</NavDropdown.Item> */}
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
