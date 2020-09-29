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
          <div>
            &#169;2020 ProjetGo. Tous droits réservés./Site Web réalisé par
            <span className="team"> do-or-paste</span>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;