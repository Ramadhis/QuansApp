import React from "react";
import Rightsidebar from "../widgets/Rightsidebar";
import { Card, Form, Tabs, Tab } from "react-bootstrap";
import List from "../layouts/mydashboard/List";
import { BsSearch, AiTwotoneDelete, AiTwotoneEdit } from "react-icons/bs";
import ModalQuestion from "../layouts/mydashboard/ModalQuestion";
const MyDashboard = () => {
  return (
    <div className="col-lg-10 mt-5 p-4 g-0 pt-4" style={{ marginTop: `100px` }}>
      <div className="row">
        <div className="col-lg-12 mt-2">
          <Tabs defaultActiveKey="Myquestion" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="Myquestion" title="MyQuestion">
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
                  <div className="col-md-12 mb-2">
                    <ModalQuestion />
                  </div>
                  <div className="col-md-12">
                    <List />
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="Myanswer" title="MyAnswer">
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
              </div>
              <List />
            </Tab>
          </Tabs>
        </div>
        {/* <Rightsidebar /> */}
      </div>
    </div>
  );
};

export default MyDashboard;
