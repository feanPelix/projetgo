import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AfficherMessage from './AfficherMessage';
import { Form, Col, Row,Button,InputGroup,FormControl,ListGroup } from "react-bootstrap";
import {useHistory} from 'react-router-dom';

function Formulaire(props) {
    const history = useHistory();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitForm=async(event)=> {

        // Check whether the password and username are correct by sending the request to the backend.
        event.preventDefault();
        try{

            const response = await fetch(`http://localhost:5000/login/${userName}/${password}`,{
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
        const checkResult = jsonData.check;
        if (checkResult==true) {
            console.log(jsonData.userID);
            props.setLoggedInMemberID(jsonData.userID);
            props.setLoggedin(true);
            history.push('/welcome');
        }else{
            setCredentials('\n' + 'E-mail ou mot de passe incorret, veuillez réessayer.');
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
                    <Form.Control value={userName} onChange={e => setUserName(e.target.value)} className="px-5" placeholder="Courriel" />
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

