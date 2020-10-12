import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Col, Row, Button, Container, Breadcrumb, Image} from "react-bootstrap";
import {useHistory} from "react-router-dom";

function ListerProjects(props){

    const history = useHistory();

    function goProfilMenu(){
        history.push("/userSpace");
    }

    const displayList =async()=> {
        try{
            const userID = props.loggedInMemberID;
            const response = await fetch(`http://localhost:5000/userSpaceProjetList/${userID}`,{
                method:'put',
                Header:{'Content-Type': 'application/json'}
            });
            const jsonData=await response.json();
            setListProjects(jsonData);
        }catch(err){
            console.error(err.message);
        }
    }

    useEffect(()=>{
        displayList();
    },[]);

    const [listProjects, setListProjects]=useState([]);
    // get the specific project number and push to the detail
    function handleClick(event){
       props.setProjetID(event.target.value);
       history.push('/projectDetail/')
    }



    return(

        <Container>
            <Breadcrumb style={{fontSize:"20px"}}>
                <Breadcrumb.Item onClick={goProfilMenu}>Profil</Breadcrumb.Item>
                <Breadcrumb.Item active>Mes Projets</Breadcrumb.Item>
            </Breadcrumb><br/><br />

            <Form>
                {listProjects.map(projects=>
                    <div key={projects.code}>
                        <Row className="shadow p-3 mb-5 bg-white rounded p-4">
                            <Col className="mr-4" lg={5} sm={12}>
                                <Image fluid src={projects.image} />
                            </Col><br /><br />
                            <Col className="ml-4" lg={6} sm={12}>
                                <Row>
                                    <div><h2>{projects.titre}</h2></div>
                                </Row><br />
                                <Row>
                                    <div style={{textAlign:'left', fontSize:'18px'}}>{projects.description}</div>
                                </Row><br />
                                <Row>

                                    <Button style={{backgroundColor :'orange'}} value={projects.code} onClick={handleClick}>Details</Button>

                                </Row>
                            </Col>
                        </Row><br/>
                    </div>  )}
            </Form><br /><br />

        </Container>

    )
}

export default ListerProjects;


