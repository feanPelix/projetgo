import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import AfficherMessage from './AfficherMessage';
import { Form, Col, Row, Button, InputGroup, FormControl, ListGroup, Nav } from "react-bootstrap";
import { Modal, ModalBody } from 'react-bootstrap';
import ButtonPG from '../Buttons/ButtonPG/ButtonPG';
import { useHistory } from 'react-router-dom';
import './Login.css';

export default function Login() {
  return null;
  // const { dispatch } = useContext(AuthContext);
  // const [show, setShow] = useState(false);

  // const initialState = {
  //   email: "",
  //   password: "",
  //   isSubmitting: false,
  //   erroMessage: null,
  // };

  // const [data, setData] = useState(initialState);

  // const handleInputChange = event => {
  //   setData({
  //     ...data,
  //     [event.target.name]: event.target.value,
  //   });
  // }

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();

  //   setData({
  //     ...data,
  //     isSubmitting: true,
  //     errorMessage: null,
  //   });

  //   try {
  //     const response = await fetch('http://localhost:5000/login', {
  //       method: 'post',
  //       headers: { 
  //         'Content-Type': 'application/json'
  //       }, 
  //       body: JSON.stringify({
  //         username: data.email,
  //         password: data.password,
  //       }),
  //     });

  //     if (response.ok) {
  //       const resJson = await response.json();
  //       dispatch({
  //         type: 'LOGIN',
  //         payload: resJson,
  //       });
  //     } else {
  //       throw response;
  //     }      
  //   } catch (error) {
  //     setData({
  //       ...data,
  //       isSubmitting: false,
  //       errorMessage: error.message || error.statusText,
  //     });
  //   }

  // }

  // return (
  //   <>
  //     <Nav.Link onClick={() => setShow(true)}>
  //       LOGIN
  //     </Nav.Link>
    
  //     <Modal
  //       className="login"
  //       show={show}
  //       onHide={() => setShow(false)}
  //       centered
  //     >
  //       <Modal.Header >
  //         <Modal.Title>
  //           Connexion
  //         </Modal.Title>
  //       </Modal.Header>

  //       <ModalBody>
  //           <InputGroup className="mx-5 mb-4">              
  //             <Form.Control
  //               name="email"
  //               value={data.email}
  //               onChange={handleInputChange}
  //               placeholder="Courriel"
  //             />
  //           </InputGroup>
  //           <InputGroup className="mx-5 mb-4">
  //             <Form.Control
  //               type="password"
  //               name="password"
  //               value={data.password}
  //               onChange={handleInputChange}
  //               placeholder="Mot de passe"
  //             />
  //           </InputGroup>
  //         {data.erroMessage && (
  //           <span className="error">{data.erroMessage}</span>
  //         )}
  //       </ModalBody>

  //       <Modal.Footer>
  //         <ButtonPG
  //           className="btn-go"
  //           text={data.isSubmitting ? ('...') : ('GO')}
  //           variant="orange"
  //           onClick={handleFormSubmit}
  //           disabled={data.isSubmitting}
  //         />
  //       </Modal.Footer>
  //     </Modal>
  //   </>
  // )
}
