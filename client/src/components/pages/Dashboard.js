import React, { useState, useEffect } from "react";
import Rightsidebar from "../widgets/Rightsidebar";
import { Card, Form } from "react-bootstrap";
import List from "../layouts/dashboard/List";
import { BsSearch } from "react-icons/bs";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PaginatedItems from "../widgets/pagination/PaginatedItems";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getListSearch } from "../../actions/searchAction";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { getListSearchResult, getListSearchLoading, getListSearchError } = useSelector((state) => state.SearchReducer);
  const [valSearch, setValSearch] = useState("");
  let quans_tag = [];

  useEffect(() => {
    //call action getListQuans
    console.log("1. use effect component did mount");

    // let search = window.location.search;
    // let params = new URLSearchParams(search);
    // let id = params.get("id");
    submitSearch();
  }, [dispatch]);

  const items = Array.from(getListSearchResult);

  const ItemsLoop = ({ currentItems }) => {
    return (
      <>
        {currentItems &&
          currentItems.map((item, key) => {
            quans_tag = [];
            return (
              <div className="my-1">
                {/* <List /> */}
                {/* <h3>Item #{item.quans}</h3> */}
                {item.tag_quans.map((j, i) => {
                  quans_tag.push(j.tag.name);
                })}
                <List key={key} id={item.id} question={item.quans} likeCount={item.like_count} tag={quans_tag} />
              </div>
            );
          })}
      </>
    );
  };

  let submitSearch = async (e) => {
    try {
      dispatch(getListSearch(valSearch));
    } catch (error) {
      console.log(error);
    }
    e.preventDefault();
  };

  return (
    <div className="col-lg-10 mt-5 p-4 g-0 pt-4" style={{ marginTop: `100px` }}>
      <div className="row">
        <div className="col-lg-9 mt-2">
          <div className="input-group">
            <form onSubmit={submitSearch} className="w-100">
              <div className="input-group mb-3">
                <input
                  type="text"
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
                <h6>menampilkan total {items.length} hasil pencarian</h6>
              </div>
              <div className="col-md-3 col-5">
                <Form.Select size="sm mb-3">
                  <option>Paling sesuai</option>
                  <option>Terbaru</option>
                </Form.Select>
              </div>
            </div>
          </div>
          {getListSearchResult ? <PaginatedItems itemsPerPage={10} items={items} ItemsLoop={ItemsLoop} /> : getListSearchLoading ? <p>loading</p> : <p>{getListSearchError ? getListSearchError : "data kosong"}</p>}
          {/* <PaginatedItems itemsPerPage={10} items={items} ItemsLoop={ItemsLoop} initPage={2} /> */}
        </div>
        <Rightsidebar />
      </div>
    </div>
  );
};

export default Dashboard;
