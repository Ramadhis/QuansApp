import React, { useState } from "react";
import { Card, Form, Button, Modal, NavDropdown } from "react-bootstrap";

const Profile_card = () => {
  const [show, setShow] = useState(false);
  const [textAr, setTextAr] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <NavDropdown.Item onClick={handleShow}>Profile</NavDropdown.Item>
      {/* <Button className="btn btn-success btn-sm me-1 text-center" style={{ display: "inline-block" }} variant="primary">
        Add Your Answer
      </Button> */}

      <Modal size="md" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card size="md" style={{ maxWidth: "180px", borderRadius: "100%" }} className="mx-auto mb-4 px-1 py-1">
            <Card.Img style={{ borderRadius: "100%" }} variant="top" src="https://via.placeholder.com/100" />
          </Card>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" Disabled />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Job</Form.Label>
              <Form.Control type="text" placeholder="Job" />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile_card;
