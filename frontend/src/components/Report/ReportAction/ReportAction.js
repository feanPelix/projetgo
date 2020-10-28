import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button, InputGroup, Form} from 'react-bootstrap';
import './ReportAction.css';

function ReportAction(props) {
  const initialState = {
    projet: props.action.projet,
    update: '',
    completed: '',
    reported: '',
    etatrisque: '',
  };
  let title = '';
  let desc = '';
  let body = '';
  let req;
  const [data, setData] = useState(initialState);

  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  }

  // Formulaire pour ajout et modif de rapport
  const form = (
    <>
      <InputGroup>
        <Form.Control
          name="update"
          value={data.update}
          onChange={handleInputChange}
          placeholder="Titre"
        />
      </InputGroup>
      <InputGroup>
        <Form.Control
          as="textarea"
          rows="3"
          name="completed"
          value={data.completed}
          onChange={handleInputChange}
          placeholder="Sommaire"
        />
      </InputGroup>
      <InputGroup>
        <Form.Control
          name="reported"
          value={data.reported}
          onChange={handleInputChange}
          placeholder="Reporté"
        />
      </InputGroup>
      <InputGroup>
        <Form.Control
          as="select"
          name="etatrisque"
          value={data.etatrisque}
          onChange={handleInputChange}
          placeholder="etat risque"
        >
          <option>Élevé</option>
          <option>Moyen</option>
          <option>Faible</option>
        </Form.Control>
      </InputGroup>
    </>
  );

  if (props.visibility) {
    if (props.action.desc === "delete") {
      title = 'Supprimer un rapport';
      desc = 'Souhaitez-vous vraiment supprimer ce rapport ?';
      req = async () => {
        try {
          const res = await fetch(`/report/${props.action.reportID}`, {
            method: 'delete',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (res.ok) {
            props.handleClose();
            props.handleReload();
          } else {
            alert('Erreur lors de la suppression.');
            props.handleClose();
          }
        } catch (err) {
          console.log(err.stack)
        }
      };
    }
    else if (props.action.desc === "modif") {
      title = 'Modification de rapport';
      desc = '*Attention. Le rapport sera remplacé par les valeurs entrées ici.'
      body = form;
      req = async () => {
        try {
          const res = await fetch(`/report/${props.action.reportID}`, {
            method: 'put',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              update: data.update,
              completed: data.completed,
              reported: data.reported,
              etatrisque: data.etatrisque
            })
          });

          if (res.ok) {
            props.handleClose();
            props.handleReload();
          } else {
            alert('Erreur lors de la modification.');
            props.handleClose();
          }
        } catch (err) {
          console.log(err.stack);
        }
      };
    }
    else if (props.action.desc === "ajout") {
      console.log(data.projet);
      title = 'Ajout de rapport';
      desc = 'Veuillez remplir les champs suivants :';
      body = form;
      req = async () => {
        try {
          const res = await fetch(`/report/${data.projet}`, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              projet: props.action.projet,
              update: data.update,
              completed: data.completed,
              reported: data.reported,
              etatrisque: data.etatrisque
            })
          });

          if (res.ok) {
            props.handleClose();
            props.handleReload();
          } else {
            alert('Erreur lors de l\'ajout.');
            props.handleClose();
          }
        } catch (err) {
          console.log(err.stack)
        }
      };
    }
  }

  return (
    <Modal
      show={props.visibility}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {desc}
        {body}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={req}>Submit</Button>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReportAction;