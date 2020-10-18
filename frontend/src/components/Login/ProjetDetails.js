import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Col, Row, Button, ListGroup, Container, Image, Dropdown,DropdownButton} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import EditProjects from "./EditProjects";
import {storage} from "../../firebase";





function ProjetDetails({ match, loggedInMemberID }){

    const member=loggedInMemberID;
    const projetId = match.params.projetId
    //Adding and deleting members and volunteers
    const location = useLocation();
    const [memberName, setMemberName]=useState('');
    const [memberID, setMemberID]=useState('');
    const [memberLocation, setMemberLocation]=useState('');
    const [benevoleLocation, setbenevoleLocation]=useState('')
    const [benevoleName, setBenevoleName]=useState('');
    const [benevoleID, setBenevoleID]=useState('');
    const [initialValueMember, setInitialValueMember] = useState(true);
    const [check, setCheck] = useState(true);


    const [arrayAddedAlreadyBenevoles, setArrayAddedAlreadyBenevoles]=useState([]);

    //Searching for new members to add
    const [arrayMembersDB, setArrayMembersDB]=useState([] );


    const [arrayBenevolesDB,setArrayBenevolesDB]=useState([]);

    const [arrayAddedAlreadyMembers, setArrayAddedAlreadyMembers]=useState([]);

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
                    {option.nom} {option.prenom}
                </option>
            )}
        </Form.Control>
    );

    const listofAlreadyAddedMembres = (
        <ListGroup>
            {arrayAddedAlreadyMembers.map((membres) =>

                <ListGroup.Item key={membres.id}>
                    {membres.nom} {membres.prenom}  <Button onClick={()=>supprimerMember(membres.id)} className="mb-2"  variant="info">-</Button>
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
                    {option.nom} {option.prenom}
                </option>
            )}
        </Form.Control>
    );

    const listNomsBenevoles = (
        <ListGroup>
            {arrayAddedAlreadyBenevoles.map((benevole) =>
                <ListGroup.Item key={benevole.id}>
                    {benevole.nom} {benevole.prenom} <Button onClick={()=>supprimerBenevole(benevole.id)} className="mb-2" variant="info">-</Button>
                </ListGroup.Item>
            )}
        </ListGroup>
    );

    useEffect(()=>{
        getProjectDetail()
    },[])




    //Edit info part

    const[value, setValue]=useState('Proposé');
    const handleSelect=(e)=>{setValue(e)}
    const[stateVisibility, setStateVisibility]=useState('hidden');

    const [title, setTitle] =useState ('');
    const [description, setDescription] = useState('');
    const [sommaire, setSommaire]= useState('') ;
    const [statutprojet, setStatutprojet] = useState('');
    const [debutestime, setDebutestime] = useState(null);
    const [finestime, setFinestime] = useState(null);
    const [budget, setBudget] = useState('');
    const [totalfondscoll, setTotalfondscoll] = useState('');
    const [totaldepense, setTotaldepense] = useState('');
    const [debutreel, setDebutreel] = useState(null);
    const [debutfin, setDebutfin] = useState(null);
    const [etatavancement, setEtatavancement] = useState('');
    const [nomImage, setNomImage] = useState('');
    const [responsable, setResponsable] = useState('');
    const [image, setImage] = useState('');

    const getProjectDetail = async ()=> {
        try {

            const body = {projetID: projetId};
            // Getting the first name, last name, userID and status of the membership from the table
            const response = await fetch(`http://localhost:5000/projectDetail${projetId}`, {
                method: 'post',
                Header: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            });
            const jsonData = await response.json();

            setTitle(jsonData[0].titre);
            setDescription(jsonData[0].description);
            setSommaire(jsonData[0].sommaire);
            setStatutprojet(jsonData[0].statutprojet);
            setDebutestime(jsonData[0].debutestime);
            setFinestime(jsonData[0].finestime);
            setBudget(jsonData[0].budget);
            setTotalfondscoll(jsonData[0].totalfondscoll);
            setTotaldepense(jsonData[0].totaldepense);
            setDebutreel(jsonData[0].debutreel);
            setDebutfin(jsonData[0].debutfin);
            setEtatavancement(jsonData[0].etatavancement);
            setNomImage(jsonData[0].nameimg);
            setImage(jsonData[0].image);
            setResponsable(jsonData[0].responsable);

            const responseMembre = await fetch(`http://localhost:5000/VoirMembreProjet/${projetId}`);
            const jsonDataMembreList = await responseMembre.json();

            setArrayAddedAlreadyMembers(jsonDataMembreList);

            const responseBenevole = await fetch(`http://localhost:5000/VoirBenevoleProjet/${projetId}`);
            const jsonDataBenevoleList = await responseBenevole.json();
            setArrayAddedAlreadyBenevoles(jsonDataBenevoleList)


            const responseAllMembre = await fetch(`http://localhost:5000/allMembers/${projetId}`);

            const jsonDataAllMemberList = await responseAllMembre.json();
            setArrayMembersDB(jsonDataAllMemberList);

            const responseAllBenevole = await fetch(`http://localhost:5000/allBenevoles/${projetId}`);

            const jsonDataAllBenevoleList = await responseAllBenevole.json();
            setArrayBenevolesDB(jsonDataAllBenevoleList);

        } catch (err) {
            console.log(err.message);
        }
    }

    const handleChange = e => {

        if (e.target.files[0]) {
            setNomImage(e.target.files[0]);
        }
    };
    useEffect(()=>{
        getProjectDetail();
    },[]);

    useEffect(()=>{
        if (member === responsable) {
            setStateVisibility('visible');
        }
        else {
            setStateVisibility('hidden');
        }
    }, [responsable])

    const handleEdit=async (event) => {
        const uploadTask = storage.ref(`images/${nomImage.name}`).put(nomImage);
        uploadTask.on(
            "state_changed",
            snapshot => {
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(nomImage.name)
                    .getDownloadURL()
                    .then( async image => {
                        try {
                            const responsable = loggedInMemberID;
                            const body = {title, description, sommaire, statutprojet, debutestime, finestime, budget, totalfondscoll, totaldepense, debutreel, debutfin, etatavancement, responsable, image};

                            const response = await fetch("http://localhost:5000/editProjet/", {
                                method: 'POST',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify(body)
                            });
                            const jsonData = await response.json();
                            if (jsonData) {
                                alert("Edit sucessful");

                            } else {
                                alert("Please try again");
                            }
                        } catch (err) {
                            console.log(err.message);
                        }
                    });
            }
        )
        event.preventDefault();

    }


    return(

        <Container style={{textAlign:'left'}} >
            <Col>
                <div style={{fontSize:'18px'}}>
                    <Row className="px-3">

                        <h1>{title}</h1><p> <EditProjects content={title} stateVisibility={stateVisibility} setContent={setTitle}/></p>

                        <p>{description}  <EditProjects content={description} stateVisibility={stateVisibility} setContent={setDescription}/></p>


                    </Row>
                    <Row>
                        <Col className="mr-4" lg={5} sm={12}>
                            <Image fluid src={image} />
                            <input style={{visibility:stateVisibility}} type="file" onChange={handleChange} className="btn btn-info btn-circle btn-sm" id="exampleFormControlFile1"/>


                        </Col><br /><br />
                        <Col className="mr-4" lg={6} sm={12}>
                            <p>{sommaire}</p>
                            <EditProjects content={sommaire} stateVisibility={stateVisibility} setContent={setSommaire}/>
                        </Col>
                    </Row><br/>
                    <Row>
                        <Col>
                            <Button style={{backgroundColor:'orange'}} className="px-4"><b>Faire un Don</b></Button>
                        </Col>
                        <Col style={{visibility:stateVisibility}}>
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
                            <p><b>Date début estimée:</b> {debutestime}</p>
                        </Col>
                        <Col>
                            <p><b>Date fin estimé:</b> {finestime}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p><b>Montant amassé:</b> {totalfondscoll}</p>
                        </Col>
                    </Row><br/>


                </div><br/>

                <div style={{visibility:stateVisibility}} className="AjouterMembres" >
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
                                <Button style={{visibility:stateVisibility}} className="p-5" style={{backgroundColor:'orange'}} onClick={handleEdit} className="px-4"><b>Enregistrer</b></Button><br/><br/>
                                <Button style={{visibility:stateVisibility}} className="p-5" style={{backgroundColor:'orange'}}  className="px-4"><b>Supprimer Projet</b></Button>
                            </Col>
                        </Row>
                    </Container>
                </div><br/><br/>
            </Col>
        </Container>
    )
}


export default ProjetDetails;