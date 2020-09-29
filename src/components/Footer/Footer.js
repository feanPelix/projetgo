import React from 'react';
import { Container, Col, Row, ListGroup } from 'react-bootstrap';
import { Facebook, Twitter, Instagram } from 'react-feather';

export function Footer() {
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
        key={key}
      >
        {key.title}

      </ListGroup.Item>
    );
  });


  return(
    <Container fluid>
      <Row>
        <Col lg={4}>
          <h4>Campagnes</h4>
          <ListGroup variant="flush">
            {highligthProjects}
          </ListGroup>
        </Col>
        <Col lg={4}>
          <h4>Mon compte</h4>
        </Col>
        <Col lg={4}>
          <h4>Restez en contact!</h4>
          <Facebook />
          <Twitter />
          <Instagram />
          <p>Contactez-nous</p>
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