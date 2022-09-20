import React, { useState, useEffect } from "react";
import { Card, Form, Button, Modal, NavDropdown } from "react-bootstrap";
//redux
import { getUsers } from "../../actions/myAccountAction";
import { useDispatch, useSelector } from "react-redux";

const Profile_card = () => {
  const [show, setShow] = useState(false);
  const id = 8;
  const dispatch = useDispatch();
  const { getUserResult, getUserLoading, getUserError } = useSelector((state) => state.MyAccountReducer);
  const [textAr, setTextAr] = useState(getUserResult ? getUserResult : {});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const items = Array.from(getUserResult);

  useEffect(() => {
    dispatch(getUsers(id));
    setTextAr(items ? items : {});
  }, [dispatch]);
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
            {getUserResult ? (
              getUserResult.length === 0 ? (
                <div className="text-center" style={{ fontSize: "15px" }}>
                  data yang anda cari tidak ada
                </div>
              ) : (
                console.log(textAr[0]["name"])
              )
            ) : getUserLoading ? (
              <p>loading</p>
            ) : (
              <p>{getUserError ? getUserError : "terjadi kesalahan"}</p>
            )}
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
