import React, { useEffect } from "react";
import { Form, Tabs, Tab } from "react-bootstrap";
import List from "../layouts/mydashboard/List";
import { BsSearch, AiTwotoneDelete, AiTwotoneEdit } from "react-icons/bs";
import ModalQuestion from "../layouts/mydashboard/ModalQuestion";
import MyQuestion from "../layouts/mydashboard/MyQuestion";
import MyAnswer from "../layouts/mydashboard/MyAnswer";
import { useSearchParams, useLocation } from "react-router-dom";

const MyDashboard = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // const question = () => {
  //   searchParams.set("tab", "myQuestion");
  //   setSearchParams(searchParams);
  // };

  // const answer = () => {
  //   searchParams.set("tab", "myAnswer");
  //   setSearchParams(searchParams);
  // };

  useEffect(() => {
    if (!searchParams.get("tab")) {
      searchParams.set("tab", "myQuestion");
      // searchParams.set("page", 1);
      // searchParams.set("orderby", "terbaru");
      setSearchParams(searchParams);
      window.location.reload();
    }
  }, []);

  const tab = (e) => {
    e.preventDefault();
    console.log(e.target.textContent);
    if (e.target.textContent === "MyAnswer") {
      searchParams.set("tab", "myAnswer");
      // searchParams.set("page", 1);
      // searchParams.set("orderby", "terbaru");
      setSearchParams(searchParams);
    } else if (e.target.textContent === "MyQuestion") {
      searchParams.set("tab", "myQuestion");
      // searchParams.set("page", 1);
      // searchParams.set("orderby", "terbaru");
      setSearchParams(searchParams);
    }
  };
  return (
    <div className="col-lg-10 mt-5 p-4 g-0 pt-4" style={{ marginTop: `100px` }}>
      <div className="row">
        <div className="col-lg-12 mt-2">
          <Tabs onClick={tab} defaultActiveKey="myQuestion" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="myQuestion" title="MyQuestion">
              <MyQuestion />
            </Tab>
            <Tab eventKey="myAnswer" title="MyAnswer">
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
