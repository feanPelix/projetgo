import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CardProject from '../CardProject/CardProject';

export function Projects() {
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    try {
      const response = await fetch("/project");
      const jsonData = await response.json();

      setProjects(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const allProjects = projects.map(key => {
    return (
        <Col 
          lg={4} 
          md={4}
          key={key.code}
        >
          <CardProject 
            srcImage={key.image}
            title={key.titre}
            summary={key.description}
            projectId={key.code}
          />
        </Col>
    );
  });

  return(
    <Container fluid>
      <Row>
        {allProjects}
      </Row>
    </Container>
  );
}

export default Projects;