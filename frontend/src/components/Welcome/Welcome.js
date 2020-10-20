import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row, Image, Badge } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { AuthContext } from '../context/AuthContext/AuthContext';
import ButtonPG from '../Buttons/ButtonPG/ButtonPG';

function Welcome() {
  const { state: { user, member } } = useContext(AuthContext);
  const history = useHistory();

  return (
    <Container className="shadow p-5 mb-5 bg-white rounded p-4">
      <Row >
        <Col xs={12} md={6} lg={5} >
          <Image style={{ maxWidth: "70%" }} fluid src='/images/avatar_woman.png' />
        </Col>

        <Col className="p-4" xs={12} md={6} lg={7}>
          <h1 style={{ letterSpacing: 3 }}>Bon retour</h1>
          <h1 style={{ letterSpacing: 2 }}>{user.nom + " " + user.prenom} !</h1>
          <Badge pill variant="warning" className="mt-4 p-3 px-5" >
            {
              !!member ?
              `Membre: ${member.statutadhesion}` :
              'Bénévole'
            }
          </Badge>
        </Col>
      </Row>
      <Row>
        <Col>
          <ButtonPG
            type="submit"
            size="lg"
            onClick={() => history.push('/membre/profil')}
          >
            Profil
          </ButtonPG>
        </Col>
        <Col>
          <ButtonPG
            type="submit"
            size="lg"
            onClick={() => history.push('/membre/mesProjets')}
          >
            Mes projets
          </ButtonPG>
        </Col>
        {!!member && (
          <Col>
            <ButtonPG
              type="submit"
              size="lg"
              onClick={() => history.push('/membre/mesProjets/nouveau')}
            >
              Créer un projet
            </ButtonPG>
          </Col>
        )}
      </Row>
    </Container>

  );
}

export default Welcome;
