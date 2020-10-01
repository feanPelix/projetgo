import React, {useState} from "react";
import {Button, Container, Form} from 'react-bootstrap';
import {useHistory} from "react-router-dom";
import moment from "moment";


function FormulaireSignUpBenevole(props) {
    const history = useHistory();

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [courriel, setCourriel] = useState("");
    const [confirmCourriel, setConfirmCourriel] = useState("");
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
        return (nom && prenom && courriel && password && numCivique && rue && ville && province && pays && codePostal)
    }

    // True == Has Errors || False == Good to go
    function validateFields() {
        var hasErrors = false;
        var errorMessage = "";

        if (password !== confirmPassword) {
            errorMessage += "Mot de passe ne concorde pas. \n";
            hasErrors = true;
        }
        if (courriel !== confirmCourriel) {
            errorMessage += "Courriel ne concorde pas. \n";
            hasErrors = true;
        }
        if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(courriel))) {
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
        return hasErrors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateFields()) {
            return;
        } else {
            try {
                var phone = "555-111-3333"; //temp
                var adresse = (numCivique + rue);
                var date = moment().format("DD/MM/YYYY");
                const body = {nom, prenom, courriel, phone, adresse, date}; //inscription = date
                const response = await fetch("http://localhost:5000/utilisateur/", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                });

                window.location = "/";
                history.push('/login');
            } catch (err) {
                console.log(err.message);
                alert("Problème lors de la connection au serveur.")
            }
        }
    }

    return (
        <div style={{backgroundColor: '#138496'}}>
        <Container>

                <hr style={{backgroundColor: 'white '}}/>
                <h4 style={{color: 'white'}}>INSCRIPTION BENEVOLE</h4>
                <hr style={{backgroundColor: 'white'}}/>
                <Form onSubmit={handleSubmit} controlId={"FormSignUp"} className="m-5">
                    <Form.Row>
                        <Form.Group as={"Col"} controlId={"formGridNom"}>
                            <Form.Control type={"text"} placeholder={"Nom"} value={nom}
                                          onChange={e => setNom(e.target.value)}/>
                        </Form.Group>
                        <Form.Group as={"Col"} controlId={"formGridPrenom"}>
                            <Form.Control type={"text"} placeholder={"Prenom"} value={prenom}
                                          onChange={e => setPrenom(e.target.value)}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={"Col"} controlId={"formGridCourriel"}>
                            <Form.Control type={"email"} placeholder={"Courriel"} value={courriel}
                                          onChange={e => setCourriel(e.target.value)}/>
                        </Form.Group>
                        <Form.Group as={"Col"} controlId={"formGridConfirmationCourriel"}>
                            <Form.Control type={"email"} placeholder={"Confirmer courriel"} value={confirmCourriel}
                                          onChange={e => setConfirmCourriel(e.target.value)}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={"Col"} controlId={"formGridPassword"}>
                            <Form.Control type={"password"} placeholder={"Mot de passe"} value={password}
                                          onChange={e => setPassword(e.target.value)}/>
                        </Form.Group>
                        <Form.Group as={"Col"} controlId={"formGridConfirmationPassword"}>
                            <Form.Control type={"password"} placeholder={"Confirmer mot de passe"}
                                          value={confirmPassword}
                                          onChange={e => setConfirmPassword(e.target.value)}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={"Col"} controlId={"formGridNumeroCivique"}>
                            <Form.Control type={"text"} placeholder={"Numéro civique"} value={numCivique}
                                          onChange={e => setNumCivique(e.target.value)}/>
                        </Form.Group>
                        <Form.Group as={"Col"} controlId={"formGridRue"}>
                            <Form.Control type={"text"} placeholder={"Rue"} value={rue}
                                          onChange={e => setRue(e.target.value)}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={"Col"} controlId={"formGridCodePostal"}>
                            <Form.Control type={"text"} placeholder={"Code postal"} value={codePostal}
                                          onChange={e => setCodePostal(e.target.value)}/>
                        </Form.Group>
                        <Form.Group as={"Col"} controlId={"formGridVille"}>
                            <Form.Control type={"text"} placeholder={"Ville"} value={ville}
                                          onChange={e => setVille(e.target.value)}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={"Col"} controlId={"formGridProvince"}>
                            <Form.Control type={"text"} placeholder={"Province"} value={province}
                                          onChange={e => setProvince(e.target.value)}/>
                        </Form.Group>
                        <Form.Group as={"Col"} controlId={"formGridPays"}>
                            <Form.Control type={"text"} placeholder={"Pays"} value={pays}
                                          onChange={e => setPays(e.target.value)}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={"Col"} controlId={"formCompetences"}>
                            <Form.Control type={"textarea"} placeholder={"Compétences"} value={competences}
                                          onChange={e => setCompetences(e.target.value)}/>
                        </Form.Group>
                        <Form.Group as={"Col"} controlId={"formGridText"}>
                            <Form.Label>
                                *Que vous pouvez apporter à un projet.
                            </Form.Label>
                        </Form.Group>
                    </Form.Row>

                    <Button variant={"warning"} type={"submit"} disabled={!validateEmptyField()}>
                        S'inscrire
                    </Button>
                </Form>

        </Container>
        </div>
        //TODO PROGRESS BAR
    )
}

export default FormulaireSignUpBenevole;