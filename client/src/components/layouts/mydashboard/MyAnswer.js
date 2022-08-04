import React from "react";
import { Form, Tabs, Tab } from "react-bootstrap";
import List from "../mydashboard/List";
import { BsSearch, AiTwotoneDelete, AiTwotoneEdit } from "react-icons/bs";

const MyAnswer = () => {
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
      <List />
    </div>
  );
};

export default MyAnswer;
