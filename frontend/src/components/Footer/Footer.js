import React, { useContext } from 'react';
import { Container, Col, Row, ListGroup } from 'react-bootstrap';
import { Facebook, Twitter, Instagram } from 'react-feather';
import { useState, useEffect } from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import User from '../User';
import './Footer.css';
import { AuthContext } from '../context/AuthContext/AuthContext';

export function Footer() {
  const { state: { isAuthenticated } } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/Accueil");
      const jsonData = await response.json();

      setProjects(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const highligthProjects = projects.map(key => {
    return (
      <ListGroup.Item
        key={key.code}
      >
        {key.titre}
      </ListGroup.Item>
    );
  });


  return(
    <Container fluid>
      <Row>
        <Col lg={4} md={4}>
          <h4>Campagnes</h4>
          <ListGroup variant="flush">
            {highligthProjects}
          </ListGroup>
        </Col>
        <Col lg={4} md={4}>
          <h4>Mon compte</h4>
          <ul className="foot-list">
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/membre/mesProjets">Mes projets</Link>
                </li>
                <li>
                  <Link to="/membre/mesProjets/nouveau">Creer nouveau projet</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/inscription-membre" href>Devenir membre</Link>
                </li>
                <li>
                  <Link to="/inscription-benevole">Devenir bénévole</Link>
                </li>
              </>
            )}
          </ul>
        </Col>
        <Col lg={4} md={4}>
          <h4>Restez en contact!</h4>
          <div className="social">
            <a href="#"><Facebook /></a>
            <a href="#"><Twitter /></a>
            <a href="#"><Instagram /></a>
          </div>
            <p><a href="#">Contactez-nous</a></p>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            &#169;2020 ProjetGo. Tous droits réservés. Site Web réalisé par
            <span className="team"> <a href="#">do-or-paste</a></span>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;