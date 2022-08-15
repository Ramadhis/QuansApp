import React, { useState } from "react";
import { Card, Badge, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsTrashFill, BsFillPencilFill } from "react-icons/bs";
import axios from "axios";
import { useSearchParams, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ModalQuestion from "./ModalQuestion";

const List = (props) => {
  let id = props.id;
  let tag = props.tag;
  const [searchParams, setSearchParams] = useSearchParams();
  const [show, setShow] = useState(false);

  const del = async () => {
    const MySwal = withReactContent(Swal);
    let idUser = JSON.parse(localStorage.getItem("us_da_prv"));

    await MySwal.fire({
      title: <p>are you sure to delete question?</p>,
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("http://localhost:5000/quans/deleteQuestion/", {
            // headers: {
            //   Authorization: authorizationToken,
            // },
            data: {
              id_user: `${idUser.iduser}`,
              id_quans: `${id}`,
            },
          })
          .then((response) => {
            console.log(response.data);
            setSearchParams({
              // s: searchParams.get("s"),
              delete: response.data.msg,
            });
          })
          .catch((error) => {
            console.log(error.message);
            setSearchParams({
              delete: "failed",
            });
          });
      } else {
        return 0;
      }
    });
    //
  };

  const edit = () => {
    setShow(true);
  };

  // const edit = () => {
  //   let idUser = JSON.parse(localStorage.getItem("us_da_prv"));
  //   axios
  //     .delete("http://localhost:5000/quans/editQuestion/", {
  //       // headers: {
  //       //   Authorization: authorizationToken,
  //       // },
  //       data: {
  //         id_user: `${idUser.iduser}`,
  //         id_quans: `${id}`,
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       setSearchParams({
  //         // s: searchParams.get("s"),
  //         delete: response.data.msg,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //       setSearchParams({
  //         delete: "failed",
  //       });
  //     });
  // }

  return (
    <div className="col-md-12">
      <Card>
        <Card.Body>
          <div className="row">
            <div className="col-md-11 col-10">
              <Card.Text>
                <Link to={`/quans/?id=${id}`}>{props.quans}</Link>
              </Card.Text>
              {console.log(tag)}
              {tag &&
                tag.map((t, i) => {
                  return (
                    <Badge key={i} className="me-1" bg="secondary">
                      {t.name}
                    </Badge>
                  );
                })}
            </div>
            <div className="col-md-1 col-2">
              <Row>
                <Button onClick={del} variant="danger" className="col-8 col-md-7 mb-1 text-center">
                  <BsTrashFill />
                </Button>
                <Button onClick={edit} variant="info" className="col-8 col-md-7 text-center">
                  <BsFillPencilFill style={{ color: "white" }} />
                </Button>
                <ModalQuestion
                  show={show}
                  hide={() => {
                    setShow(false);
                  }}
                  edit={true}
                  question={props.quans}
                  idQuans={id}
                  tag={tag}
                  allTag={props.allTag}
                />
              </Row>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default List;
