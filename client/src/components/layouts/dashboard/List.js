import React, { useState } from "react";
import { Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";

const List = (props) => {
  let id = props.id;
  let tag = props.tag;
  let likeCheck = props.likeCheck;
  let [like, setLike] = useState(0);
  let [likeCalculating, setLikeCalculating] = useState(props.likeCount);
  const idUser = JSON.parse(localStorage.getItem("us_da_prv"));

  const likeAdd = () => {
    return props.addLike(props.id, props.index);
  };
  return (
    <Card>
      <Card.Body>
        <div className="row">
          <div className="col-md-11 col-9">
            <Card.Text>
              <Link style={{ textDecoration: "none", color: "black" }} to={`/quans/?id=${id}`}>
                {props.question}{" "}
              </Link>
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
            <div onClick={idUser ? likeAdd : null} className="col-md-12 text-center">
              {idUser ? (
                likeCheck === 0 ? (
                  <BsHandThumbsUp className="h3">a</BsHandThumbsUp>
                ) : (
                  <BsHandThumbsUpFill style={{ color: "#198754" }} className="h3">
                    b
                  </BsHandThumbsUpFill>
                )
              ) : (
                <BsHandThumbsUp className="h3">c</BsHandThumbsUp>
              )}
            </div>
            <div className="col-md-12 text-center">{props.likeCount}</div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default List;
