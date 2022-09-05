//top
import React, { useState, useEffect } from "react";
import PaginatedItems from "../../widgets/pagination/PaginatedItems";
import { urlApi } from "../../helpers/Helpers";
import { useSearchParams, useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import List from "../mydashboard/ListAnswer";
import { BsSearch, AiTwotoneDelete, AiTwotoneEdit } from "react-icons/bs";
import ModalQuestion from "../mydashboard/ModalQuestion";
import ModalEditQuestion from "../mydashboard/ModalQuestion";
import parse from "html-react-parser";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getListMyAnswer } from "../../../actions/myAnswerAction";
import axios from "axios";

const MyAnswer = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [valSearch, setValSearch] = useState("");
  const idUser = JSON.parse(localStorage.getItem("us_da_prv"));
  const { getListMyAnswerResult, getListMyAnswerLoading, getListMyAnswerError } = useSelector((state) => state.MyAnswerReducer);
  let items = Array.from(getListMyAnswerResult);
  const showModalEdit = async (status, idQuans, question) => {};
  let answer = "";

  useEffect(() => {
    console.log("1. use effect component did mount");
    setValSearch(searchParams.get("s") ? searchParams.get("s") : "");
    dispatch(getListMyAnswer(searchParams.get("s") ? searchParams.get("s") : "", idUser.iduser));
    // loadTag();
    // setTagEdit([]);
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
                      {quans_tag.push({ id: j.tag.id, name: j.tag.name })}
                    </div>
                  );
                })}

                <List key={item.id} id={item.id} idParent={item.id_parent} quans={parse(item.quans)} tag={quans_tag} allTag={options} editModal={showModalEdit} />
              </div>
            );
          })}
      </>
    );
  };

  return (
    <div className="col-md-12 mb-2">
      <div className="row">
        <div className="col-md-9 col-7">
          <div className="input-group">
            <div className="input-group mb-3">
              <input type="text" className="form-control form-control-md" placeholder="Search Here"></input>
              <button type="submit" className="input-group-text btn-success">
                <BsSearch />
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-5">
          <Form.Select size="md mb-3">
            <option>Paling sesuai</option>
            <option>Terbaru</option>
          </Form.Select>
        </div>
      </div>
      {getListMyAnswerResult ? (
        getListMyAnswerResult.length === 0 ? (
          <div className="text-center" style={{ fontSize: "15px" }}>
            Anda belum membuat pertanyaan
          </div>
        ) : (
          <PaginatedItems itemsPerPage={10} items={items} ItemsLoop={ItemsLoop} />
        )
      ) : getListMyAnswerLoading ? (
        <p>loading</p>
      ) : (
        <p>{getListMyAnswerError ? getListMyAnswerError : "terjadi kesalahan"}</p>
      )}
    </div>
  );
};

export default MyAnswer;
