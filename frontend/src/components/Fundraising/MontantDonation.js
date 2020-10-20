import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CheckoutComponent from "../SignUp/CheckoutComponent";

function MontantDonation() {
    const [montant, setMontant] = useState();
    const location = useLocation();
    const [fundraising_id, setFundraising_Id] = useState();
    const [showPayButton, setShowPayButton] = useState(false);

    useEffect(() => {
        setFundraising_Id(location.state.id);

    }, [location]);

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const handleOnChange = (event) => {
        setMontant(event.target.value);
        if(montant >= 1){
            setShowPayButton(true)
        }else {
            setShowPayButton(false)
        }
    }


    return (
        <Form onSubmit={handleSubmit}>
            <Form.Label className="mx-4 mb-2"> Donation pour le projet: </Form.Label>
            <Form.Label className="mx-10 mb-2" >{location.state.projet} </Form.Label>
            <Form.Text className="mx-5"> Entrez le montant de votre donation </Form.Text>
            <Form.Control
                name="montant"
                value={montant}
                onChange={handleOnChange}
                placeholder="Minimum 1 $"
                isInvalid={montant < 1}
                type={"number"}
            />
            <Form.Row className="justify-content-md-center p-2">
            { showPayButton  && (<CheckoutComponent price={montant} source={'don'} fundraising_id={fundraising_id}/>) }
            </Form.Row>
        </Form>
    )
}
export default MontantDonation;
