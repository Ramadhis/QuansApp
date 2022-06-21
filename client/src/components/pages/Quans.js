import React, { useState, useEffect } from "react";
import Sidebar from "../widgets/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";

import { Row, Container, Card, Badge, Button } from "react-bootstrap";
import MainContent from ".././layouts/quans_layout/index";
import QA from "../layouts/quans_layout/Question_Answer";
import { BsHandThumbsUp, BsChatLeftDots } from "react-icons/bs";

import "bootstrap/dist/css/bootstrap.min.css";
import { getListQuans } from "../../actions/quansAction";

const Quans = () => {
  const dispatch = useDispatch();
  const { getListQuansResult, getListQuansLoading, getListQuansError } = useSelector((state) => state.QuansReducer);
  useEffect(() => {
    //call action getListQuans
    console.log("1. use effect component did mount");

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let id = params.get("id");

    dispatch(getListQuans(id));
  }, [dispatch]);

  let [main, setmain] = useState(false);
  let [search, setSearch] = useState(true);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  //buat judul question/ question pertama
  const quans_arr = Array.from(getListQuansResult);
  let quans_par = "";
  let quans_date = "";
  let quans_tag = [];
  quans_arr.map((q) => {
    if (q.id_parent == 0) {
      quans_par = q.quans;
      const date_q = new Date(q.createdAt);
      quans_date = date_q.getDate() + " " + months[date_q.getMonth()] + " " + date_q.getFullYear();
      q.tag_quans.map((j) => {
        quans_tag.push(j.tag.name);
      });
    }
  });
  //--------------------------------------
  console.log(quans_tag);
  return (
    <div className="col-lg-10 mt-5 p-4 g-0 pt-4" style={{ marginTop: `100px` }}>
      <h5 className="g-0">Question</h5>
      <h2>{quans_par}</h2>
      <p style={{ fontSize: "14px" }}>Posted On : {quans_date}</p>

      {quans_tag.map((t) => {
        return (
          <Badge className="me-1" bg="secondary">
            {t}
          </Badge>
        );
      })}

      <hr />
      <Row>
        <div className="col-lg-12">
          <div className="col-md-9">
            <Row>
              <div className="col-md-3 col-6">
                <h5 className="g-0">Answer</h5>
              </div>
              <div className="col-md-9 col-6 d-flex flex-row-reverse">
                <Button className="btn btn-success btn-sm me-1 text-center" style={{ display: "inline-block" }}>
                  <BsChatLeftDots className="h5 mb-0 me-1" />
                  Add Your Answer
                </Button>
              </div>
            </Row>
          </div>
        </div>
        <div className="col-lg-9">
          {/* {arr.map((item, i) => {
            return item;
          })} */}
          {getListQuansResult ? (
            getListQuansResult.map((q) => {
              const date = new Date(q.createdAt);
              if (q.id_parent != 0) {
                return <QA key={q.id} name_creator={q.user_name} answer={q.quans} count_like={q.like_count} date={date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()} />;
              }
            })
          ) : getListQuansLoading ? (
            <p>loading</p>
          ) : (
            <p>{getListQuansError ? getListQuansError : "data kosong"}</p>
          )}
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
      {/* {console.log(getListQuansResult)} */}
    </div>
  );
};

export default Quans;
