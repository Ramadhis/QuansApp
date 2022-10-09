//top
import React, { useState, useEffect } from "react";
import PaginatedItems from "../../widgets/pagination/PaginatedItems";
import { urlApi } from "../../helpers/Helpers";
import { useSearchParams, useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import List from "../mydashboard/List";
import Select from "react-select";
import { BsSearch, AiTwotoneDelete, AiTwotoneEdit } from "react-icons/bs";
import ModalQuestion from "../mydashboard/ModalQuestion";
import ModalEditQuestion from "../mydashboard/ModalQuestion";
import Loading from "../../widgets/Loading";
//redux
import { useDispatch, useSelector } from "react-redux";
import { getListMyQuestion } from "../../../actions/myQuestionAction";
import axios from "axios";

const MyQuestion = () => {
  //top
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  let items = [];
  const [show, setShow] = useState(false);
  const [order, setOrder] = useState("");
  const [selectedOption, setSelectedOption] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showEdit, setShowEdit] = useState(false);
  let [tagEdit, setTagEdit] = useState([]);
  const { getListMyQuestionResult, getListMyQuestionLoading, getListMyQuestionError } = useSelector((state) => state.MyQuestionReducer);
  const [valSearch, setValSearch] = useState("");
  const idUser = JSON.parse(localStorage.getItem("us_da_prv"));
  const URL = urlApi();
  items = Array.from(getListMyQuestionResult);
  const [options, setOptions] = useState([]);
  const [quansName, setQuans] = useState("");
  const [quansId, setQuansId] = useState(0);
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

  let asd = [];
  let loadTag = () => {
    if (options.length === 0) {
      axios
        .post(URL + "/tag", {
          s: "",
        })
        .then((result) => {
          result.data.map((tag) => {
            options.push({ value: `${tag.id}`, label: tag.name });
          });
        });
    }
  };

  useEffect(() => {
    console.log("1. use effect component did mount");
    setSelectedIndex(searchParams.get("orderby") === "sesuai" ? 1 : 0);
    setValSearch(searchParams.get("s") ? searchParams.get("s") : "");
    dispatch(getListMyQuestion(searchParams.get("s") ? searchParams.get("s") : "", idUser.iduser, searchParams.get("orderby") ? searchParams.get("orderby") : "terbaru"));
    loadTag();
    setTagEdit([]);
  }, [location, dispatch]);

  const showModalEdit = async (status, idQuans, question) => {
    setTagEdit([]);
    setQuans("");
    setQuans(question);
    setQuansId(idQuans);
    // console.log(quansName);
    if (asd.length === 0) {
      asd = await axios
        .get(URL + `/tag/quansTag/?idQuestion=${idQuans}`)
        .then((result) => {
          let tag = result.data;

          return Array.from(tag);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("kosong");
      asd = [];
    }
    setTagEdit(asd);
    asd = [];
    setShowEdit(status);
  };

  const closeModalEdit = () => {
    setShowEdit(false);
  };
  const resetForModal = () => {
    console.log("reset");
    asd = [];
    closeModalEdit();
    setTagEdit([]);
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
                <List key={item.id} id={item.id} quans={item.quans} tag={quans_tag} allTag={options} editModal={showModalEdit} />
              </div>
            );
          })}
      </>
    );
  };

  let submitSearch = (e) => {
    e.preventDefault();
    try {
      searchParams.set("s", valSearch);
      setSearchParams(searchParams);
    } catch (error) {
      console.log(error);
    }
  };

  const submitAdd = (question, tag) => {
    axios
      .post("http://localhost:5000/quans/addQuestion/", {
        id_user: `${idUser.iduser}`,
        question: `${question}`,
        tag: `${tag}`,
      })
      .then((response) => {
        // console.log(response.data);
        setShow(false);
        searchParams.set("add", "success");
        setSearchParams(searchParams);
        // window.location.reload();
      })
      .catch((error) => {
        console.log(error.message);
        searchParams.set("add", "failed");
        setSearchParams(searchParams);
      });

    // dispatch(addMyQuestion(idUser.iduser, textAr));
  };

  const submitEdit = (idUser, idQuans, question, tags) => {
    axios
      .put(
        URL + "/quans/editQuestion/",
        {
          id_user: `${idUser}`,
          id_quans: `${idQuans}`,
          question: `${question}`,
          tag: `${tags}`,
        },
        { withCredentials: true }
      )
      .then((response) => {
        // console.log(response.data);
        searchParams.set("edit", response.data.msg);
        setSearchParams(searchParams);
      })
      .catch((error) => {
        console.log(error.message);
        searchParams.set("edit", "failed");
        setSearchParams(searchParams);
      });
  };

  const orderChange = (e) => {
    e.preventDefault();
    setOrder(e.target.value);
    searchParams.set("orderby", e.target.value);
    setSearchParams(searchParams);
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
      {/* {console.log(tagEdit)} */}
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
          {/* <Form.Select onChange={orderChange} size="md mb-3" defaultValue={"terbaru"}>
            <option value="terbaru" selected={order === "terbaru" ? "selected" : ""}>
              Terbaru
            </option>
            <option value="sesuai" selected={order === "terbaru" ? "selected" : ""}>
              Paling sesuai
            </option>
          </Form.Select> */}
          <Select value={orderOption[selectedIndex]} isSearchable={false} onChange={multiSelect} defaultValue={orderOption[0]} options={orderOption}></Select>
        </div>
        <div className="col-md-12 mb-2">
          <Button
            className="btn btn-success btn-sm me-1 text-center"
            style={{ float: "right", display: "inline-block" }}
            variant="primary"
            onClick={() => {
              setShow(true);
            }}
          >
            Add Your Question
          </Button>
          <ModalQuestion
            show={show}
            hide={() => {
              setShow(false);
            }}
            allTag={options}
            submitForm={submitAdd}
          />
          <ModalEditQuestion
            show={showEdit}
            hide={() => {
              setShowEdit(false);
            }}
            reset={resetForModal}
            edit={true}
            idQuans={quansId}
            question={quansName}
            tag={tagEdit}
            submitEdit={submitEdit}
            allTag={options}
          />
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
              <Loading />
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
