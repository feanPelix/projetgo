import React, {useState} from "react";
import { Col, Form} from 'react-bootstrap';
import {useHistory} from "react-router-dom";
import moment from "moment";
import ButtonPG from "../Buttons/ButtonPG/ButtonPG";
import './Signup.css';


function FormulaireSignUpBenevole(props) {
    const history = useHistory();

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [numCivique, setNumCivique] = useState("");
    const [rue, setRue] = useState("");
    const [ville, setVille] = useState("");
    const [province, setProvince] = useState("");
    const [pays, setPays] = useState("");
    const [codePostal, setCodePostal] = useState("");
    const [competences, setCompetences] = useState("");

    function validateEmptyField() {
        return (nom && prenom && email && password && numCivique && rue && ville && province && pays && codePostal)
    }

    // False == Has Errors || True == Good to go
    function isInputValid() {
        var hasErrors = false;
        var errorMessage = "";

        if (password !== confirmPassword) {
            errorMessage += "Mot de passe ne concorde pas. \n";
            hasErrors = true;
        }
        if (email !== confirmEmail) {
            errorMessage += "Courriel ne concorde pas. \n";
            hasErrors = true;
        }
        if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email))) {
            errorMessage += "Format de courriel invalide. \n";
            hasErrors = true;
        }
        if (!(/^[a-zA-Z]{1}[0-9]{1}[a-zA-Z]{1}[- ]{0,1}[0-9]{1}[a-zA-Z]{1}[0-9]{1}/.test(codePostal))) {
            errorMessage += "Format de code postal est invalide. \n";
            hasErrors = true;
        }
        if (hasErrors) {
            alert(errorMessage);
        }
        return !hasErrors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isInputValid()) {
            var phone = "5551113333";
            var adresse = (numCivique + " " + rue);
            var inscription = moment().format("YYYY-MM-DD");

            try {
                const body = {nom, prenom, email, phone, adresse, inscription, codePostal, ville, province, pays, password}; //inscription = date d'inscription
                const response = await fetch(`/user`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                });
                const jsonData=await response.json();
                console.log(jsonData);

                if(!response.ok){
                    alert("Ce courriel est déjà utilisé.");
                    return;
                } else{
                    alert("Création de compte réussite!")
                    history.push('/');
                }
            } catch (err) {
                console.log(err.message);
                alert("Problème lors de la connection au serveur.");
            }
        }
    }

    return (
        <Form onSubmit={handleSubmit} controlId={"FormSignUp"} className="m-5 signup">
            <hr/>
            <h4>INSCRIPTION BÉNÉVOLES</h4>
            <hr/>
            <Form.Row >
                <Form.Group as={Col} controlId={"formGridNom"} >
                    <Form.Control type={"text"} placeholder={"Nom"} value={nom}
                        onChange={e => setNom(e.target.value)} />
                </Form.Group>
                <Form.Group as={Col} controlId={"formGridPrenom"} >
                    <Form.Control type={"text"} placeholder={"Prenom"} value={prenom}
                        onChange={e => setPrenom(e.target.value)} />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId={"formGridCourriel"}>
                    <Form.Control type={"email"} placeholder={"Courriel"} value={email}
                        onChange={e => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group as={Col} controlId={"formGridConfirmationCourriel"}>
                    <Form.Control type={"email"} placeholder={"Confirmer courriel"} value={confirmEmail}
                        onChange={e => setConfirmEmail(e.target.value)} />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId={"formGridPassword"}>
                    <Form.Control type={"password"} placeholder={"Mot de passe"} value={password}
                        onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group as={Col} controlId={"formGridConfirmationPassword"}>
                    <Form.Control type={"password"} placeholder={"Confirmer mot de passe"}
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)} />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId={"formGridNumeroCivique"}>
                    <Form.Control type={"text"} placeholder={"Numéro civique"} value={numCivique}
                        onChange={e => setNumCivique(e.target.value)} />
                </Form.Group>
                <Form.Group as={Col} controlId={"formGridRue"}>
                    <Form.Control type={"text"} placeholder={"Rue"} value={rue}
                        onChange={e => setRue(e.target.value)} />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId={"formGridCodePostal"}>
                    <Form.Control type={"text"} placeholder={"Code postal"} value={codePostal}
                        onChange={e => setCodePostal(e.target.value)} />
                </Form.Group>
                <Form.Group as={Col} controlId={"formGridVille"}>
                    <Form.Control type={"text"} placeholder={"Ville"} value={ville}
                        onChange={e => setVille(e.target.value)} />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId={"formGridProvince"}>
                    <Form.Control type={"text"} placeholder={"Province"} value={province}
                        onChange={e => setProvince(e.target.value)} />
                </Form.Group>
                <Form.Group as={Col} controlId={"formGridPays"}>
                    <Form.Control type={"text"} placeholder={"Pays"} value={pays}
                        onChange={e => setPays(e.target.value)} />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId={"formCompetences"}>
                    <Form.Control type={"textarea"} placeholder={"Compétences"} value={competences}
                        onChange={e => setCompetences(e.target.value)} />
                    <Form.Text >
                        *Que vous pouvez apporter à un projet.
                    </Form.Text>
                </Form.Group>
            </Form.Row>
            <Form.Row className="justify-content-md-center p-2">
                <ButtonPG
                    className="btn-go"
                    type="submit"
                    disabled={!validateEmptyField()}
                >
                    S'inscrire
            </ButtonPG>
            </Form.Row>
        </Form>
    )
}

export default FormulaireSignUpBenevole;