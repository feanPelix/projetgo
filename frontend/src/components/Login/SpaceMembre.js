import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Col, Row, Image, Button, Badge } from "react-bootstrap";
import moment from "moment";
function SpaceMembre(props){
    const [userID , setUserID] = useState(props.memberSpecific);

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
            <Row>
                <Col style={{textAlign: 'left'}} xs={12} md={6} lg={7} >
                    <p>Prenom : {prenom}</p>
                    <p>Nom : {nom}</p>
                    <p>Adresse :  {address}</p>
                    <p>Code Postal: {codePostal} </p>
                    <p>Ville : {ville}</p>
                    <p>Province : {province}</p>
                    <p>Pays : {pays}</p>
                    <p>Membre depuis : {date}</p>

                </Col>

                <Col className="p-4" xs={12} md={6} lg={4}>
                    <Image fluid src='./images/avatar_woman.png' />
                </Col>
            </Row>
        </Container>
    )
}

export default SpaceMembre;