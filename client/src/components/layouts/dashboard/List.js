import React from "react";
import { Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsHandThumbsUp } from "react-icons/bs";

const List = (props) => {
  let id = props.id;
  let tag = props.tag;
  return (
    <Card>
      <Card.Body>
        <Link className="stretched-link" to={`/quans/?id=${id}`} />
        <div className="row">
          <div className="col-md-11 col-9">
            <Card.Text>{props.question}</Card.Text>
            {tag &&
              tag.map((t, i) => {
                return (
                  <Badge key={i} className="me-1" bg="secondary">
                    {t}
                  </Badge>
                );
              })}
          </div>
          <div className="col-md-1 col-3">
            <div className="col-md-12 text-center">
              <BsHandThumbsUp className="h3" />
            </div>
            <div className="col-md-12 text-center">{props.likeCount}</div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default List;
