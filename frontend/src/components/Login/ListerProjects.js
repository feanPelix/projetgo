import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Col, Row, Button, InputGroup, ListGroup, Container, Breadcrumb, Image} from "react-bootstrap";



function ListerProjects(props){

    const displayList =async()=> {
        try{
            const responsable = props.memberSpecific;
            const response = await fetch(`http://localhost:5000/userSpaceProjetList/${responsable}`,{
                method:'put',
                Header:{'Content-Type': 'application/json'}
            });
            const jsonData=await response.json();
            console.log(jsonData);
            setListProjects(jsonData)

        }catch(err){
            console.error(err.message);
        }
    }

    useEffect(()=>{
        displayList();
    },[]);

    const [listProjects, setListProjects]=useState([]);


    return(

        <Container >
            <Breadcrumb >
                <Breadcrumb.Item href="#">Profil</Breadcrumb.Item>
                <Breadcrumb.Item active>Mes Projets</Breadcrumb.Item>
            </Breadcrumb><br/><br />

            <Form>
                {listProjects.map(projects=>
                    <div key={projects.code}>
                        <Row>
                            <Col className="mr-4" lg={5} sm={12}>
                                <Image fluid src='./images/volunteer.jpg' />
                            </Col><br /><br />
                            <Col className="ml-4" lg={6} sm={12}>
                                <Row>
                                    <div><h2>{projects.titre}</h2></div>
                                </Row><br />
                                <Row>
                                    <div style={{textAlign:'left', fontSize:'18px'}}>{projects.description}</div>
                                </Row><br />
                                <Row>
                                    <Button style={{backgroundColor :'orange'}}>Details</Button>
                                </Row>
                            </Col>
                        </Row><br/>
                    </div>  )}
            </Form><br /><br />

        </Container>

    )
}

export default ListerProjects;


