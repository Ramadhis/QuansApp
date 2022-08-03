import React from "react";
import { Card, Form, Button, Modal } from "react-bootstrap";

const TagCard = (props) => {
  return (
    <Card style={{ width: "12rem", height: "17rem" }} className="my-1 px-1 py-1">
      <Card.Body>
        <Card.Title style={{ fontSize: "17px" }}>{props.title}</Card.Title>
        <Card.Text style={{ fontSize: "12px" }}>{props.description}</Card.Text>
        <Card.Text style={{ fontSize: "14px" }}>Total {props.countQuestion} Question</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TagCard;
