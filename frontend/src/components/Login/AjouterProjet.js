import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Col, Row,Button,InputGroup,ListGroup,Container,Breadcrumb } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";


function AjouterProjet(props){
    const [userName , setUserName] = useState(props.memberSpecific);
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] =useState('');
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
            const responsable = props.memberSpecific;
            const response = await fetch(`http://localhost:5000/ajoutProjet/${titre}/${descCourte}/${sommaire}/${startDate}/${endDate}/${responsable}/${image}`,{
                method:'put',
                Header:{'Content-Type': 'application/json'}
            });
            const jsonData=await response.json();
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


    return(

        <Container className="px-5 mx-5" fluid style={{fontSize: '18px'}}>
            <Breadcrumb className="px-3 mx-3">
                <Breadcrumb.Item href="#">Profil</Breadcrumb.Item>
                <Breadcrumb.Item active>Créer un projet</Breadcrumb.Item>
            </Breadcrumb><br/><br />

            <Form className="px-5 mx-5" style={{textAlign: 'left'}} style={{textAlign: 'left'}}>
                <Row >
                    <Col>
                        <Form.Label> Titre du projet: </Form.Label>
                    </Col>
                    <Col lg="9">
                        <input value={titre} onChange={e => setTitre(e.target.value)} style={{width:'60%'}} className="form-control mt-2" type="text" placeholder="Type here"  />
                    </Col>
                </Row><br />
                <Row>
                    <Col>
                        <Form.Label style={{textAlign: 'left'}}>Description courte: </Form.Label>
                    </Col>
                    <Col lg="9">
                        <Form.Control value={descCourte} onChange={e => setDescCourte(e.target.value)}  placeholder="Type here" style={{width:'60%'}}  as="textarea" className="form-control" id="exampleFormControlTextarea1" rows="3"></Form.Control>
                    </Col>
                </Row><br />
                <Row>
                    <Col>
                        <Form.Label style={{textAlign: 'left'}}>Sommaire du project: (Description du but, Objectifs et Benefices escomptes) </Form.Label>
                    </Col>
                    <Col lg="9">
                        <textarea value={sommaire} onChange={e => setSommaire(e.target.value)} placeholder="Type here"  style={{width:'60%'}}  className="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                    </Col>
                </Row><br />
                <Row>
                    <Col>
                        <Form.Label style={{textAlign: 'left'}}>Photo de presentation: </Form.Label>
                    </Col>
                    <Col lg="9">
                        <input onChange={onChangeFileHandler} id="exampleFormControlFile1" name="photo" type="file"/>
                    </Col>

                </Row><br />
                <Row>
                    <Col lg={3}>
                        <Form.Label style={{textAlign: 'left'}} >Date du debut estime: </Form.Label>
                    </Col>
                    <Col style={{color:'black'}} lg={6}>
                        <DatePicker selected={startDate} onChange={date => setStartDate(moment(date).format('MM/DD/YYYY'))}/>
                    </Col>
                </Row><br />
                <Row>
                    <Col lg={3}>
                        <Form.Label style={{textAlign: 'left'}} >Date du fin de estime: </Form.Label>
                    </Col>
                    <Col lg={5}>
                        <DatePicker selected={endDate} onChange={date => setEndDate(moment(date).format('MM/DD/YYYY'))}/>
                    </Col>
                    <Col lg={2}>
                        <Button onClick={handleSubmit} variant="secondary" style={{backgroundColor :'orange'}}>Soumettre le projet</Button>
                    </Col>

                </Row>

            </Form><br /><br />


        </Container>


    )
}


export default AjouterProjet;