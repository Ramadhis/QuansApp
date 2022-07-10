import React from "react";
import { Card, Badge, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsTrashFill, BsFillPencilFill } from "react-icons/bs";

const List = () => {
  let id = 1;
  return (
    <Card>
      <Card.Body>
        <div className="row">
          <div className="col-md-11 col-10">
            <Card.Text>
              <Link to={`/quans/?id=${id}`}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus minima libero sapiente voluptas id nam suscipit obcaecati odit quis? Officia, exercitationem quas. Totam magni autem blanditiis itaque soluta? Laborum, commodi
              </Link>
            </Card.Text>
            <Badge className="me-1" bg="secondary">
              Javascript
            </Badge>
            <Badge className="me-1" bg="secondary">
              PHP
            </Badge>
          </div>
          <div className="col-md-1 col-2">
            <Row>
              <Button variant="danger" className="col-8 col-md-7 mb-1 text-center">
                <BsTrashFill />
              </Button>
              <Button variant="info" className="col-8 col-md-7 text-center">
                <BsFillPencilFill style={{ color: "white" }} />
              </Button>
            </Row>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default List;
