import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Col, Row, Image, Button, Badge } from "react-bootstrap";
import {useHistory} from "react-router-dom";


function AfficherMessage(props){
    const history = useHistory();

    function Capitalize(str){
        return str.toUpperCase();
    }



    const userID = props.loggedInMemberID;
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] =useState('');
    const [statutadhesion, setStatutadhesion]=useState('');

    const getName = async ()=> {
        try {
            // Getting the first name, last name, userID and status of the membership from the table
            const response = await fetch(`http://localhost:5000/welcomePage/${userID}`, {
                method: 'put',
                Header: {'Content-Type': 'application/json'}
            });
            const jsonData = await response.json();

            setNom(jsonData[0].nom);
            setPrenom(jsonData[0].prenom);
            console.log(jsonData[0].statutadhesion);
          if (jsonData[0].statutadhesion == 'Actif') {
                setStatutadhesion('Membre');
            } else {
                setStatutadhesion('Benevole');
            }
        } catch (err) {
            console.log(err.message);
        }
    }
    useEffect(()=>{
        getName();
    },[])
    return(

        <Container>
            <Row className="shadow p-5 mb-5 bg-white rounded p-4">
                <Col xs={12} md={6} lg={5} >
                    <Image style={{maxWidth:"70%"}}fluid src='./images/avatar_woman.png' />
                </Col>

                <Col className="p-4" xs={12} md={6} lg={7}>
                    <h1 style={{letterSpacing: 3}}>Bon retour</h1>

                    <h1 style={{letterSpacing: 2}}>{nom+" " +prenom} !</h1><br />
                    <Badge className="badge badge-warning mt-4 p-3 px-5" >{Capitalize(statutadhesion)}</Badge>
                </Col>
            </Row>
            <Button style={{background:"orange"}} className="px-5 btn btn-danger mb-4" variant="primary" type="submit" onClick={() => history.push('/membre')}>
                SPACE MEMBRE
            </Button>

        </Container>

    );
}

export default AfficherMessage;
