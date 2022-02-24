import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, FormControl, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Styles/Movie.css";

const Movie = () => {
  const [movie, setMovie] = useState();
  const [searchquery, setSearchquery] = useState();
  const [view, setView] = useState(4);
  const list = () => {
    if (view === 4) {
      setView(8);
    } else {
      setView(4);
    }
  };
  const searchqueryListener = (event) => {
    setSearchquery(event.target.value);
  };
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    const result = await axios.get("http://localhost:8080/read.php");
    setMovie(result.data.data);
  };

  const loadSearchquery = async () => {
    const search = await axios.get(
      "http://localhost:8080/search.php?" + searchquery
    );
    setMovie(search.data.data);
  };
  // console.log(movie);
  return (
    <div>
      <Form className="container d-flex mt-3 mb-5">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          onChange={searchqueryListener}
        />
        <Button
          className="mx-2"
          variant="outline-success"
          onClick={loadSearchquery}
        >
          Search
        </Button>
        <Button className="mx-2" variant="outline-success" onClick={list}>
          Grid/List
        </Button>
      </Form>
      <Row className="container">
        {movie &&
          movie.map((item) => {
            return (
              <Col xs={6} md={view}>
                <Card className="p-1 m-5 movieCard" style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={item.picLink} />
                  <Card.Body>
                    <Card.Title className="movieTitle">
                      "{item.name}"&nbsp;- {item.year}
                    </Card.Title>
                    <Link to={`/detail/${item.id}`}>
                      <Button className="detailBtn" variant="primary">
                        Detail
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};
{
  /* <Link to={`/detail/id=${item.id}`}> */
}

export default Movie;
