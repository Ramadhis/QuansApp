import React from "react";
import { Nav, Container, Navbar, NavDropdown } from "react-bootstrap";

const header = () => {
  return (
    <Navbar className="position-fixed w-100" style={{ zIndex: "100" }} collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid={true}>
        <Navbar.Brand href="#home">Quans</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Home</Nav.Link>
            <Nav.Link href="#pricing">About</Nav.Link>
          </Nav>
          <Nav>
            {/* <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link> */}
            <NavDropdown title="Ramadhiansyah" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">My Question</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">My Answer</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default header;
