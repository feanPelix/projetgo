import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Col, Row, Button, InputGroup, ListGroup, Container, Breadcrumb, Image, Badge,Dropdown,DropdownButton} from "react-bootstrap";



function ProjetDetails(){
    const[value, setValue]=useState('Proposé');
    const handleSelect=(e)=>{setValue(e)}

    return(

            <Container style={{textAlign:'left'}} >
                <br/>
                <Breadcrumb >
                    <Breadcrumb.Item href="#">Profil</Breadcrumb.Item>
                    <Breadcrumb.Item active>Mes Projets</Breadcrumb.Item>
                </Breadcrumb><br/>
                <div style={{fontSize:'18px'}}>
                    <Row className="px-3">
                        <h1>Heading</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi atque consequatur, ea eum ipsa iusto labore magnam minima quas quis saepe sapiente sit tempora vitae. Accusamus doloremque impedit ipsam.</p>
                    </Row>
                    <Row>
                        <Col className="mr-4" lg={5} sm={12}>
                            <Image fluid src='./images/volunteer.jpg' />
                        </Col><br /><br />
                        <Col className="mr-4" lg={6} sm={12}>
                           <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci atque dolor eum facilis fugiat id in iusto, maxime molestias neque non officia perspiciatis, quibusdam repudiandae, saepe sequi ullam ut voluptates!</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci atque dolor eum facilis fugiat id in iusto, maxime molestias neque non officia perspiciatis, quibusdam repudiandae, saepe sequi ullam ut voluptates!</p>

                        </Col>
                    </Row><br/>
                    <Row>
                        <Col>
                            <p><b>Date début estimée:</b> blablabla</p>
                        </Col>
                        <Col>
                            <p><b>Date fin estimé:</b> blablabla</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p><b>Montant amassé:</b> 15 000</p>
                        </Col>
                    </Row>

                    <Row>
                        <DropdownButton variant="info" onSelect={handleSelect} id="dropdown-basic-button" title="Statut Project">
                            <Dropdown.Item eventKey="Proposé">Proposé</Dropdown.Item>
                            <Dropdown.Item eventKey="Soumis">Soumis</Dropdown.Item>
                            <Dropdown.Item eventKey="Approuvé">Approuvé</Dropdown.Item>
                            <Dropdown.Item eventKey="Actif">Actif</Dropdown.Item>
                            <Dropdown.Item eventKey="Terminé">Terminé</Dropdown.Item>
                            <Dropdown.Item eventKey="Gelé"d>Gelé</Dropdown.Item>
                        </DropdownButton>
                        <h5 className="pl-4 pt-1">{value}</h5>
                    </Row>
                </div>
            </Container>


    )
}

export default ProjetDetails;


