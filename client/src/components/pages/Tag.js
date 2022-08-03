import React, { useState, useEffect } from "react";
import { Card, Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import Tagcard from "../layouts/tag/TagCard";
import { useSearchParams, useLocation } from "react-router-dom";
import { urlApi } from "../helpers/Helpers";
import axios from "axios";
import PaginatedItems from "../widgets/pagination/PaginatedItems";

const Tag = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [valSearch, setValSearch] = useState("");
  const URL = urlApi();
  const [loadData, setLoadData] = useState({
    loading: true,
    data: false,
    error: false,
  });
  let { loading, data, error } = loadData;
  const items = loadData.data;

  const loadAxios = (param) => {
    setValSearch(searchParams.get("s") ? searchParams.get("s") : "");
    axios
      .post(
        URL + "/tag",
        {
          s: param,
        },
        { withCredentials: true }
      )
      .then(
        (result) => {
          // setLoadData({ ...loadData, loading: false, data: result });
          return setLoadData((prev) => {
            return { ...prev, loading: false, data: result.data };
          });
        },
        { withCredentials: true }
      );
    console.log("loaded");
  };
  useEffect(() => {
    setValSearch(searchParams.get("s") ? searchParams.get("s") : "");
    loadAxios(searchParams.get("s") ? searchParams.get("s") : "");
    loading = loadData.loading;
    data = loadData.data;
    error = loadData.error;
    console.log(data);
  }, [location]);

  const ItemsLoop = ({ currentItems }) => {
    return (
      <>
        {currentItems &&
          currentItems.map((item, key) => {
            return (
              <div className={`col-md-auto my-1 dat-${item.id}`} key={key}>
                <Tagcard title={item.name} description={item.description} countQuestion={item.tagQuansCount} />
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
            {items ? (
              items.length === 0 ? (
                <div className="text-center" style={{ fontSize: "15px" }}>
                  data yang anda cari tidak ada
                </div>
              ) : (
                <PaginatedItems itemsPerPage={10} items={items} ItemsLoop={ItemsLoop} />
              )
            ) : loading ? (
              <p>loading</p>
            ) : (
              <p>{error ? error : "terjadi kesalahan"}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tag;
