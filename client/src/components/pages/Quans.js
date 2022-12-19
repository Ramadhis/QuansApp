import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Card, Badge, Button } from "react-bootstrap";
import axios from "axios";
//layout
import QA from "../layouts/quans_layout/QuestionAnswer";
import Rightsidebar from "../widgets/Rightsidebar";
import ModalAnswer from "../layouts/quans_layout/ModalAnswer";
import Loading from "../widgets/Loading";
import { useSearchParams, useLocation } from "react-router-dom";
//endlayout
import { BsChatLeftDots } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import { getListQuans } from "../../actions/quansAction";
import { addMyAnswer } from "../../actions/myAnswerAction";
import PaginatedItems from "../widgets/pagination/PaginatedItems";
import { urlApi } from "../helpers/Helpers";
import parse from "html-react-parser";

const Quans = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useSearchParams(false);
  const idUser = localStorage.getItem("us_da_prv") ? JSON.parse(localStorage.getItem("us_da_prv")).iduser : 0;
  const { getListQuansResult, getListQuansLoading, getListQuansError } = useSelector((state) => state.QuansReducer);
  const { getListMyAnswerLoading, statusResponse } = useSelector((state) => state.MyAnswerReducer);

  let search = window.location.search;
  let params = new URLSearchParams(search);
  let id = params.get("id");
  let [arr, setArr] = useState(1);
  let countSplice = 0;
  let quans_par = "";
  let quans_date = "";
  let quans_tag = [];

  const URL = urlApi();
  const items = Array.from(getListQuansResult);

  useEffect(() => {
    //call action getListQuans
    dispatch(getListQuans(id, idUser));
    quans_par = "";
    quans_date = "";
    quans_tag = [];
    console.log(statusResponse);
    // setTimeout(() => {
    //   if (!searchParams.get("page")) {
    //     searchParams.set("page", 1);
    //     // searchParams.set("orderby", "terbaru");
    //     setSearchParams(searchParams);
    //   }
    //   //sort array desc in like_count
    //   // items.sort((a, b) => b["like_count"] - a["like_count"]);
    // }, 1000);
  }, [dispatch, location]);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  //get data quans

  //buat judul question/ question pertama
  const quans_arr = Array.from(getListQuansResult);

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

  // //delete parent quans
  // if (countSplice === 0) {
  //   console.log(`count splice ${countSplice}`);
  items.splice(0, 1);
  countSplice += 1;
  // }

  console.log(items);
  const ItemsLoop = ({ currentItems }) => {
    return (
      <>
        {currentItems &&
          currentItems.map((q, i) => (
            <div className="my-1" key={i}>
              {/* <List /> */}
              {/* <h3>Item #{q.user_name}</h3> */}
              <QA key={q.id} index={i} addLike={addLike} id={q.id} name_creator={q.user_name} image={q.image_profile} answer={parse(q.quans)} count_like={q.like_count} date={q.createdAt} likeCheck={q.likeCheck} />
            </div>
          ))}
      </>
    );
  };

  //like function
  const addLike = async (id, index) => {
    const idUser = JSON.parse(localStorage.getItem("us_da_prv"));
    setArr((prev) => {
      return prev + 1;
    });
    const page = searchParams.get("page");
    console.log(index);
    if (page > 1) {
      index = index + (page - 1) * 10;
    }
    //like

    if (items[index]["likeCheck"] === 0) {
      try {
        items[index]["like_count"] = parseInt(items[index]["like_count"]) + 1;
        items[index]["likeCheck"] = 1;
      } catch (error) {
        return console.log(`${error}, error in array items`);
      }
      console.log(items[index]);
      await axios
        .post(
          URL + "/like/add",
          {
            id_user: idUser.iduser,
            id_quans: id,
          },
          { withCredentials: true }
        )
        .then((res) => {
          return console.log("success liked");
        })
        .catch((error) => {
          return console.log(error);
        });
    } else if (items[index]["likeCheck"] >= 1) {
      try {
        items[index]["like_count"] = parseInt(items[index]["like_count"]) - 1;
        items[index]["likeCheck"] = 0;
      } catch (error) {
        return console.log(`${error}, error in array items`);
      }
      console.log(items[index]);
      //unlike
      await axios
        .delete(URL + "/like/delete", {
          data: {
            id_user: idUser.iduser,
            id_quans: id,
          },
          headers: { withCredentials: true },
        })
        .then((res) => {
          return console.log("success unlike");
        })
        .catch((error) => {
          return console.log(error);
        });
    }
  };

  const addAnswer = (id, idUser, answer) => {
    dispatch(addMyAnswer(id, idUser, answer));
    setTimeout(() => {
      dispatch(getListQuans(id, idUser));
      // searchParams.set("addStatus", statusResponse);
      // setSearchParams(searchParams);
    }, 2000);
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

          {getListQuansResult ? <PaginatedItems itemsPerPage={10} items={items} ItemsLoop={ItemsLoop} /> : getListQuansLoading && getListMyAnswerLoading ? <Loading /> : <p>{getListQuansError ? getListQuansError : "data kosong"}</p>}
        </div>
        <Rightsidebar />
      </Row>
    </div>
  );
};

export default Quans;
