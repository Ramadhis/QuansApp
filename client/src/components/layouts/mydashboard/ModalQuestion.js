import React, { useState, useEffect } from "react";
import { Card, Form, Button, Modal } from "react-bootstrap";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6
import { useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { urlApi } from "../../helpers/Helpers";
//redux
import { useDispatch, useSelector } from "react-redux";
import { addMyQuestion } from "../../../actions/myQuestionAction";

const ModalQuestion = (props) => {
  const [show, setShow] = useState(true);
  const URL = urlApi();
  const [textAr, setTextAr] = useState(props.question ? props.question : "");
  const [textAr2, setTextAr2] = useState("");
  const [searchParams, setSearchParams] = useSearchParams([]);
  const idUser = JSON.parse(localStorage.getItem("us_da_prv"));
  const dispatch = useDispatch();
  const handleClose = () => setShow(props.hide);
  const handleShow = () => setShow(true);
  const [options, setOptions] = useState(props.allTag ? props.allTag : []);
  let loopArrTag = [];
  let arrTag = props.tag;

  // const options = [
  //   { value: "chocolate", label: "Chocolate" },
  //   { value: "strawberry", label: "Strawberry" },
  //   { value: "vanilla", label: "Vanilla" },
  // ];

  const [selectedOption, setSelectedOption] = useState([]);

  let submit = (e) => {
    e.preventDefault();
    props.submitForm(textAr, selectedOption);
    setTextAr("");
  };

  useEffect(() => {
    // console.log("cek");
    setSelectedOption([]);
    setTextAr(props.question);
    setSelectedOption(props.tag ? props.tag : []);
    if (arrTag) {
      arrTag.map((tg) => {
        return loopArrTag.push(`${tg.tag.id}`);
      });
    }
    console.log(loopArrTag);
    setSelectedOption(loopArrTag);
    // console.log(selectedOption);
  }, [props.tag]);

  const hideModal = (bool) => {
    return bool;
  };

  const submitUpdate = (e) => {
    e.preventDefault();
    console.log(props.idQuans);
    props.submitEdit(idUser.iduser, props.idQuans, textAr, selectedOption);
    console.log(selectedOption);
    props.reset();
  };

  const multiSelect = (e) => {
    setSelectedOption(e.map((val) => val.value));
  };

  return (
    <>
      <Modal size="lg" show={props.show} onHide={hideModal(props.hide)}>
        <form onSubmit={props.edit ? submitUpdate : submit}>
          {/* {console.log(props.question)}
          {console.log(props.tag)} */}
          <Modal.Header closeButton>
            <Modal.Title>{props.edit ? "Edit Question" : "Create Question"}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ height: "450px" }}>
            <div className="mt-4">
              <Form.Label>Question*</Form.Label>
              <input type="text" className="form-control" value={textAr} onChange={(e) => setTextAr(e.target.value)} />
            </div>
            <div className="mt-4">
              <Form.Label>Select Tag*</Form.Label>
              <Select value={options.filter((obj) => selectedOption.includes(obj.value))} isMulti={true} isClearable onChange={multiSelect} options={options}></Select>
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
