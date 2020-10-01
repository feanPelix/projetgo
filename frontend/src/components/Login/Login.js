import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AfficherMessage from './AfficherMessage';
import { Form, Col, Row,Button,InputGroup,FormControl,ListGroup } from "react-bootstrap";
import {useHistory} from 'react-router-dom';

function Formulaire(props) {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    const onSubmitForm=async(event)=> {

        // Check whether the password and username are correct by sending the request to the backend.
        event.preventDefault();
        try{

            const response = await fetch(`http://localhost:5000/login/${email}/${password}`,{
                method:'put',
                Header:{'Content-Type': 'application/json'}
            });
            const jsonData=await response.json();
        // Verify the credentials
            searchCredentials(jsonData);
        }catch(err){
            console.log(err.message);
        }

    }


    const [credentials,setCredentials]=useState('');

    function searchCredentials(jsonData){
        // If the password and username are correct, true will be returned from the backend.
        // If true, then the username will be kept and the pageNumber will be set to 2, displaying
        // the welcome sign.
        // If not, the warning sign will be set.

        if (jsonData==true) {
            props.setMemberSpecific(email);
            props.setLoggedin(true);
            history.push('/welcome');
        }else{
            setCredentials('Incorrect email or password, please try again.');
        }

    }


    return(
        <div style={{backgroundColor: '#138496'}}>
            <hr style={{backgroundColor: 'white '}}/>
                <h4 style={{color: 'white'}}>CONNEXION</h4>
            <hr style={{backgroundColor: 'white'}}/>
            <p style={{fontSize:"15px"}} >{credentials}</p>
            <Form onSubmit={onSubmitForm} className="m-5">
                <Form.Group className="mx-5 mb-4">
                    <Form.Control value={email} onChange={e => setEmail(e.target.value)} className="px-5" placeholder="Courriel" />
                </Form.Group>
                <Form.Group className="mx-5 mb-4">
                    <Form.Control  type="password" className="px-5"  placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)}/>
                </Form.Group>
                <Button style={{background:"orange"}} className="px-5 btn btn-danger" type='submit'>
                    GO
                </Button>
            </Form>
        </div>





    )
}

export default Formulaire;

