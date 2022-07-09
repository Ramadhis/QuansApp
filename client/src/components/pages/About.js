import React, { useState } from "react";
import { Card, Form, Button, Modal, Nav } from "react-bootstrap";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6

const About = (props) => {
  const [show, setShow] = useState(false);
  const [textAr, setTextAr] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Nav.Link onClick={handleShow}>About</Nav.Link>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Body style={{ height: "450px" }}>
          <div className="h-100 col-md-12 d-flex align-content-center justify-content-center flex-wrap">
            <h2 className="mb-5">QUANS PROJECT</h2>
            <div className="px-5">
              Create By Ramadhiansyah 2022 as personal project, this app is open source ,Check my git for source Code by click this <a href="https://github.com/Ramadhis">Link</a>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default About;
