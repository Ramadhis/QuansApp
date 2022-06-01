import React, { useState, useEffect } from "react";
import Sidebar from "../widgets/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";

import { Row, Container, Card, Badge } from "react-bootstrap";
import MainContent from ".././layouts/quans_layout/index";
import QA from "../layouts/quans_layout/Question_Answer";

import "bootstrap/dist/css/bootstrap.min.css";
import { getListQuans } from "../../actions/quansAction";
const Quans = () => {
  const dispatch = useDispatch();
  const { getListQuansResult, getListQuansLoading, getListQuansError } = useSelector((state) => state.QuansReducer);
  useEffect(() => {
    //call action getListQuans
    console.log("1. use effect component did mount");
    dispatch(getListQuans());
  }, [dispatch]);

  let [main, setmain] = useState(false);
  let [search, setSearch] = useState(true);

  let arr = [];
  for (var i = 0; i < 10; i++) {
    arr.push(<QA key={i} />);
  }
  return (
    <div className="col-lg-10 mt-5 p-4 g-0 pt-4" style={{ marginTop: `100px` }}>
      <h5 className="g-0">Question</h5>
      <h2>Apa itu Javascript?</h2>
      <p style={{ fontSize: "14px" }}>Posted On : 20 May 2022</p>
      <Badge className="me-1" bg="secondary">
        Javascript
      </Badge>
      <Badge className="mx-1" bg="secondary">
        PHP
      </Badge>
      <Badge className="mx-1" bg="secondary">
        JSON
      </Badge>
      <hr />
      <Row>
        <div className="col-lg-12">
          <h5 className="g-0">Answer</h5>
        </div>
        <div className="col-lg-9">
          {arr.map((item, i) => {
            return item;
          })}
        </div>
        <div className="col-lg-3">
          <h5>Related</h5>
          <Card>
            <Card.Body>
              <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        </div>
      </Row>
      {/* {console.log(getListQuansResult)};
          {getListQuansResult ? (
            getListQuansResult.map((quans) => {
              return <p key={quans.id}>{quans.quans}asdasd</p>;
            })
          ) : getListQuansLoading ? (
            <p>loading</p>
          ) : (
            <p>{getListQuansError ? getListQuansError : "data kosong"}</p>
          )} */}
    </div>
  );
};

export default Quans;
