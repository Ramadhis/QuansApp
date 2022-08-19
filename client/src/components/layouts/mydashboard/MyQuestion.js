//top
import React, { useState, useEffect } from "react";
import PaginatedItems from "../../widgets/pagination/PaginatedItems";
import { urlApi } from "../../helpers/Helpers";
import { useSearchParams, useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import List from "../mydashboard/List";
import { BsSearch, AiTwotoneDelete, AiTwotoneEdit } from "react-icons/bs";
import ModalQuestion from "../mydashboard/ModalQuestion";
import ModalEditQuestion from "../mydashboard/ModalQuestion";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getListMyQuestion } from "../../../actions/myQuestionAction";
import axios from "axios";

const MyQuestion = () => {
  //top
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  let [tagEdit, setTagEdit] = useState([]);
  const { getListMyQuestionResult, getListMyQuestionLoading, getListMyQuestionError } = useSelector((state) => state.MyQuestionReducer);
  const [valSearch, setValSearch] = useState("");
  const idUser = JSON.parse(localStorage.getItem("us_da_prv"));
  const URL = urlApi();
  let items = Array.from(getListMyQuestionResult);
  const [options, setOptions] = useState([]);
  const [quansName, setQuans] = useState("");

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
    setValSearch(searchParams.get("s") ? searchParams.get("s") : "");
    dispatch(getListMyQuestion(searchParams.get("s") ? searchParams.get("s") : "", idUser.iduser));
    loadTag();
    setTagEdit([]);
    // loadAxios(searchParams.get("s") ? searchParams.get("s") : "");
    // loading = loadData.loading;
    // data = loadData.data;
    // error = loadData.error;
  }, [location, dispatch]);

  const showModalEdit = async (status, idQuans, question) => {
    setTagEdit([]);
    setQuans("");
    setQuans(question);
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
      setSearchParams({
        s: valSearch,
      });
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
        setSearchParams({
          // s: searchParams.get("s"),
          add: "success",
        });
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.message);
        setSearchParams({
          add: "failed",
        });
      });

    // dispatch(addMyQuestion(idUser.iduser, textAr));
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
          <Form.Select size="md mb-3">
            <option>Paling sesuai</option>
            <option>Terbaru</option>
          </Form.Select>
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
            question={quansName}
            tag={tagEdit}
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
