import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import "../Styles/FormAddMovie.css";

const AddMovie = () => {
  const [name, setName] = useState();
  const [year, setYear] = useState();
  const [detail, setDetail] = useState();
  const [picLink, setPicLink] = useState();

  const nameListener = (event) => {
    setName(event.target.value);
  };
  const yearListener = (event) => {
    setYear(event.target.value);
  };
  const detailListener = (event) => {
    setDetail(event.target.value);
  };
  const picLinkListener = (event) => {
    setPicLink(event.target.value);
  };

  const add = () => {
    axios
      .post("http://localhost:8080/create.php", {
        name: name,
        year: year,
        detail: detail,
        picLink: picLink,
      })
      .then(function (response) {})
      .catch(function (error) {});
  };

  return (
    <div>
      <Form className="container pt-3 mt-4 pb-4 pt-2 F">
        <Form.Group className="mb-3 title" controlId="formBasicEmail">
          <Form.Label>Movie Title</Form.Label>
          <Form.Control placeholder="Enter title" onChange={nameListener} />
        </Form.Group>
        <Form.Group className="mb-3 year" controlId="formBasicPassword">
          <Form.Label>Release Year</Form.Label>
          <Form.Control placeholder="Enter year" onChange={yearListener} />
        </Form.Group>
        <Form.Group className="mb-3 desc" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows="15"
            placeholder="Enter text"
            onChange={detailListener}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Poster Link</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Enter link"
            onChange={picLinkListener}
          />
        </Form.Group>
        <Button variant="primary" onClick={add}>
          Submit
        </Button>
      </Form>{" "}
    </div>
  );
};

export default AddMovie;
