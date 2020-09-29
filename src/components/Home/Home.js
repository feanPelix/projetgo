import React from 'react';
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

  projects.map(() => {});

  return(
    <Container fluid>
      <Row>
        <Col className="btm-pd">
          <VideoPlayer />
        </Col>
      </Row>
      <Row>
        <Col lg={4}>
          <CardProject 
            srcImage="https://bit.ly/fcc-relaxing-cat"
            title="title"
            summary="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
          />
        </Col>
        <Col lg={4}>
          <CardProject
            srcImage="https://bit.ly/fcc-relaxing-cat"
            title="title"
            summary="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
          />
        </Col>
        <Col lg={4}>
          <CardProject
            srcImage="https://bit.ly/fcc-relaxing-cat"
            title="title"
            summary="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;