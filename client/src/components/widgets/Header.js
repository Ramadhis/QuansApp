import React, { useState, useEffect } from "react";
import { Nav, Container, Navbar, NavDropdown, Button } from "react-bootstrap";
import { urlApi } from "../helpers/Helpers";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Profile_card from "./Profile_card";
import About from "../pages/About";
//redux
import { getUsers } from "../../actions/myAccountAction";
import { useDispatch, useSelector } from "react-redux";
const Header = () => {
  const URL = urlApi();
  const id = localStorage.getItem("us_da_prv") ? JSON.parse(localStorage.getItem("us_da_prv")) : 0;
  const history = useNavigate();
  const dispatch = useDispatch();
  let [name, setName] = useState("-");
  useEffect(() => {
    dispatch(getUsers(id.iduser));
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
      history("/quans/dashboard", { replace: true });
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
          {localStorage.getItem("us_da_prv") ? (
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
          ) : (
            <div>
              <Link to="/login">
                <Button variant="outline-info fw-bold" className=" me-2" size="sm">
                  Log in
                </Button>
              </Link>
              <Link to="/register">
                <Button className="btn btn-primary me-2 fw-bold" size="sm">
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
