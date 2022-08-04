//top
import React, { useState, useEffect } from "react";
import PaginatedItems from "../../widgets/pagination/PaginatedItems";
import { urlApi } from "../../helpers/Helpers";
import { useSearchParams, useLocation } from "react-router-dom";
import { Form, Card } from "react-bootstrap";
import List from "../mydashboard/List";
import { BsSearch, AiTwotoneDelete, AiTwotoneEdit } from "react-icons/bs";
import ModalQuestion from "../mydashboard/ModalQuestion";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getListMyQuestion } from "../../../actions/myQuestionAction";

const MyQuestion = () => {
  //top
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { getListMyQuestionResult, getListMyQuestionLoading, getListMyQuestionError } = useSelector((state) => state.MyQuestionReducer);
  const [valSearch, setValSearch] = useState("");
  const URL = urlApi();
  let items = Array.from(getListMyQuestionResult);

  useEffect(() => {
    console.log("1. use effect component did mount");
    setValSearch(searchParams.get("s") ? searchParams.get("s") : "");
    dispatch(getListMyQuestion(searchParams.get("s") ? searchParams.get("s") : ""));
    // loadAxios(searchParams.get("s") ? searchParams.get("s") : "");
    // loading = loadData.loading;
    // data = loadData.data;
    // error = loadData.error;
  }, [location, dispatch]);

  let ItemsLoop = ({ currentItems }) => {
    return (
      <>
        {currentItems &&
          currentItems.map((item) => {
            let quans_tag = [];
            return (
              <div className={`col-md-12 my-1 dat-${item.id}`} key={item.id}>
                {item.tag_quans.map((j, i) => {
                  return (
                    <div style={{ display: "none" }} key={i}>
                      {quans_tag.push(j.tag.name)}
                    </div>
                  );
                })}
                <List key={item.id} id={item.id} quans={item.quans} tag={quans_tag} />
              </div>
            );
          })}
      </>
    );
  };

  let submitSearch = (e) => {
    e.preventDefault();
    try {
      setSearchParams({
        s: valSearch,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteQuestion = () => {};

  return (
    <div className="col-md-12 mb-2">
      <div className="row">
        <div className="col-md-9 col-7">
          <form onSubmit={submitSearch}>
            <div className="input-group">
              <div className="input-group mb-3">
                <input
                  type="text"
                  value={valSearch}
                  onChange={(e) => {
                    setValSearch(e.target.value);
                  }}
                  className="form-control form-control-md"
                  placeholder="Search Here"
                ></input>
                <button type="submit" className="input-group-text btn-success">
                  <BsSearch />
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-3 col-5">
          <Form.Select size="md mb-3">
            <option>Paling sesuai</option>
            <option>Terbaru</option>
          </Form.Select>
        </div>
        <div className="col-md-12 mb-2">
          <ModalQuestion />
        </div>
        <div className="col-md-12">
          <div className="row">
            {getListMyQuestionResult ? (
              getListMyQuestionResult.length === 0 ? (
                <div className="text-center" style={{ fontSize: "15px" }}>
                  Anda belum membuat pertanyaan
                </div>
              ) : (
                <PaginatedItems itemsPerPage={10} items={items} ItemsLoop={ItemsLoop} />
              )
            ) : getListMyQuestionLoading ? (
              <p>loading</p>
            ) : (
              <p>{getListMyQuestionError ? getListMyQuestionError : "terjadi kesalahan"}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyQuestion;
