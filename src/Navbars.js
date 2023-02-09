import React from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export function Navbars() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand style={{ float: "left" }} href="#home">Academy</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">

          <Nav.Link style={{ textDecoration: 'none' }}> <Link className='navlink' style={{ textDecoration: "none" }} to="/">Home</Link></Nav.Link>
          <Nav.Link style={{ textDecoration: 'none' }}> <Link className='navlink' style={{ textDecoration: "none" }} to="/students">Students</Link></Nav.Link>
          <Nav.Link style={{ textDecoration: 'none' }}><Link className='navlink' style={{ textDecoration: "none" }} to="/teacher">Teachers</Link></Nav.Link>



        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
