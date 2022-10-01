import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sidebar.css";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
//redux
import { getUsers } from "../../../actions/myAccountAction";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  //let idle = "bg-light border border-2 border-dark border-end-0";
  const history = useNavigate();
  const location = useLocation();
  const getLocalData = JSON.parse(localStorage.getItem("us_da_prv"));
  const user = getLocalData ? getLocalData.iduser : null;
  const id = 8;
  const dispatch = useDispatch();
  let [idle, setIdle] = useState("");
  let [down, isdown] = useState("");
  let [down2, isdown2] = useState("");
  let [down3, isdown3] = useState("");
  let [press, setPress] = useState(false);
  let reset = () => {
    isdown("");
    isdown2("");
    isdown3("");
  };
  let getsegment1 = () => {
    let url = window.location.pathname;
    let triming = url.trim();
    let arr = triming.split("/");
    setIdle(arr[2]);
    reset();
    if (idle === "dashboard") {
      isdown("bg-light border border-2 border-dark border-end-0");
    } else if (idle === "tag") {
      isdown2("bg-light border border-2 border-dark border-end-0");
    } else if (idle === "mydashboard") {
      isdown3("bg-light border border-2 border-dark border-end-0");
    } else {
      isdown("bg-light border border-2 border-dark border-end-0");
    }
  };
  useEffect(() => {
    getsegment1();
    window.onpopstate = () => {
      console.log("tes");
    };
    if (press == true) {
      getsegment1();
    }
  });
  return (
    <Container fluid={true}>
      <Row>
        <div className="col-lg-2 col-md-2">
          <nav id="sidebarMenu" className="d-md-block sidebar collapse h-100">
            <div className="position-sticky pt-1">
              <ul className="nav flex-column">
                <li className={`nav-item ${down}`}>
                  <Link
                    className="nav-link active text-decoration-none text-dark"
                    onClick={(e) => {
                      reset();
                      isdown("bg-light border border-2 border-dark border-end-0");
                      // window.location.reload();
                    }}
                    aria-current="page"
                    to="/quans/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className={`nav-item ${down2}`}>
                  <Link
                    className="nav-link active text-decoration-none text-dark"
                    aria-current="page"
                    onClick={(e) => {
                      // addClass();
                      reset();
                      isdown2("bg-light border border-2 border-dark border-end-0");
                    }}
                    to="tag"
                  >
                    Tag
                  </Link>
                </li>
                {user ? (
                  <li className={`nav-item ${down3}`}>
                    <Link
                      className="nav-link active text-decoration-none text-dark"
                      aria-current="page"
                      to="mydashboard"
                      onClick={(e) => {
                        reset();
                        isdown3("bg-light border border-2 border-dark border-end-0");
                      }}
                    >
                      Mydashboard
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                <li className="nav-item d-flex align-items-end">
                  {/* <Card className="me-1 ">
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
              </Card.Body>
            </Card> */}
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <Outlet />
      </Row>
    </Container>
  );
};

export default Sidebar;
