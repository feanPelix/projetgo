import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Container, Image, Alert } from "react-bootstrap";
import ButtonPG from '../Buttons/ButtonPG/ButtonPG';
import { AuthContext } from '../context/AuthContext/AuthContext';

function ListerProjects({ match, history }) {
  const { state: { user, member } } = useContext(AuthContext);
  const [listProjects, setListProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      console.log('user: ', user.user_id);
      const response = await fetch(`/project/myProjects/${user.user_id}`);
      const jsonData = await response.json();
      setListProjects(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, [user.user_id]);

  return (
    <Container>
      {listProjects.length === 0 && (
        <Alert variant="info">
          <p>Aucun projet à afficher.</p>
          {!!member && (
            <ButtonPG 
              variant="teal" 
              size="lg" 
              onClick={() => history.push(`${match.url}/nouveau`)}
            >
              Créer un projet
            </ButtonPG>
          )}
        </Alert>
      )}
      {listProjects.map(project =>
        <div key={project.code}>
          <Row className="shadow p-3 mb-5 bg-white rounded p-4">
            <Col className="mr-4" lg={5} sm={12}>
              <Image fluid src={project.image} />
            </Col><br /><br />
            <Col className="ml-4" lg={6} sm={12}>
              <Row>
                <div><h2>{project.titre}</h2></div>
              </Row><br />
              <Row>
                <div style={{ textAlign: 'left', fontSize: '18px' }}>{project.description}</div>
              </Row><br />
              <Row>
                <ButtonPG onClick={() => history.push(`${match.url}/${project.code}`)}>
                  Details
                  </ButtonPG>
              </Row>
            </Col>
          </Row><br />
        </div>)}
    </Container>

  )
}

export default ListerProjects;
