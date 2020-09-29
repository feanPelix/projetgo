import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

export function Footer() {
  return(
    <Container fluid>
      <Row>
        <Col lg={4}>
          <h4>Campagnes</h4>
        </Col>
        <Col lg={4}>
          <h4>Mon compte</h4>
        </Col>
        <Col lg={4}>
          <h4>Restez en contact!</h4>

        </Col>
      </Row>
      <Row>
        <Col>

        </Col>
      </Row>
    </Container>
  );
}

export default Footer;