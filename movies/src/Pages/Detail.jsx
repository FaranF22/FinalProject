import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "../Styles/Detail.css";

const Detail = (props) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
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

  useEffect(() => {
    if (!movie) loadData();
  }, []);
  const loadData = async () => {
    const result = await axios.get(
      "http://localhost:8080/read_movie.php?id=" + id
    );

    setName(result.data.name);
    setYear(result.data.year);
    setDetail(result.data.detail);
    setPicLink(result.data.picLink);
    setMovie(result.data);
  };

  const update = () => {
    axios
      .post("http://localhost:8080/update.php", {
        id: id,
        name: name,
        year: year,
        detail: detail,
        picLink: picLink,
      })
      .then(function (response) {})
      .catch(function (error) {});
  };
  const deleteMovie = () => {
    axios
      .post("http://localhost:8080/delete.php", {
        id: id,
      })
      .then(function (response) {})
      .catch(function (error) {});
  };

  console.log(movie);

  return (
    movie && (
      <div>
        <div className="detailBox">
          <div className="detailPic">
            <Image className="detailPic" src={movie.picLink}></Image>
          </div>
          <p className="detailText">
            <b>Name: </b>
            {movie.name}
            <br />
            <b>Year:</b> {movie.year}
            <br />
            <b>Details:</b> {movie.detail}
          </p>
        </div>
        <div className="deleteBtnDiv">
          <Button className="deleteBtn" onClick={deleteMovie}>
            Delete
          </Button>
        </div>

        <Form className="container pt-3 mt-4 pb-4 pt-2 F">
          <Form.Group className="mb-3 title" controlId="formBasicEmail">
            <Form.Label>Movie Title</Form.Label>
            <Form.Control
              placeholder="Enter title"
              onChange={nameListener}
              value={name}
            />
          </Form.Group>
          <Form.Group className="mb-3 year" controlId="formBasicPassword">
            <Form.Label>Release Year</Form.Label>
            <Form.Control
              placeholder="Enter year"
              onChange={yearListener}
              value={year}
            />
          </Form.Group>
          <Form.Group className="mb-3 desc" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="15"
              placeholder="Enter text"
              onChange={detailListener}
              value={detail}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Poster Link</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Enter link"
              onChange={picLinkListener}
              value={picLink}
            />
          </Form.Group>
          <Button variant="primary" onClick={update}>
            Submit
          </Button>
        </Form>
      </div>
    )
  );
};

export default Detail;
