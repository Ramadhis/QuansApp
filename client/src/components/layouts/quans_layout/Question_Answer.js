import React from "react";
import { Card, Row } from "react-bootstrap";
const Question = () => {
  return (
    <div>
      {/*Answer.Component.js*/}
      <section className="my-4 pt-3">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste non optio necessitatibus, nam magnam atque. Tempora quos vero laboriosam, repudiandae adipisci voluptas animi soluta. Quisquam labore tempora quos voluptatum facere!
        <Row>
          <div className="col-md-4 col-6 d-flex align-items-end">
            <span style={{ fontSize: "14px" }}>Posted On : 20 May 2022</span>
          </div>
          <div className="col-md-8 col-6 d-flex flex-row-reverse mt-4">
            <div className="col-md-5 col-12">
              <Card>
                <Card.Body className="p-2">
                  <div className="col-md-12">
                    <Row>
                      <div className="col-md-4 col-4">
                        <img src="https://via.placeholder.com/50" alt="" />
                      </div>
                      <div className="col-md-8 col-8 g-0">
                        <div style={{ fontSize: "15px" }}>Ramadhiansyah</div>
                        <div style={{ fontSize: "13px" }}>Programmer</div>
                      </div>
                    </Row>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Row>
        <hr className="mt-2 mb-4" />
      </section>
      {/*Answer.Component.js*/}
    </div>
  );
};

export default Question;
