import React from "react";
import { Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsHandThumbsUp } from "react-icons/bs";
import ReactPaginate from "react-paginate";

const List = () => {
  let id = 1;
  return (
    <Card>
      <Card.Body>
        <Link className="stretched-link" to={`/quans/?id=${id}`} />
        <div className="row">
          <div className="col-md-11 col-9">
            <Card.Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus minima libero sapiente voluptas id nam suscipit obcaecati odit quis? Officia, exercitationem quas. Totam magni autem blanditiis itaque soluta? Laborum, commodi
            </Card.Text>
            <Badge className="me-1" bg="secondary">
              Javascript
            </Badge>
            <Badge className="me-1" bg="secondary">
              PHP
            </Badge>
          </div>
          <div className="col-md-1 col-3">
            <div className="col-md-12 text-center">
              <BsHandThumbsUp className="h3" />
            </div>
            <div className="col-md-12 text-center">10</div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default List;
