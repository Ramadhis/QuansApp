import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./universal.css";
const Register = () => {
  return (
    <div>
      <Container fluid={true}>
        <Row className="h-100">
          <Col md={6} className="h-100">
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
              <Col md={8} xs={12}>
                <h2 className="mb-3">Register</h2>
                <Form>
                  <Form.Group className="mb-2" controlId="formGroupEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" />
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="formGroupPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  <Button style={{ width: "100%" }} variant="dark" type="submit">
                    Submit
                  </Button>
                </Form>
              </Col>
            </div>
          </Col>
          <Col md={6} className="bg-dark">
            <div style={{ display: "flex", alignItems: "center", height: "100vh" }}>
              <div className="m-4">
                <h2 style={{ color: "white" }}>Quans App</h2>
                <h4 style={{ color: "white" }}>Join Now, we will help find solution for your question</h4>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
