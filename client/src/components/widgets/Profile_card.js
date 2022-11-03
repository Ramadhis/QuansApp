import React, { useState, useEffect } from "react";
import { Card, Form, Button, Modal, NavDropdown } from "react-bootstrap";
//redux
import { getUsers, updateUsers } from "../../actions/myAccountAction";
import { useDispatch, useSelector } from "react-redux";

const Profile_card = () => {
  const [show, setShow] = useState(false);
  const [showImage, setShowImage] = useState();
  const [getImage, setGetImage] = useState();

  const id = JSON.parse(localStorage.getItem("us_da_prv"));
  const dispatch = useDispatch();
  const { getUserResult, getUserLoading, getUserError } = useSelector((state) => state.MyAccountReducer);
  const [textAr, setTextAr] = useState({ name: "-", job: "-", email: "-", image: "https://via.placeholder.com/100" });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const items = Array.from(getUserResult);

  useEffect(() => {
    // console.log(items[0]["name"]);
    // setTextAr((prevState) => ({ ...prevState, name: getUserResult[0]["name"], jobs: getUserResult[0]["job"], email: getUserResult[0]["job"] }));
    console.log(items);
    textAr.name = items[0]["name"];
    textAr.job = items[0]["job"];
    textAr.email = items[0]["email"];
  }, [dispatch]);

  const updateProfile = (e) => {
    e.preventDefault();
    let fd = new FormData();
    fd.append("id", id.iduser);
    fd.append("name", textAr.name);
    fd.append("email", textAr.email);
    fd.append("job", textAr.job);
    fd.append("image", showImage);

    console.log(fd);
    // dispatch(updateUsers(id.iduser, textAr.name, textAr.email, textAr.job, fd));
    dispatch(updateUsers(fd));
  };
  return (
    <>
      <NavDropdown.Item onClick={handleShow}>Profile</NavDropdown.Item>
      {/* <Button className="btn btn-success btn-sm me-1 text-center" style={{ display: "inline-block" }} variant="primary">
        Add Your Answer
      </Button> */}

      <Modal size="md" show={show} onHide={handleClose}>
        <Form onSubmit={updateProfile}>
          <Modal.Header closeButton>
            <Modal.Title>Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col-md-12 d-flex justify-content-center">
              <div className="col-md-5">
                <Card size="md" style={{ maxWidth: "180px", borderRadius: "100%", objectFit: "cover" }} className="mx-auto mb-4 px-1 py-1">
                  <Card.Img style={{ borderRadius: "100%", objectFit: "cover" }} variant="top" src={textAr.image} />
                </Card>
                <Form.Control
                  type="file"
                  onChange={(e) =>
                    setTextAr((prev) => {
                      let getFile = e.target.files[0];
                      let toURL = URL.createObjectURL(getFile);
                      setShowImage(getFile);
                      console.log(showImage);
                      return { ...prev, image: toURL };
                    })
                  }
                ></Form.Control>
              </div>
            </div>

            {getUserResult ? (
              getUserResult.length === 0 ? (
                <div className="text-center" style={{ fontSize: "15px" }}>
                  data yang anda cari tidak ada
                </div>
              ) : (
                console.log(setTextAr.name)
              )
            ) : getUserLoading ? (
              <p>loading</p>
            ) : (
              <p>{getUserError ? getUserError : "terjadi kesalahan"}</p>
            )}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={textAr.name}
                onChange={(e) =>
                  setTextAr((prev) => {
                    return { ...prev, name: e.target.value };
                  })
                }
                placeholder="name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={textAr.email}
                onChange={(e) =>
                  setTextAr((prev) => {
                    return { ...prev, email: e.target.value };
                  })
                }
                placeholder="name@example.com"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Job</Form.Label>
              <Form.Control
                type="text"
                value={textAr.job}
                onChange={(e) =>
                  setTextAr((prev) => {
                    return { ...prev, job: e.target.value };
                  })
                }
                placeholder="Job"
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Profile_card;
