import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";

const Rightsidebar = () => {
  const [popu, setPopu] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      axios
        .get("http://localhost:5000/quans/popular")
        .then((response) => {
          setPopu(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
      console.log(popu);
    }, 3000);
  }, []);

  return (
    <div className="col-lg-3 mt-4 mt-md-1">
      <h5>Popular this Month</h5>

      <Card>
        <Card.Body>
          <Card.Text className="my-1" style={{ fontSize: "14px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
            1. Mengapa bumi berbentuk bola ,tes tes?.
          </Card.Text>
          <Card.Text className="my-1" style={{ fontSize: "14px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
            2. Apa nama hewan berawalan X ?.
          </Card.Text>
          <Card.Text className="my-1" style={{ fontSize: "14px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
            3. platipus bertelur atau beranak ?.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Rightsidebar;
