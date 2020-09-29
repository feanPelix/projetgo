import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

export function Header() {
  return(
    <Container fluid>
      <Row>
        <Col lg={3}>
          Logo
        </Col>
        <Col lg={9}>
          Menu
        </Col>
      </Row>
    </Container>
  );
}

export default Header;