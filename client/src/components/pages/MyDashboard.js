import React from "react";
import { Form, Tabs, Tab } from "react-bootstrap";
import List from "../layouts/mydashboard/List";
import { BsSearch, AiTwotoneDelete, AiTwotoneEdit } from "react-icons/bs";
import ModalQuestion from "../layouts/mydashboard/ModalQuestion";
import MyQuestion from "../layouts/mydashboard/MyQuestion";
import MyAnswer from "../layouts/mydashboard/MyAnswer";

const MyDashboard = () => {
  return (
    <div className="col-lg-10 mt-5 p-4 g-0 pt-4" style={{ marginTop: `100px` }}>
      <div className="row">
        <div className="col-lg-12 mt-2">
          <Tabs defaultActiveKey="Myquestion" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="Myquestion" title="MyQuestion">
              <MyQuestion />
            </Tab>
            <Tab eventKey="Myanswer" title="MyAnswer">
              <MyAnswer />
            </Tab>
          </Tabs>
        </div>
        {/* <Rightsidebar /> */}
      </div>
    </div>
  );
};

export default MyDashboard;
