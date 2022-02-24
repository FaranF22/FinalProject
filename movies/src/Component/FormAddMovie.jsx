import React from "react";
import { Button, Form } from "react-bootstrap";
import "../Styles/FormAddMovie.css";

const FormAddMovie = () => {
  return (
    <div>
      <Form className="container pt-3 mt-4 pb-4 pt-2 F">
        <Form.Group className="mb-3 title" controlId="formBasicEmail">
          <Form.Label>Movie Title</Form.Label>
          <Form.Control placeholder="Enter title" />
        </Form.Group>
        <Form.Group className="mb-3 year" controlId="formBasicPassword">
          <Form.Label>Release Year</Form.Label>
          <Form.Control placeholder="Enter year" />
        </Form.Group>
        <Form.Group className="mb-3 desc" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows="15" placeholder="Enter text" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Poster Link</Form.Label>
          <Form.Control as="textarea" rows="3" placeholder="Enter link" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default FormAddMovie;
