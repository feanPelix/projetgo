import React from 'react';
import { useState, useEffect } from 'react';
import {Container, Col, Row, CardDeck} from 'react-bootstrap';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import CardProject from '../CardProject/CardProject';
import './Home.css';

export function Home() {
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    try {
      const response = await fetch("/project/top3");
      const jsonData = await response.json();

      setProjects(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  
  const highlightProjects = projects.map(key => {
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
        <Col className="btm-pd">
          <VideoPlayer />
        </Col>
      </Row>
      <Row>
        <CardDeck>
          {highlightProjects}
        </CardDeck>
      </Row>
    </Container>
  );
}

export default Home;