import React from "react";
import { Card, Badge, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsTrashFill, BsFillPencilFill } from "react-icons/bs";

const List = (props) => {
  let id = props.id;
  let tag = props.tag;
  return (
    <div className="col-md-12">
      <Card>
        <Card.Body>
          <div className="row">
            <div className="col-md-11 col-10">
              <Card.Text>
                <Link to={`/quans/?id=${id}`}>{props.quans}</Link>
              </Card.Text>
              {tag &&
                tag.map((t, i) => {
                  return (
                    <Badge key={i} className="me-1" bg="secondary">
                      {t}
                    </Badge>
                  );
                })}
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
    </div>
  );
};

export default List;
