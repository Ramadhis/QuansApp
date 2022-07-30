import React, { useState } from "react";
import { Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";

const List = (props) => {
  let id = props.id;
  let tag = props.tag;
  let [like, setLike] = useState(0);
  let tes = "asd";
  let [likeCalculating, setLikeCalculating] = useState(props.likeCount);

  const likeAdd = () => {
    return props.addLike(props.index);
  };
  return (
    <Card>
      <Card.Body>
        <div className="row">
          <div className="col-md-11 col-9">
            <Card.Text>
              <Link to={`/quans/?id=${id}`}>{props.question} </Link>
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
          <div className="col-md-1 col-3">
            <div onClick={likeAdd} className="col-md-12 text-center">
              {props.likeCheck === 0 ? <BsHandThumbsUp className="h3" /> : <BsHandThumbsUpFill className="h3" />}
            </div>
            <div className="col-md-12 text-center">{likeCalculating}</div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default List;
