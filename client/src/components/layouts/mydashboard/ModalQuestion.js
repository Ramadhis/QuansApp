import React, { useState } from "react";
import { Card, Form, Button, Modal } from "react-bootstrap";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6

const ModalQuestion = (props) => {
  const [show, setShow] = useState(false);
  const [textAr, setTextAr] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="btn btn-success btn-sm me-1 text-center" style={{ float: "right", display: "inline-block" }} variant="primary" onClick={handleShow}>
        Add Your Question
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Question</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "450px" }}>
          <div className="mt-4">
            <Form.Label>Question*</Form.Label>
            <ReactQuill style={{ height: "120px" }} theme="snow" value={textAr} onChange={setTextAr} />
          </div>
          <div className="mt-5">
            <Form.Label>First Answer (Optional)</Form.Label>
            <ReactQuill style={{ height: "120px" }} theme="snow" value={textAr} onChange={setTextAr} />
          </div>
          {/* <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form> */}
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

export default ModalQuestion;
