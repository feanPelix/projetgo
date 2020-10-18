import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Container, Image } from "react-bootstrap";
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


