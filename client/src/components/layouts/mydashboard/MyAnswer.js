//top
import React, { useState, useEffect } from "react";
import PaginatedItems from "../../widgets/pagination/PaginatedItems";
import { urlApi } from "../../helpers/Helpers";
import { useSearchParams, useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Select from "react-select";
import List from "../mydashboard/ListAnswer";
import { BsSearch, AiTwotoneDelete, AiTwotoneEdit } from "react-icons/bs";
import ModalAnswerEdit from "./ModalAnswer";
import parse from "html-react-parser";
import Loading from "../../widgets/Loading";
//redux
import { useDispatch, useSelector } from "react-redux";
import { getListMyAnswer, delMyAnswer, updateMyAnswerAction } from "../../../actions/myAnswerAction";
import axios from "axios";

const MyAnswer = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  let items = [];
  const [order, setOrder] = useState("");
  const [options, setOptions] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedOption, setSelectedOption] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [valSearch, setValSearch] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [idQuans, setIdQuans] = useState("");
  const idUser = JSON.parse(localStorage.getItem("us_da_prv"));
  const { getListMyAnswerResult, getListMyAnswerLoading, getListMyAnswerError, statusResponse } = useSelector((state) => state.MyAnswerReducer);
  // const showModalEdit = async (status, idQuans, question) => {};
  const orderOption = [
    {
      value: "terbaru",
      label: "terbaru",
    },
    {
      value: "sesuai",
      label: "sesuai",
    },
  ];

  items = Array.from(getListMyAnswerResult);
  let answer = "";

  useEffect(() => {
    console.log("1. use effect component did mount");
    setSelectedIndex(searchParams.get("orderby") === "sesuai" ? 1 : 0);
    setValSearch(searchParams.get("s") ? searchParams.get("s") : "");
    dispatch(getListMyAnswer(searchParams.get("s") ? searchParams.get("s") : "", idUser.iduser, searchParams.get("orderby") ? searchParams.get("orderby") : "terbaru"));
  }, [location, dispatch]);

  const delAnswer = (idAnswer) => {
    dispatch(delMyAnswer(idAnswer));
    setTimeout(() => {
      console.log(statusResponse);
      searchParams.set("deleteStatus", statusResponse ? "SUCCESS" : "FAILED");
      setSearchParams(searchParams);
    }, 2000);
  };

  const editAnswer = (idAnswer, answer) => {};

  const showModalEdit = (status, idQuans, answer) => {
    setNewAnswer("");
    setIdQuans("");
    setNewAnswer(answer);
    setIdQuans(idQuans);
    setShowEdit(status);
  };

  const submitUpdate = (answer) => {
    console.log(answer);
    dispatch(updateMyAnswerAction(idQuans, answer));
    setSearchParams({
      // s: searchParams.get("s"),
      edit: statusResponse ? "SUCCESS" : "FAILED",
    });
    setShowEdit(false);
  };

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

                <List key={item.id} id={item.id} delAnswer={delAnswer} idParent={item.id_parent} quans={item.quans} tag={quans_tag} allTag={options} editModal={showModalEdit} />
              </div>
            );
          })}
      </>
    );
  };

  const orderChange = (e) => {
    setSelectedOption(e.map((val) => val.value));
    // setSelectedOption(e.val.value);
    // setOrder(e.target.value);
    // searchParams.set("orderby", e.target.value);
    // setSearchParams(searchParams);
  };
  const multiSelect = (e) => {
    setSelectedOption(e.value);
    searchParams.set("orderby", e.value);
    setSearchParams(searchParams);
    if (e.value === "terbaru") {
      setSelectedIndex(0);
    } else if (e.value === "sesuai") {
      setSelectedIndex(1);
    }
    console.log(selectedOption);
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
          {/* <Select value={orderOption.filter((obj) => selectedOption.includes(obj.value))} isMulti={false} isClearable onChange={orderChange} options={orderOption} size="md mb-3">
            <option value="terbaru" selected={order === "terbaru" ? "selected" : ""}>
              Terbaru
            </option>
            <option value="sesuai" selected={order === "terbaru" ? "selected" : ""}>
              Paling sesuai
            </option>
          </Select> */}
          <Select value={orderOption[selectedIndex]} isSearchable={false} onChange={multiSelect} defaultValue={orderOption[0]} options={orderOption}></Select>
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
        <Loading />
      ) : (
        <p>{getListMyAnswerError ? getListMyAnswerError : "terjadi kesalahan"}</p>
      )}
      <ModalAnswerEdit
        show={showEdit}
        hide={() => {
          setShowEdit(false);
        }}
        answer={newAnswer}
        submitUpdate={submitUpdate}
      />
    </div>
  );
};

export default MyAnswer;
