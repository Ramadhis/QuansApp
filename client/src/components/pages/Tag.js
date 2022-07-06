import React from "react";
import { Card, Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import Tag_card from "../layouts/tag/Tag_card";
const Tag = () => {
  return (
    <div className="col-lg-10 mt-5 p-4 g-0 pt-4" style={{ marginTop: `100px` }}>
      <div className="row">
        <div className="col-lg-9 mt-2">
          <div class="input-group">
            <div class="input-group mb-3">
              <input type="text" class="form-control form-control-md" placeholder="Search Here"></input>
              <button type="submit" class="input-group-text btn-success">
                <BsSearch />
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-9 col-7 ms-1">
          <h6>Menampilkan total 9 hasil pencarian</h6>
        </div>
        <div className="col-md-12">
          <div className="row" style={{ marginLeft: "0.1px" }}>
            <Tag_card />
            <Tag_card />
            <Tag_card />
            <Tag_card />
            <Tag_card />
            <Tag_card />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tag;
