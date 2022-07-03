import React from "react";
import Rightsidebar from "../widgets/Rightsidebar";
import { Card, Form } from "react-bootstrap";
import List from "../layouts/dashboard/List";
import { BsSearch } from "react-icons/bs";

const Dashboard = () => {
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
          <div className="col-md-12 mb-2">
            <div className="row">
              <div className="col-md-9 col-7">
                <h6>menampilkan total 9 hasil pencarian</h6>
              </div>
              <div className="col-md-3 col-5">
                <Form.Select size="sm mb-3">
                  <option>Paling sesuai</option>
                  <option>Terbaru</option>
                </Form.Select>
              </div>
            </div>
          </div>
          <List />
        </div>
        <Rightsidebar />
      </div>
    </div>
  );
};

export default Dashboard;
