import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6
import { urlApi } from "../../helpers/Helpers";
//redux
import { useDispatch, useSelector } from "react-redux";

import parse from "html-react-parser";

const ModalAnswer = (props) => {
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();

  const handleClose = () => setShow(props.hide);
  const handleShow = () => setShow(true);
  const [textAr, setTextAr] = useState("");

  const hideModal = (bool) => {
    return bool;
  };

  useEffect(() => {
    setTextAr(props.answer);
  }, [props.answer]);

  const submitUpdate = (e) => {
    e.preventDefault();
    props.submitUpdate(textAr);
    setShow(false);
  };

  return (
    <Modal size="lg" show={props.show} onHide={hideModal(props.hide)}>
      <form onSubmit={submitUpdate}>
        {/* {console.log(props.question)}
        {console.log(props.tag)} */}
        <Modal.Header closeButton>
          <Modal.Title>{props.edit ? "Edit Question" : "Create Question"}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "450px" }}>
          <div className="mt-4">
            <Form.Label>Answer*</Form.Label>
            {/* <input type="text" className="form-control" value={textAr} onChange={(e) => setTextAr(e.target.value)} /> */}
            <ReactQuill style={{ height: "120px" }} theme="snow" value={textAr} onChange={setTextAr} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit">Save Changes</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalAnswer;
