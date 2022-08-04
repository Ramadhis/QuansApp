//top
import React, { useState, useEffect } from "react";
import PaginatedItems from "../widgets/pagination/PaginatedItems";
import { urlApi } from "../helpers/Helpers";
import { useSearchParams, useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { Card, Form } from "react-bootstrap";
//redux
import { useDispatch, useSelector } from "react-redux";
import { getListTag } from "../../actions/tagAction";

//optional
import Tagcard from "../layouts/tag/TagCard";

const Tag = () => {
  //top
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { getListTagResult, getListTagLoading, getListTagError } = useSelector((state) => state.TagReducer);
  const [valSearch, setValSearch] = useState("");
  const URL = urlApi();
  let items = Array.from(getListTagResult);
  // const [loadData, setLoadData] = useState({
  //   loading: true,
  //   data: false,
  //   error: false,
  // });
  // let { loading, data, error } = loadData;

  // const loadAxios = (param) => {
  //   axios
  //     .post(
  //       URL + "/tag",
  //       {
  //         s: param,
  //       },
  //       { withCredentials: true }
  //     )
  //     .then(
  //       (result) => {
  //         // setLoadData({ ...loadData, loading: false, data: result });
  //         return setLoadData((prev) => {
  //           return { ...prev, loading: false, data: result.data };
  //         });
  //       },
  //       { withCredentials: true }
  //     )
  //     .catch((err) => {
  //       return setLoadData((prev) => {
  //         return { ...prev, loading: false, error: err.message };
  //       });
  //     });
  //   console.log("loaded");
  // };

  let ItemsLoop = ({ currentItems }) => {
    return (
      <>
        {currentItems &&
          currentItems.map((item) => {
            return (
              <div className={`col-md-auto my-1 dat-${item.id}`} key={item.id}>
                <Tagcard title={item.name} description={item.description} countQuestion={item.tagQuansCount} />
              </div>
            );
          })}
      </>
    );
  };

  useEffect(() => {
    console.log("1. use effect component did mount");
    setValSearch(searchParams.get("s") ? searchParams.get("s") : "");
    dispatch(getListTag(searchParams.get("s") ? searchParams.get("s") : ""));
    console.log(getListTagResult);
    // loadAxios(searchParams.get("s") ? searchParams.get("s") : "");
    // loading = loadData.loading;
    // data = loadData.data;
    // error = loadData.error;
  }, [location, dispatch]);

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
  return (
    <div className="col-lg-10 mt-5 p-4 g-0 pt-4" style={{ marginTop: `100px` }}>
      <div className="row">
        <form onSubmit={submitSearch}>
          <div className="col-lg-9 mt-2">
            <div className="input-group">
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
            </div>
          </div>
        </form>

        <div className="col-md-9 col-7 ms-1">
          <h6>Menampilkan total {items.length} hasil pencarian</h6>
        </div>

        <div className="col-md-12">
          <div className="row">
            {getListTagResult ? (
              getListTagResult.length === 0 ? (
                <div className="text-center" style={{ fontSize: "15px" }}>
                  data yang anda cari tidak ada
                </div>
              ) : (
                <PaginatedItems itemsPerPage={10} items={items} ItemsLoop={ItemsLoop} />
              )
            ) : getListTagLoading ? (
              <p>loading</p>
            ) : (
              <p>{getListTagError ? getListTagError : "terjadi kesalahan"}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tag;
