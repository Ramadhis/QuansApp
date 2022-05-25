import React from "react";
import Header from "../widgets/Header";
import Sidebar from "../widgets/sidebar/Sidebar";
import { Row, Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const Quans = () => {
  return (
    <div>
      <Header />
      <Container fluid={true}>
        <Row>
          <Container fluid={true}>
            <Row>
              <div className="col-lg-2">
                <Sidebar />
              </div>
              <div className="col-lg-10 mt-5 g-0 p-2 pt-4" style={{ marginTop: `100px` }}>
                <h2>Apa itu Javascript?</h2>
                <p>Posted On : 20 May 2022</p>
                <hr />
                <Container fluid={true}>
                  <Row>
                    <div className="col-lg-9">
                      <section className="my-3">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste non optio necessitatibus, nam magnam atque. Tempora quos vero laboriosam, repudiandae adipisci voluptas animi soluta. Quisquam labore tempora quos
                        voluptatum facere!
                        <hr className="my-4" />
                      </section>
                      <section className="my-3">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste non optio necessitatibus, nam magnam atque. Tempora quos vero laboriosam, repudiandae adipisci voluptas animi soluta. Quisquam labore tempora quos
                        voluptatum facere!
                        <hr className="my-4" />
                      </section>
                      <section className="my-3">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste non optio necessitatibus, nam magnam atque. Tempora quos vero laboriosam, repudiandae adipisci voluptas animi soluta. Quisquam labore tempora quos
                        voluptatum facere!
                        <hr className="my-4" />
                      </section>
                      <section className="my-3">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste non optio necessitatibus, nam magnam atque. Tempora quos vero laboriosam, repudiandae adipisci voluptas animi soluta. Quisquam labore tempora quos
                        voluptatum facere!
                        <hr className="my-4" />
                      </section>
                      <section className="my-3">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste non optio necessitatibus, nam magnam atque. Tempora quos vero laboriosam, repudiandae adipisci voluptas animi soluta. Quisquam labore tempora quos
                        voluptatum facere!
                        <hr className="my-4" />
                      </section>
                      <section className="my-3">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste non optio necessitatibus, nam magnam atque. Tempora quos vero laboriosam, repudiandae adipisci voluptas animi soluta. Quisquam labore tempora quos
                        voluptatum facere!
                        <hr className="my-4" />
                      </section>
                      <section className="my-3">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste non optio necessitatibus, nam magnam atque. Tempora quos vero laboriosam, repudiandae adipisci voluptas animi soluta. Quisquam labore tempora quos
                        voluptatum facere!
                        <hr className="my-4" />
                      </section>
                    </div>
                    <div className="col-lg-3">
                      <Card>
                        <Card.Body>
                          <Card.Title>Card Title</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                          <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                          <Card.Link href="#">Card Link</Card.Link>
                          <Card.Link href="#">Another Link</Card.Link>
                        </Card.Body>
                      </Card>
                    </div>
                  </Row>
                </Container>
              </div>
            </Row>
          </Container>
        </Row>
      </Container>
    </div>
  );
};

export default Quans;
