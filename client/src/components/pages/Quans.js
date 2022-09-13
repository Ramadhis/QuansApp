import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Card, Badge, Button } from "react-bootstrap";
//layout
import QA from "../layouts/quans_layout/QuestionAnswer";
import Rightsidebar from "../widgets/Rightsidebar";
import ModalAnswer from "../layouts/quans_layout/ModalAnswer";
import { useSearchParams, useLocation } from "react-router-dom";
//endlayout
import { BsChatLeftDots } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import { getListQuans } from "../../actions/quansAction";
import { addMyAnswer } from "../../actions/myAnswerAction";
import PaginatedItems from "../widgets/pagination/PaginatedItems";
import parse from "html-react-parser";

const Quans = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { getListQuansResult, getListQuansLoading, getListQuansError, statusResponse } = useSelector((state) => state.QuansReducer);
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let id = params.get("id");
  let countSplice = 0;

  useEffect(() => {
    //call action getListQuans
    console.log("1. use effect component did mount");
    setTimeout(() => {
      dispatch(getListQuans(id));
    }, 2000);
  }, [dispatch, location]);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  //buat judul question/ question pertama
  const quans_arr = Array.from(getListQuansResult);
  let quans_par = "";
  let quans_date = "";
  let quans_tag = [];
  quans_arr.map((q) => {
    if (q.id_parent === 0) {
      quans_par = q.quans;
      const date_q = new Date(q.createdAt);
      quans_date = date_q.getDate() + " " + months[date_q.getMonth()] + " " + date_q.getFullYear();
      q.tag_quans.map((j) => {
        return quans_tag.push(j.tag.name);
      });
    }
  });

  //get data quans
  const items = Array.from(getListQuansResult);
  //delete parent quans
  if (countSplice === 0) {
    items.splice(0, 1);
    countSplice = 1;
  }

  //sort array desc in like_count
  items.sort((a, b) => b["like_count"] - a["like_count"]);
  console.log(items);
  const ItemsLoop = ({ currentItems }) => {
    return (
      <>
        {currentItems &&
          currentItems.map((q, i) => (
            <div className="my-1" key={i}>
              {/* <List /> */}
              {/* <h3>Item #{q.user_name}</h3> */}
              <QA key={q.id} name_creator={q.user_name} answer={parse(q.quans)} count_like={q.like_count} date={q.createdAt} />
            </div>
          ))}
      </>
    );
  };

  const addAnswer = (id, idUser, answer) => {
    dispatch(addMyAnswer(id, idUser, answer));
    searchParams.set("addStatus", statusResponse ? "SUCCESS" : "FAILED");
    setSearchParams(searchParams);
  };
  //--------------------------------------

  console.log(quans_tag);
  return (
    <div className="col-lg-10 mt-5 p-4 g-0 pt-4" style={{ marginTop: `100px` }}>
      <h5 className="g-0">Question</h5>
      <h2>{quans_par}</h2>
      <p style={{ fontSize: "14px" }}>Posted On : {quans_date}</p>

      {quans_tag.map((t, i) => {
        return (
          <Badge key={i} className="me-1" bg="secondary">
            {t}
          </Badge>
        );
      })}

      <hr style={{ color: "#198754", opacity: "0.5" }} />
      <Row>
        <div className="col-lg-12">
          <div className="col-md-9">
            <Row>
              <div className="col-md-3 col-6">
                <h5 className="g-0">Answer</h5>
              </div>
              <div className="col-md-9 col-6 d-flex flex-row-reverse">
                {/* <Button className="btn btn-success btn-sm me-1 text-center" style={{ display: "inline-block" }}>
                  <BsChatLeftDots className="h5 mb-0 me-1" />
                  Add Your Answer
                </Button> */}
                <ModalAnswer id={params.get("id")} addAnswer={addAnswer} />
              </div>
            </Row>
          </div>
        </div>
        <div className="col-lg-9">
          {/* {getListQuansResult ? (
            getListQuansResult.map((q) => {
              const date = new Date(q.createdAt);
              if (q.id_parent !== 0) {
                return <QA key={q.id} name_creator={q.user_name} answer={q.quans} count_like={q.like_count} date={date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()} />;
              }
            })
          ) : getListQuansLoading ? (
            <p>loading</p>
          ) : (
            <p>{getListQuansError ? getListQuansError : "data kosong"}</p>
          )} */}

          {getListQuansResult ? <PaginatedItems itemsPerPage={10} items={items} ItemsLoop={ItemsLoop} /> : getListQuansLoading ? <p>loading</p> : <p>{getListQuansError ? getListQuansError : "data kosong"}</p>}
        </div>
        <Rightsidebar />
      </Row>
    </div>
  );
};

export default Quans;
