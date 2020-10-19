import React, { useContext, useEffect, useReducer, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Button, ListGroup, Image, Dropdown, DropdownButton, ProgressBar } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import { storage } from "../../firebase";
import { AuthContext } from '../context/AuthContext/AuthContext';
import ButtonPG from '../Buttons/ButtonPG/ButtonPG';
import EditProjects from "./EditProjects";
import ModifierDate from "./ModifierDate";
import ParticipantDisponibleList from "./ParticipantDisponibleList";
import ParticipantList from "./ParticipantList";

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD':
      return {
        ...state,
        ...action.payload,
      };

    case 'UPDATE':
      console.log('action', action);
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };

    default:
      return state;
  }
}

function ProjetDetails({ match }) {
  const { state: { user } } = useContext(AuthContext);
  const history = useHistory();
  const [currentProject, dispatch] = useReducer(reducer, {});
  const isCurrentUserResponsable = currentProject.responsable === user.user_id;
  const projetId = match.params.projectId;
  //Adding and deleting members and volunteers
  const [selectedMemberIndex, setSelectedMemberIndex] = useState('');
  const [selectedBenevoleIndex, setSelectedBenevoleIndex] = useState('');
  const [nomImage, setNomImage] = useState(currentProject.nameimg);

  //Searching for new members to add
  const [arrayAddedAlreadyBenevoles, setArrayAddedAlreadyBenevoles] = useState([]);
  const [arrayMembersDB, setArrayMembersDB] = useState([]);
  const [arrayBenevolesDB, setArrayBenevolesDB] = useState([]);
  const [arrayAddedAlreadyMembers, setArrayAddedAlreadyMembers] = useState([]);

  const editProjectInfo = (key, value) => {
    dispatch({ type: 'UPDATE', payload: { key, value }})
  };

  //Adding members from the list

  async function ajouterMembre() {
    const selectedMember = arrayMembersDB[selectedMemberIndex];
    const memberAlreadyInProject = arrayAddedAlreadyMembers.find((member) => member.user_id === selectedMember.user_id);
    if (memberAlreadyInProject) {
      alert("You have already added this person");
      return;
    }

    const body = {user_id: selectedMember.user_id};
    await fetch(`/project/${projetId}/member`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    });

    getParticipantsList();
    setSelectedMemberIndex('');
  }


  async function supprimerParticipant(userId) {
    await fetch(`/project/${projetId}/user/${userId}`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" }
    });
    getParticipantsList();
  }

  async function ajouterBenevole() {
    const selectedBenevole = arrayBenevolesDB[selectedBenevoleIndex];
    const benevoleAlreadyInProject = arrayAddedAlreadyBenevoles.find((benevole) => benevole.user_id === selectedBenevole.user_id);
    if (benevoleAlreadyInProject) {
      alert("You have already added this person");
      return;
    }

    const body = {user_id: selectedBenevole.user_id};
    await fetch(`/project/${projetId}/benevole`, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)
    });
    getParticipantsList();
    setSelectedBenevoleIndex('');
  }

  const supprimerLeProjet = async e => {
    try {
        await fetch(`/project/${projetId}`, { method: 'DELETE' });
        alert("Le projet a ete supprimé");
        history.push('/membre/mesProjets');
    } catch (err) {
        alert("Une erreur s'est produite, veuillez reessayer");
    }
  }

  //Edit info part
  const getProjectDetail = async () => {
    try {
      const response = await fetch(`/project/${projetId}`);
      const jsonData = await response.json();
      dispatch({ type: 'LOAD', payload: jsonData });
    } catch (err) {
      console.log(err.message);
    }
  };

  const getParticipantsList = async () => {
      const responseMembre = await fetch(`/project/${projetId}/members`);
      const jsonDataMembreList = await responseMembre.json();
      setArrayAddedAlreadyMembers(jsonDataMembreList);

      const responseBenevole = await fetch(`/project/${projetId}/benevoles`);
      const jsonDataBenevoleList = await responseBenevole.json();
      setArrayAddedAlreadyBenevoles(jsonDataBenevoleList)

      const responseAllMembre = await fetch(`/project/${projetId}/available-members`);
      const jsonDataAllMemberList = await responseAllMembre.json();
      setArrayMembersDB(jsonDataAllMemberList);

      const responseAllBenevole = await fetch(`/project/${projetId}/available-benevoles`);
      const jsonDataAllBenevoleList = await responseAllBenevole.json();
      setArrayBenevolesDB(jsonDataAllBenevoleList);
  };

  const updateProject = async (body) => {
    try {
      const response = await fetch(`/project/${projetId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
  };

  const handleEdit = async () => {
    try {
      const uploadTask = storage.ref(`images/${nomImage?.image || currentProject.nameimg}`).put(nomImage);
      uploadTask.on("state_changed", snapshot => { }, error => {
        updateProject(currentProject);
        console.log(error);
      }, () => {
        storage
          .ref("images")
          .child(nomImage.name)
          .getDownloadURL()
          .then(async image => updateProject({ ...currentProject, image }));
      });
    } catch (err) {
        updateProject(currentProject);
    }
  }

  const handleChangeFile = e => {
      if (e.target.files[0]) {
          setNomImage(e.target.files[0]);
      }
  };

  useEffect(() => {
    getParticipantsList();
    getProjectDetail();
  }, [projetId])

  return (
    <div style={{ textAlign: 'left' }} >
      <div style={{ fontSize: '18px' }}>
        <h1 className="mb-2">
          {currentProject.titre}
          {isCurrentUserResponsable && (
            <EditProjects content={currentProject.titre} setContent={(value) => editProjectInfo('titre', value)} />
          )}
        </h1>
        <p>
          {currentProject.description}
          {isCurrentUserResponsable && (
            <EditProjects content={currentProject.description} setContent={(value) => editProjectInfo('description', value)} />
          )}
        </p>
        <Row>
          <Col className="mr-4" lg={5} sm={12}>
            <Image fluid src={currentProject.image} />
            {isCurrentUserResponsable && (
              <input type="file" onChange={handleChangeFile} className="btn btn-info btn-circle btn-sm" id="exampleFormControlFile1" />
            )}
          </Col>
          <Col className="mr-4" lg={6} sm={12}>
            <p>{currentProject.sommaire}</p>
            {isCurrentUserResponsable && (
              <EditProjects content={currentProject.sommaire} setContent={(value) => editProjectInfo('sommaire', value)} />
            )}
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
          </Col>
          <Col>
            {isCurrentUserResponsable && (
              <div style={{ display: 'inline-block' }}>
                <DropdownButton style={{ float: 'left' }} variant="info" onSelect={(value) => editProjectInfo('statutprojet', value)} id="dropdown-basic-button" title="Statut Projet">
                  <Dropdown.Item eventKey="Proposé">Proposé</Dropdown.Item>
                  <Dropdown.Item eventKey="Soumis">Soumis</Dropdown.Item>
                  <Dropdown.Item eventKey="Approuvé">Approuvé</Dropdown.Item>
                  <Dropdown.Item eventKey="Actif">Actif</Dropdown.Item>
                  <Dropdown.Item eventKey="Terminé">Terminé</Dropdown.Item>
                  <Dropdown.Item eventKey="Gelé">Gelé</Dropdown.Item>
                </DropdownButton>
                <span style={{ float: 'right' }} className="pl-2 pt-2">{currentProject.statutprojet}</span>
              </div>
            )}
          </Col>
        </Row><br />
        <Row>
        <Col>
            <p>
              <b>Date début estimée:</b> {moment(currentProject.debutestime).format('ll')}
              {isCurrentUserResponsable && (
                <ModifierDate date={currentProject.debutestime} setDate={(newDate) => editProjectInfo('debutestime', newDate) } />
              )}
            </p>
          </Col>
          <Col>
            <p>
              <b>Date fin estimé:</b> {moment(currentProject.finestime).format('ll')}
              {isCurrentUserResponsable && (
                <ModifierDate date={currentProject.finestime} setDate={(newDate) => editProjectInfo('finestime', newDate)} />
              )}
            </p>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col lg={3} >
            <p><b>Montant amassé:</b></p>
          </Col>
          <Col lg={9} >
            <ProgressBar className="mt-2" striped variant="success" now={currentProject.totalfondscoll ?? 0} max={currentProject.objectif} label={`${currentProject.totalfondscoll ?? 0}$`} />
          </Col>
        </Row>
      </div>
      <hr />

      {isCurrentUserResponsable && (
        <Row >
          <Col>
            <ParticipantDisponibleList participantList={arrayMembersDB} setID={setSelectedMemberIndex} optionName="Choisissez un membre" selectedValue={selectedMemberIndex} /><br />
            <ButtonPG style={{minWidth: '200px'}} className="mb-2" variant="teal" onClick={ajouterMembre}><b>+</b> Ajouter</ButtonPG><br />
            <ParticipantList participantList={arrayAddedAlreadyMembers} supprimerParticipant={supprimerParticipant} />
          </Col>
          <Col>
            <ParticipantDisponibleList participantList={arrayBenevolesDB} setID={setSelectedBenevoleIndex} optionName="Choisissez un bénévole" selectedValue={selectedBenevoleIndex}/><br />
            <ButtonPG style={{minWidth: '200px'}} className="mb-2" variant="teal" onClick={ajouterBenevole}><b>+</b> Ajouter</ButtonPG><br />
            <ParticipantList participantList={arrayAddedAlreadyBenevoles} supprimerParticipant={supprimerParticipant} />
          </Col>
          <Col style={{ textAlign: 'center' }}>
            <ButtonPG onClick={handleEdit} className="px-4">Enregistrer Projet</ButtonPG><br /><br />
            <ButtonPG onClick={supprimerLeProjet} className="px-4">Supprimer Projet</ButtonPG>
          </Col>
        </Row>
      )}
    </div>
  );
}


export default ProjetDetails;