import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Col, Row,Button,Container,Breadcrumb } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useHistory} from 'react-router-dom';


function AjouterProjet(props){
    const history = useHistory();
    const[titre,setTitre]=useState('');
    const[descCourte, setDescCourte]=useState('');
    const[sommaire, setSommaire]=useState('');
    const[image, setImage]=useState(null);
    const[startDate, setStartDate]=useState(new Date());
    const[endDate, setEndDate]=useState(new Date());
    function onChangeFileHandler(event){
        setImage(new FormData().append(event.target.files[0],0));
    }
    const handleSubmit=async(event)=> {

        event.preventDefault();
        try{
            const responsable = props.loggedInMemberID;
            const response = await fetch(`http://localhost:5000/ajoutProjet/${titre}/${descCourte}/${sommaire}/${startDate}/${endDate}/${responsable}/${image}`,{
                method:'put',
                Header:{'Content-Type': 'application/json'}
            });
            const jsonData=await response.json();
            console.log(jsonData);
            if(jsonData){
                alert("Submission sucessful");
                setTitre('');
                setDescCourte('');
                setSommaire('');
                setStartDate(new Date());
                setEndDate(new Date());
            }else{
                alert("Please try again");
            }
        }catch(err){
            console.log(err.message);
        }

    }

    function goProfilMenu(){
        history.push("/userSpace");
    }


    return(

        <Container style={{fontSize: '20px'}}>
            <Breadcrumb >
                <Breadcrumb.Item onClick={goProfilMenu}>Profil</Breadcrumb.Item>
                <Breadcrumb.Item active>Créer un projet</Breadcrumb.Item>
            </Breadcrumb><br/><br />

            <Form style={{textAlign: 'left'}}>
                <Row >
                    <Col>
                        <Form.Label>Titre du projet : </Form.Label>
                    </Col>
                    <Col lg="9">
                        <input value={titre} onChange={e => setTitre(e.target.value)} style={{width:'70%'}} className="form-control mt-2" type="text" placeholder="Type here"  />
                    </Col>
                </Row><br />
                <Row>
                    <Col>
                        <Form.Label style={{textAlign: 'left'}}>Description courte : </Form.Label>
                    </Col>
                    <Col lg="9">
                        <Form.Control value={descCourte} onChange={e => setDescCourte(e.target.value)}  placeholder="Type here" style={{width:'70%'}}  as="textarea" className="form-control" id="exampleFormControlTextarea1" rows="3"></Form.Control>
                    </Col>
                </Row><br />
                <Row>
                    <Col>
                        <Form.Label style={{textAlign: 'left'}}>Sommaire du project (description du but, objectifs et bnefices escomptes): </Form.Label>
                    </Col>
                    <Col lg="9">
                        <textarea value={sommaire} onChange={e => setSommaire(e.target.value)} placeholder="Type here"  style={{width:'70%'}}  className="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                    </Col>
                </Row><br />
                <Row>
                    <Col>
                        <Form.Label style={{textAlign: 'left'}}>Photo de presentation : </Form.Label>
                    </Col>
                    <Col lg="9">
                        <Form.File onChange={onChangeFileHandler} id="exampleFormControlFile1"  />
                    </Col>

                </Row><br />
                <Row>
                    <Col lg={3}>
                        <Form.Label style={{textAlign: 'left'}}>Date du début estimée : </Form.Label>
                    </Col>
                    <Col style={{color:'black'}} lg={6}>
                        <DatePicker dateFormat="MM-dd-yyyy" selected={startDate} onChange={date => setStartDate(date)}/>
                    </Col>
                </Row><br />
                <Row>
                    <Col lg={3}>
                        <Form.Label style={{textAlign: 'left'}}>Date du fin estimée : </Form.Label>
                    </Col>
                    <Col lg={5}>
                        <DatePicker dateFormat="MM-dd-yyyy" selected={endDate} onChange={date => setEndDate(date)}/>
                    </Col>
                    <Col lg={3}>
                        <Button onClick={handleSubmit} variant="secondary" style={{backgroundColor :'orange'}}>Soumettre Projet</Button>
                    </Col>

                </Row>

            </Form><br /><br />


        </Container>


    )
}


export default AjouterProjet;