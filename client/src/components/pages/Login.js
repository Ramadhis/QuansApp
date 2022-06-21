import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { urlApi } from "../helpers/Helpers";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Login = () => {
  const URL = urlApi();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const history = useNavigate();
  let alert_dat = (
    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
      <Alert.Heading>Terjadi kesalahan!</Alert.Heading>
      <p>{msg}</p>
    </Alert>
  );

  const login_user = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          URL + "/user/login",
          {
            email: email,
            password: pass,
          },
          { withCredentials: true }
        )
        .then((res) => {
          //delete all user data from local storage
          localStorage.clear();

          let token = res.data.token;
          let deco = jwt_decode(token);
          let { name, iduser, email } = deco;
          let user_dat = { name, iduser, email };
          localStorage.setItem("us_da_prv", JSON.stringify(user_dat));
          console.log(localStorage.getItem("us_da_prv"));
          history("/quans/", { replace: true });
        });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
        setShow(true);
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <Container fluid={true}>
        <Row className="h-100">
          <Col md={6} className="h-100">
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
              <Col md={8} xs={12}>
                <h2 className="mb-3">Login</h2>
                <div>{show ? alert_dat : ""}</div>
                <Form onSubmit={login_user}>
                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      type="email"
                      placeholder="Enter email"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      value={pass}
                      onChange={(e) => {
                        setPass(e.target.value);
                      }}
                      type="password"
                      placeholder="Password"
                    />
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
                <h4 style={{ color: "white" }}>Our Jobs to find solution for your question</h4>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
