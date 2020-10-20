import React, {useState} from "react";
import {Col, Form} from 'react-bootstrap';
import moment from "moment";
import CheckoutComponent from "./CheckoutComponent";
import './Signup.css';
import ButtonPG from "../Buttons/ButtonPG/ButtonPG";


function FormulaireSignUpMembre(props) {
    const [showPayButton, setShowPayButton] = useState(false);
    const [userId,setUserId] = useState("");

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

    function validateEmptyField() {
        return (nom && prenom && email && password && numCivique && rue && ville && province && pays && codePostal)
    }

    // True == Has Errors || False == Good to go
    function validateFields() {
        let hasErrors = false;
        let errorMessage = "";

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
        return hasErrors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateFields()) {
            return;
        } else {
            let phone = "5551113333";
            let adresse = (numCivique + " " + rue);
            let inscription = moment().format("YYYY-MM-DD");

            try {
                const body = {nom, prenom, email, phone, adresse, inscription, codePostal, ville, province, pays, password};  //inscription = date
                const response = await fetch(`/user`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                });
                const jsonData=await response.json();

                if(!response.ok){
                    alert("Ce courriel est déjà utilisé.");
                    return;
                }
                else{
                    setUserId(jsonData.user_id);
                    console.log(userId);
                    console.log(jsonData);
                    alert("Création de compte réussite!");
                    setShowPayButton(true);
                }
            } catch (err) {
                console.log(err.message);
                alert("Problème lors de la connection au serveur.")
            }
        }
    }

    return (
        <Form onSubmit={handleSubmit} controlId={"FormSignUp"} className="m-5 signup">
            <hr/>
            <h4>INSCRIPTION MEMBRE</h4>
            <hr/>
            <Form.Row>
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
                <Form.Group as={Col} controlId={"formGridCourriel"} >
                    <Form.Control type={"email"} placeholder={"Courriel"} value={email}
                        onChange={e => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group as={Col} controlId={"formGridConfirmationCourriel"} >
                    <Form.Control type={"email"} placeholder={"Confirmer courriel"} value={confirmEmail}
                        onChange={e => setConfirmEmail(e.target.value)} />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId={"formGridPassword"} >
                    <Form.Control type={"password"} placeholder={"Mot de passe"} value={password}
                        onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group as={Col} controlId={"formGridConfirmationPassword"} >
                    <Form.Control type={"password"} placeholder={"Confirmer mot de passe"}
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)} />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId={"formGridNumeroCivique"} >
                    <Form.Control type={"text"} placeholder={"Numéro civique"} value={numCivique}
                        onChange={e => setNumCivique(e.target.value)} />
                </Form.Group>
                <Form.Group as={Col} controlId={"formGridRue"} >
                    <Form.Control type={"text"} placeholder={"Rue"} value={rue}
                        onChange={e => setRue(e.target.value)} />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId={"formGridCodePostal"} >
                    <Form.Control type={"text"} placeholder={"Code postal"} value={codePostal}
                        onChange={e => setCodePostal(e.target.value)} />
                </Form.Group>
                <Form.Group as={Col} controlId={"formGridVille"} >
                    <Form.Control type={"text"} placeholder={"Ville"} value={ville}
                        onChange={e => setVille(e.target.value)} />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId={"formGridProvince"} >
                    <Form.Control type={"text"} placeholder={"Province"} value={province}
                        onChange={e => setProvince(e.target.value)} />
                </Form.Group>
                <Form.Group as={Col} controlId={"formGridPays"} >
                    <Form.Control type={"text"} placeholder={"Pays"} value={pays}
                        onChange={e => setPays(e.target.value)} />
                </Form.Group>
            </Form.Row>
            <Form.Row className="justify-content-md-center p-2">
                <ButtonPG
                    className="btn-go"
                    type={"submit"}
                    disabled={!validateEmptyField()}
                >
                    Continuer
                </ButtonPG>
            </Form.Row>
            <Form.Row className="justify-content-center p-2">
                <h4>Paiement unique de 50$</h4>
                <Form.Text className="pl-2">
                    *Valide pour 1 an
                </Form.Text>
            </Form.Row>
            <Form.Row className="justify-content-md-center p-2">
                { showPayButton && (<CheckoutComponent price={50} source={"membership"} user_id={userId} />)}
            </Form.Row>
        </Form>
    )
}

export default FormulaireSignUpMembre;