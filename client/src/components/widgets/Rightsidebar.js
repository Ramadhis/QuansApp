import React from "react";
import { Card } from "react-bootstrap";

const Rightsidebar = () => {
  return (
    <div className="col-lg-3 mt-4 mt-md-1">
      <h5>Popular this Month</h5>

      <Card>
        <Card.Body>
          <Card.Text style={{ fontSize: "14px" }} className="my-1">
            1. Mengapa bumi berbentuk bola ?.
          </Card.Text>
          <Card.Text style={{ fontSize: "14px" }} className="my-1">
            2. Apa nama hewan berawalan X ?.
          </Card.Text>
          <Card.Text style={{ fontSize: "14px" }} className="my-1">
            3. platipus bertelur atau beranak ?.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Rightsidebar;
