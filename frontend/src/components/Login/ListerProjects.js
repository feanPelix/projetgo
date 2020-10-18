import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Row, Container, Image, CardDeck} from "react-bootstrap";
import CardProject from '../CardProject/CardProject';
import ButtonPG from '../Buttons/ButtonPG/ButtonPG';

function ListerProjects({ match, history, loggedInMemberID }) {
  const displayList = async () => {
    try {
      const userID = loggedInMemberID = '3';
      const response = await fetch(`http://localhost:5000/userSpaceProjetList/${userID}`, {
        method: 'put',
        Header: { 'Content-Type': 'application/json' }
      });
      const jsonData = await response.json();
      setListProjects(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    displayList();
  }, []);

  const [listProjects, setListProjects] = useState([]);
  // get the specific project number and push to the detail

  return (
    <Container>
      <CardDeck>
        {listProjects.map(project =>
          <Col
            lg={4}
            md={4}
            key={project.code}
          >
            <CardProject
              srcImage={project.image}
              title={project.titre}
              summary={project.description}
            />
          </Col>
        )}
      </CardDeck>
    </Container>
  )
}

export default ListerProjects;


