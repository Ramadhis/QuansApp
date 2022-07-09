import React from "react";
import { Card, Form, Button, Modal } from "react-bootstrap";

const TagCard = () => {
  return (
    <>
      <Card style={{ width: "13rem" }} className="mx-1 my-1 px-1 py-1">
        <Card.Body>
          <Card.Title style={{ fontSize: "17px" }}>Javascript</Card.Title>
          <Card.Text style={{ fontSize: "12px" }}>For questions regarding programming in ECMAScript (JavaScript/JS) and its various dialects/implementations (excluding ActionScript). Note</Card.Text>
          <Card.Text style={{ fontSize: "14px" }}>Total 100 Question</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default TagCard;
