import React, { useState, useEffect } from "react";
import { Card, Form, Button, Modal } from "react-bootstrap";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6
import { useSearchParams, useLocation } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
import { addMyAnswer } from "../../../actions/myAnswerAction";

const ModalAnswer = (props) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [show, setShow] = useState(false);
  const [textAr, setTextAr] = useState("");
  const idUser = JSON.parse(localStorage.getItem("us_da_prv"));
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { getListMyAnswerLoading, statusResponse } = useSelector((state) => state.MyAnswerReducer);

  const addAnswer = (e) => {
    e.preventDefault();
    props.addAnswer(props.id, idUser.iduser, textAr);
    console.log(statusResponse);
    handleClose();
  };

  return (
    <>
      <Button className="btn btn-success btn-sm me-1 text-center" style={{ display: "inline-block" }} variant="primary" onClick={handleShow}>
        Add Your Answer
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Answer</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "200px" }}>
          <ReactQuill style={{ height: "120px" }} theme="snow" value={textAr} onChange={setTextAr} />
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
          <Button variant="primary" onClick={addAnswer}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAnswer;
