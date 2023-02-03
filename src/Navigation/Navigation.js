import { Outlet, Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import { Container, Row, Col } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import React from 'react';

function Navigation(){
    return (
      <>
        <Navbar sticky="top" bg="light" variant="light"><Container>
          <Navbar.Brand>Aitan Bachrach</Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to="/londonbridge" >London Bridge</Nav.Link>
            <Nav.Link as={Link} to="/projects" >Projects</Nav.Link>
            <Nav.Link as={Link} to="/" >Home</Nav.Link>
          </Nav>
        </Container></Navbar>
        <Container>
          <Row>
            <Col xs={2}></Col>
            <Col><Outlet/></Col>
            <Col xs={2}></Col>
          </Row>
        </Container>  
      </>
    )
} 

export default Navigation