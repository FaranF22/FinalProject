import React from "react";
import { Link } from "react-router-dom";
import { Container, Image, Nav, Navbar } from "react-bootstrap";
import "../Styles/MovieNavbar.css";

const MovieNavbar = () => {
  return (
    <div>
      <Navbar className="nav" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <Image
              className="logoPic"
              src={process.env.PUBLIC_URL + "/logo.png"}
              alt="IMDB"
            />
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className="links me-4 ms-4" to="/">
                Home
              </Link>
              <Link className="links" to="/addMovie">
                Add Movie
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default MovieNavbar;
