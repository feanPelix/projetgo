import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import logo from '../../assets/logo-projetgo.png';

export function Header() {
  return(
    <Container fluid>
      <Row>
        <Col lg={3}>
          <img src={logo} className="App-logo" alt="logo"/>
        </Col>
        <Col lg={9}>
          Menu
        </Col>
      </Row>
    </Container>
  );
}

export default Header;