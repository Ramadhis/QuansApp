import React, { useState, useEffect } from "react";
import { Card, Form, Button, Modal } from "react-bootstrap";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6
import { useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
//redux
import { useDispatch, useSelector } from "react-redux";
import { addMyQuestion } from "../../../actions/myQuestionAction";

const ModalQuestion = (props) => {
  const [show, setShow] = useState(true);
  const [textAr, setTextAr] = useState(props.question ? props.question : "");
  const [textAr2, setTextAr2] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const idUser = JSON.parse(localStorage.getItem("us_da_prv"));
  const dispatch = useDispatch();
  const handleClose = () => setShow(props.hide);
  const handleShow = () => setShow(true);
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedOption, setSelectedOption] = useState(null);

  let submit = (e) => {
    e.preventDefault();
    props.submitForm(textAr);
    setTextAr("");
  };

  useEffect(() => {
    console.log(selectedOption);
  }, []);

  const submitEdit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:5000/quans/editQuestion/", {
        id_user: `${idUser.iduser}`,
        id_quans: `${props.idQuans}`,
        question: `${textAr}`,
      })
      .then((response) => {
        console.log(response.data);
        setShow(false);
        setSearchParams({
          // s: searchParams.get("s"),
          add: response.data.msg,
        });
      })
      .catch((error) => {
        console.log(error.message);
        setSearchParams({
          add: "failed",
        });
      });
  };

  return (
    <>
      <Modal size="lg" show={props.show} onHide={props.hide}>
        <form onSubmit={props.edit ? submitEdit : submit}>
          <Modal.Header closeButton>
            <Modal.Title>Create Question</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ height: "450px" }}>
            <div className="mt-4">
              <Form.Label>Question*</Form.Label>
              <input type="text" className="form-control" value={textAr} onChange={(e) => setTextAr(e.target.value)} />
            </div>
            <div className="mt-4">
              <Select isMulti={true} defaultValue={selectedOption} onChange={setSelectedOption} options={options} />
            </div>
            {/* <div className="mt-4">
              <Form.Label>Tag*</Form.Label>
              <input type="text" className="form-control" value={textAr} onChange={setTextAr} />
            </div> */}
            {props.edit ? (
              ""
            ) : (
              <div className="mt-4">
                <Form.Label>First Answer (Optional)</Form.Label>
                <ReactQuill style={{ height: "120px" }} theme="snow" value={textAr2} onChange={setTextAr2} />
              </div>
            )}

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
            <Button type="submit">Save Changes</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default ModalQuestion;
