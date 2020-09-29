import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import CardProject from '../CardProject/CardProject';
import './Home.css';

export function Home() {
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
      <Col lg={4}>
        <CardProject 
          key={key}
          srcImage={key.srcImage}
          title={key.title}
          summary={key.summary}
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
        {highligthProjects}
      </Row>
    </Container>
  );
}

export default Home;