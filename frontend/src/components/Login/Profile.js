import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Col, Row, Image, Button, Badge,ListGroup} from "react-bootstrap";
import moment from "moment";
function Profile(props){
    const userID = props.loggedInMemberID;

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] =useState('');
    const [address, setAddress]=useState('');
    const [codePostal, setCodePostal]=useState('');
    const [ville, setVille]=useState('');
    const [province, setProvince]=useState('');
    const [pays, setPays]=useState('');
    const [date, setDate]=useState('');

    const getInfo = async ()=>{

        try{
            const response = await fetch(`http://localhost:5000/userSpace/${userID}`,{
                method:'put',
                Header:{'Content-Type': 'application/json'}
            });
            const jsonData=await response.json();
            setNom(jsonData[0].nom);
            setPrenom(jsonData[0].prenom);
            setAddress(jsonData[0].adresse);
            setVille(jsonData[0].ville);
            setProvince(jsonData[0].province);
            setPays(jsonData[0].pays);
            setDate(moment(jsonData[0].inscription).format("MM/DD/YYYY"));
            setCodePostal(jsonData[0].codepostal);


        }catch(err){
            console.log(err.message);
        }
    }
    useEffect(()=>{
        getInfo();
    },[])
    return(

        <Container>
            <Row className="shadow p-3 mb-5 bg-white rounded p-4">
                <Col className="mt-4 mr-5" xs={12} md={6} lg={4}>
                    <Image fluid src='./images/avatar_woman.png' />
                </Col>
                <Col  className=" ml-5" style={{textAlign: 'left'}} xs={12} md={6} lg={6} >
                    <ListGroup variant="flush">
                        <ListGroup.Item><b>Prenom :  </b>{prenom}</ListGroup.Item>
                        <ListGroup.Item><b>Nom :  </b>{nom}</ListGroup.Item>
                        <ListGroup.Item><b>Adresse :  </b> {address}</ListGroup.Item>
                        <ListGroup.Item><b>Code Postal:  </b>{codePostal}</ListGroup.Item>
                        <ListGroup.Item><b>Ville :  </b>{ville}</ListGroup.Item>
                        <ListGroup.Item><b>Province :  </b>{province}</ListGroup.Item>
                        <ListGroup.Item><b>Pays : </b> {pays}</ListGroup.Item>
                        <ListGroup.Item><b>Membre depuis :  </b>{date}</ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>


    )
}

export default Profile;