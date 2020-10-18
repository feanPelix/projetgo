import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row, Image, ListGroup } from "react-bootstrap";
import moment from "moment";
import { AuthContext } from '../context/AuthContext/AuthContext';

function Profile(props){
  const {state: {user}} = useContext(AuthContext);

  
    return(

        <Container>
            <Row className="shadow p-3 mb-5 bg-white rounded p-4">
                <Col className="mt-4 mr-5" xs={12} md={6} lg={4}>
                    <Image fluid src='/images/avatar_woman.png' />
                </Col>
                <Col  className=" ml-5" style={{textAlign: 'left'}} xs={12} md={6} lg={6} >
                    <ListGroup variant="flush">
                        <ListGroup.Item><b>Prenom :  </b>{user.prenom}</ListGroup.Item>
                        <ListGroup.Item><b>Nom :  </b>{user.nom}</ListGroup.Item>
                        <ListGroup.Item><b>Courriel :  </b> {user.email}</ListGroup.Item>
                        <ListGroup.Item><b>Téléphone :  </b> {user.phone}</ListGroup.Item>
                        <ListGroup.Item><b>Adresse :  </b> {user.adresse}</ListGroup.Item>
                        <ListGroup.Item><b>Code Postal:  </b>{user.codepostal}</ListGroup.Item>
                        <ListGroup.Item><b>Ville :  </b>{user.ville}</ListGroup.Item>
                        <ListGroup.Item><b>Province :  </b>{user.province}</ListGroup.Item>
                        <ListGroup.Item><b>Pays : </b> {user.pays}</ListGroup.Item>
                        <ListGroup.Item><b>Membre depuis :  </b>{moment(user.inscription).format('ll')}</ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>


    )
}

export default Profile;