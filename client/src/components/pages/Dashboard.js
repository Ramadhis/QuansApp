import React, { useState, useEffect } from "react";
import axios from "axios";
import Rightsidebar from "../widgets/Rightsidebar";
import { Form } from "react-bootstrap";
import List from "../layouts/dashboard/List";
import { BsSearch } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import PaginatedItems from "../widgets/pagination/PaginatedItems";
import { urlApi } from "../helpers/Helpers";
import { useSearchParams, useLocation } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
import { getListSearch } from "../../actions/searchAction";

const Dashboard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  //get query parameter
  const [searchParams, setSearchParams] = useSearchParams();
  const [order, setOrder] = useState("");
  const { getListSearchResult, getListSearchLoading, getListSearchError } = useSelector((state) => state.SearchReducer);
  const idUser = JSON.parse(localStorage.getItem("us_da_prv"));
  const [valSearch, setValSearch] = useState("");
  let [arr, setArr] = useState(1);
  const items = Array.from(getListSearchResult);
  const URL = urlApi();
  //
  let quans_tag = [];
  // useEffect(() => {
  //   //call action getListQuans
  //   console.log("1. use effect component did mount");

  //   // let search = window.location.search;
  //   // let params = new URLSearchParams(search);
  //   // let id = params.get("id");
  //   dispatch(getListSearch(valSearch));
  // }, [dispatch]);

  useEffect(() => {
    console.log("1. use effect component did mount");
    setValSearch(searchParams.get("s") ? searchParams.get("s") : "");
    dispatch(getListSearch(searchParams.get("s") ? searchParams.get("s") : "", idUser ? idUser.iduser : null, order ? order : "terbaru"));
    setTimeout(() => {
      if (!searchParams.get("page")) {
        searchParams.set("page", 1);
        searchParams.set("orderby", "terbaru");
        setSearchParams(searchParams);
      }
    }, 1000);
  }, [location, dispatch]);

  const ItemsLoop = ({ currentItems }) => {
    return (
      <>
        {currentItems &&
          currentItems.map((item, key) => {
            quans_tag = [];
            return (
              <div className={`my-1 dat-${key}`} key={key}>
                {/* <List /> */}
                {/* <h3>Item #{item.quans}</h3> */}
                {item.tag_quans.map((j, i) => {
                  return (
                    <div style={{ display: "none" }} key={i}>
                      {quans_tag.push(j.tag.name)}
                    </div>
                  );
                })}
                <List index={key} addLike={addLike} id={item.id} question={item.quans} likeCount={item.like_count} tag={quans_tag} likeCheck={item.likeCheck} />
              </div>
            );
          })}
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
    if (page > 1) {
      index = index + (page - 1) * 10;
    }
    // console.log(index);
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

  let submitSearch = async (e) => {
    e.preventDefault();
    // setSearchParams({
    //   s: valSearch,
    // });
    searchParams.set("s", valSearch);
    setSearchParams(searchParams);
  };

  const orderChange = (e) => {
    e.preventDefault();
    setOrder(e.target.value);
    searchParams.set("orderby", e.target.value);
    setSearchParams(searchParams);
    // setSearchParams({
    //   // s: searchParams.get("s"),
    //   orderby: e.target.value,
    // });
  };

  return (
    <div className="col-lg-10 mt-5 p-4 g-0 pt-4" style={{ marginTop: `100px` }}>
      {/* {arr} */}
      <div className="row">
        <div className="col-lg-9 mt-2">
          <div className="input-group">
            <form onSubmit={submitSearch} className="w-100">
              <div className="input-group mb-3">
                <input
                  type="search"
                  className="form-control form-control-md"
                  value={valSearch}
                  onChange={(e) => {
                    setValSearch(e.target.value);
                  }}
                  placeholder="Search Here"
                ></input>
                <button type="submit" className="input-group-text btn-success">
                  <BsSearch />
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-12 mb-2">
            <div className="row">
              <div className="col-md-9 col-7">
                <div style={{ fontSize: "15px" }}>menampilkan total {items ? items.length : "0"} hasil pencarian</div>
              </div>
              <div className="col-md-3 col-5">
                <Form.Select onChange={orderChange} size="sm mb-3">
                  <option value="terbaru">Terbaru</option>
                  <option value="sesuai">Paling sesuai</option>
                </Form.Select>
              </div>
            </div>
          </div>
          {getListSearchResult ? (
            getListSearchResult.length === 0 ? (
              <div className="text-center" style={{ fontSize: "15px" }}>
                data yang anda cari tidak ada
              </div>
            ) : (
              <PaginatedItems itemsPerPage={10} items={items} ItemsLoop={ItemsLoop} />
            )
          ) : getListSearchLoading ? (
            <p>loading</p>
          ) : (
            <p>{getListSearchError ? getListSearchError : "terjadi kesalahan"}</p>
          )}
          {/* <PaginatedItems itemsPerPage={10} items={items} ItemsLoop={ItemsLoop} initPage={2} /> */}
        </div>
        <Rightsidebar />
      </div>
    </div>
  );
};

export default Dashboard;
