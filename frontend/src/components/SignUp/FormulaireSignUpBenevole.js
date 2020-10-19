import React, {useState} from "react";
import {Button, Container, Form} from 'react-bootstrap';
import {useHistory} from "react-router-dom";
import moment from "moment";


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
        <div style={{backgroundColor: '#138496'}}>
        <Container>

                <hr style={{backgroundColor: 'white '}}/>
                <h4 style={{color: 'white'}}>INSCRIPTION BÉNÉVOLES</h4>
                <hr style={{backgroundColor: 'white'}}/>
                <Form onSubmit={handleSubmit} controlId={"FormSignUp"} className="m-5" style={{margin:"auto"}} >
                    <Form.Row >
                        <Form.Group as={"Col"} controlId={"formGridNom"} style={{margin:"0px 20px 2px 5px"}}>
                            <Form.Control type={"text"} placeholder={"Nom"} value={nom}
                                          onChange={e => setNom(e.target.value)}/>
                        </Form.Group>
                        <Form.Group as={"Col"} controlId={"formGridPrenom"} style={{margin:"0px 20px 10px 5px"}}>
                            <Form.Control type={"text"} placeholder={"Prenom"} value={prenom}
                                          onChange={e => setPrenom(e.target.value)}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={"Col"} controlId={"formGridCourriel"} style={{margin:"0px 20px 10px 5px"}}>
                            <Form.Control type={"email"} placeholder={"Courriel"} value={email}
                                          onChange={e => setEmail(e.target.value)}/>
                        </Form.Group>
                        <Form.Group as={"Col"} controlId={"formGridConfirmationCourriel"} style={{margin:"0px 20px 10px 5px"}}>
                            <Form.Control type={"email"} placeholder={"Confirmer courriel"} value={confirmEmail}
                                          onChange={e => setConfirmEmail(e.target.value)}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={"Col"} controlId={"formGridPassword"} style={{margin:"0px 20px 10px 5px"}}>
                            <Form.Control type={"password"} placeholder={"Mot de passe"} value={password}
                                          onChange={e => setPassword(e.target.value)}/>
                        </Form.Group>
                        <Form.Group as={"Col"} controlId={"formGridConfirmationPassword"} style={{margin:"0px 20px 10px 5px"}}>
                            <Form.Control type={"password"} placeholder={"Confirmer mot de passe"}
                                          value={confirmPassword}
                                          onChange={e => setConfirmPassword(e.target.value)}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={"Col"} controlId={"formGridNumeroCivique"} style={{margin:"0px 20px 10px 5px"}}>
                            <Form.Control type={"text"} placeholder={"Numéro civique"} value={numCivique}
                                          onChange={e => setNumCivique(e.target.value)}/>
                        </Form.Group>
                        <Form.Group as={"Col"} controlId={"formGridRue"} style={{margin:"0px 20px 10px 5px"}}>
                            <Form.Control type={"text"} placeholder={"Rue"} value={rue}
                                          onChange={e => setRue(e.target.value)}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={"Col"} controlId={"formGridCodePostal"} style={{margin:"0px 20px 10px 5px"}}>
                            <Form.Control type={"text"} placeholder={"Code postal"} value={codePostal}
                                          onChange={e => setCodePostal(e.target.value)}/>
                        </Form.Group>
                        <Form.Group as={"Col"} controlId={"formGridVille"} style={{margin:"0px 20px 10px 5px"}}>
                            <Form.Control type={"text"} placeholder={"Ville"} value={ville}
                                          onChange={e => setVille(e.target.value)}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={"Col"} controlId={"formGridProvince"} style={{margin:"0px 20px 10px 5px"}}>
                            <Form.Control type={"text"} placeholder={"Province"} value={province}
                                          onChange={e => setProvince(e.target.value)}/>
                        </Form.Group>
                        <Form.Group as={"Col"} controlId={"formGridPays"} style={{margin:"0px 20px 10px 5px"}}>
                            <Form.Control type={"text"} placeholder={"Pays"} value={pays}
                                          onChange={e => setPays(e.target.value)}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={"Col"} controlId={"formCompetences"} style={{margin:"0px 20px 10px 5px"}}>
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
    )
}

export default FormulaireSignUpBenevole;