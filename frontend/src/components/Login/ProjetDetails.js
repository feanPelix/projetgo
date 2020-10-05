import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Col, Row, Button, ListGroup, Container, Breadcrumb, Image, Dropdown,DropdownButton} from "react-bootstrap";
import Report from './Report';
import { useLocation } from "react-router-dom";




function ProjetDetails(){
    const location = useLocation();
    console.log(location);
    console.log(location.state);
    //Adding and deleting members and volunteers

    const [memberName, setMemberName]=useState('');
    const [memberID, setMemberID]=useState('');
    const [memberLocation, setMemberLocation]=useState('');
    const [benevoleLocation, setbenevoleLocation]=useState('')
    const [benevoleName, setBenevoleName]=useState('');
    const [benevoleID, setBenevoleID]=useState('');
    const [initialValueMember, setInitialValueMember] = useState(true);
    const [check, setCheck] = useState(true);
    const [arrayAddedAlreadyMembers, setArrayAddedAlreadyMembers]=useState([
        {name:"PepitaMembre",id:3},
        {name:"JuanitaMembre",id:4}
    ]);

    const [arrayAddedAlreadyBenevoles, setArrayAddedAlreadyBenevoles]=useState([
        {name:"JoshBenevole",id:3},
        {name:"PauloBenevole",id:4}
    ]);

    //Searching for new members to add
    const [arrayMembersDB, setArrayMembersDB]=useState([
        {name:"JohnMembre",id:1},
        {name:"SueMembre",id:2}
    ]);


    const [arrayBenevolesDB,setArrayBenevolesDB]=useState([
        {name:"PepiBenevole",id:1},
        {name:"JuaniBenevole",id:2}
    ]);

    //Adding members from the list
    const handleChangeMember = event =>{
        setMemberLocation(event.target.value);
        const newMember = {name: arrayMembersDB[event.target.value].name, id: arrayMembersDB[event.target.value].id};
        setMemberName( newMember.name);
        setMemberID(newMember.id);
        setInitialValueMember('');
    }

    const handleChangeBenevole = event =>{
        setbenevoleLocation((event.target.value));
        const newMember = {name: arrayBenevolesDB[event.target.value].name, id: arrayBenevolesDB[event.target.value].id};
        setBenevoleName(newMember.name);
        setBenevoleID(newMember.id);

    }


    function ajouterMembre(){
        let check = true;
        arrayAddedAlreadyMembers.map((member) =>{
            if (member.id === memberID){
                alert("inside if");
                check =false;
            }
        });
        if(check === true){

            const newListWithAdd = arrayAddedAlreadyMembers.concat({name: memberName, id: memberID});
            setArrayAddedAlreadyMembers(newListWithAdd);

        }else{
            alert("You have already added this person");
        }
    }

    function supprimerMember(memberLocation){
        let index = arrayAddedAlreadyMembers.findIndex(obj => obj.id ===memberLocation);

        const memberToErase = arrayAddedAlreadyMembers[index].name;

        const newArray =arrayAddedAlreadyMembers.filter(member => member.name !== memberToErase)


        setArrayAddedAlreadyMembers(newArray);
    }

    const listToAddMembers = (
        <Form.Control as="select" onChange= {handleChangeMember}>
            <option value=''>Choisissez un membre</option>
            {arrayMembersDB.map((option, id) =>
                <option  value={id}  key={id}>
                    {option.name}
                </option>
            )}
        </Form.Control>
    );

    const listofAlreadyAddedMembres = (
        <ListGroup>
            {arrayAddedAlreadyMembers.map((membres) =>
                <ListGroup.Item key={membres.id}>
                    {membres.name}  <Button onClick={()=>supprimerMember(membres.id)} className="mb-2"  variant="info">-</Button>
                </ListGroup.Item>
            )}
        </ListGroup>
    );



    function ajouterBenevole(){
        let check = true;
        arrayAddedAlreadyBenevoles.map((benevole) =>{
            if (benevole.id === benevoleID){
                alert("inside if");
                check =false;
            }
        });
        if(check === true){

            const newListWithAdd = arrayAddedAlreadyBenevoles.concat({name: benevoleName, id: benevoleID});
            setArrayAddedAlreadyBenevoles(newListWithAdd);
            //const newListWithDelete =arrayMembersDB.filter(member => member.name !== memberName)
            //setArrayMembersDB(newListWithDelete);
            //arrayMembersDB.splice(memberLocation,1);
        }else{
            alert("You have already added this person");
        }
    }

    function supprimerBenevole(benevoleLocation){
        let index = arrayAddedAlreadyBenevoles.findIndex(obj => obj.id ===benevoleLocation);

        const benevoleToErase = arrayAddedAlreadyBenevoles[index].name;

        const newArray =arrayAddedAlreadyBenevoles.filter(benevole => benevole.name !== benevoleToErase)


        setArrayAddedAlreadyBenevoles(newArray);
    }




    const listAddBenevoles = (
        <Form.Control as="select" onChange={handleChangeBenevole}>
            <option value='' disabled selected>Choisissez un bénévole</option>
            {arrayBenevolesDB.map((option, id) =>
                <option value={id}  key={id}>
                    {option.name}
                </option>
            )}
        </Form.Control>
    );

    const listNomsBenevoles = (
        <ListGroup>
            {arrayAddedAlreadyBenevoles.map((benevole) =>
                <ListGroup.Item key={benevole.id}>
                    {benevole.name}  <Button onClick={()=>supprimerBenevole(benevole.id)} className="mb-2" variant="info">-</Button>
                </ListGroup.Item>
            )}
        </ListGroup>
    );

    useEffect(()=>{

    })




    //Edit info part

    const[value, setValue]=useState('Proposé');
    const handleSelect=(e)=>{setValue(e)}
    const[stateVisibility, setStateVisibility]=useState('hidden');
    const member="responsable";


    const myArray=['Pepe','Juan','Luis'];
    const [membres, setMembres]=useState(myArray);

    useEffect(()=>{
        if (member === "responsable") {
            setStateVisibility('visible');
        }
        else {
            setStateVisibility('hidden');
        }
    }, [])




    return(

        <Container style={{textAlign:'left'}} >
            <Col>
            <br/>
            <Breadcrumb >
                <Breadcrumb.Item href="#">Profil</Breadcrumb.Item>
                <Breadcrumb.Item active>Project X</Breadcrumb.Item>
            </Breadcrumb><br/>
            <div style={{fontSize:'18px'}}>
                <Row className="px-3">
                    <h1>Heading</h1>
                    <p> <button style={{visibility:stateVisibility}} type="button" className="mt-3 ml-2 btn btn-info btn-sm">+</button></p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi atque consequatur,
                        ea eum ipsa iusto labore magnam minima quas quis saepe sapiente sit tempora vitae. Accusamus doloremque
                        impedit ipsam.  <button style={{visibility:stateVisibility}} type="button" className="btn btn-info btn-circle btn-sm">+</button></p>
                </Row>
                <Row>
                    <Col className="mr-4" lg={5} sm={12}>
                        <Image fluid src='./images/volunteer.jpg' />
                        <button  style={{visibility:stateVisibility}} type="button" className="btn btn-info btn-circle btn-sm">+</button>
                    </Col><br /><br />
                    <Col className="mr-4" lg={6} sm={12}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci atque dolor eum facilis fugiat id in iusto, maxime molestias neque non officia perspiciatis, quibusdam repudiandae, saepe sequi ullam ut voluptates!</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci atque dolor eum facilis fugiat id in iusto, maxime molestias neque non officia perspiciatis, quibusdam repudiandae, saepe sequi ullam ut voluptates!</p>
                        <button  style={{visibility:stateVisibility}} type="button" className="btn btn-info btn-circle btn-sm">+</button>
                    </Col>
                </Row><br/>
                <Row>
                    <Col>
                        <Button style={{backgroundColor:'orange'}} className="px-4"><b>Faire un Don</b></Button>
                    </Col>
                    <Col>
                        <div style={{display:'inline-block'}}>
                            <DropdownButton  style={{float:'left'}} variant="info" onSelect={handleSelect} id="dropdown-basic-button" title="Statut Project">
                                <Dropdown.Item eventKey="Proposé">Proposé</Dropdown.Item>
                                <Dropdown.Item eventKey="Soumis">Soumis</Dropdown.Item>
                                <Dropdown.Item eventKey="Approuvé">Approuvé</Dropdown.Item>
                                <Dropdown.Item eventKey="Actif">Actif</Dropdown.Item>
                                <Dropdown.Item eventKey="Terminé">Terminé</Dropdown.Item>
                                <Dropdown.Item eventKey="Gelé">Gelé</Dropdown.Item>
                            </DropdownButton>
                            <span style={{float:'right'}} className="pl-2 pt-2">{value}</span>
                        </div>
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
                </Row><br/>


            </div><br/>

            <div className="AjouterMembres" >
                <Container>
                    <Row>
                        <Col>
                            {listToAddMembers}<br/>
                            <Button className="mb-2" style={{minWidth: '200px'}} variant="info" onClick={ajouterMembre}><b>+ </b>Ajouter</Button><br/>
                            {listofAlreadyAddedMembres}
                        </Col>


                        <Col>
                            {listAddBenevoles}<br/>
                            <Button className="mb-2" style={{minWidth: '200px'}} variant="info" onClick={ajouterBenevole}><b>+ </b>Ajouter</Button><br/>
                            {listNomsBenevoles}
                        </Col>
                        <Col style={{textAlign:'right'}}>
                            <Button style={{visibility:stateVisibility}} className="p-5" style={{backgroundColor:'orange'}}  className="px-4"><b>Enregistrer</b></Button>
                        </Col>
                    </Row>
                </Container>
            </div><br/><br/>
            </Col>
            <Col>
                <Report project={location.state} />
            </Col>
        </Container>
    )
}


export default ProjetDetails;