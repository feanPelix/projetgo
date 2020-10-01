import React, {useState} from "react";
import StripeCheckout from 'react-stripe-checkout';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";

function FormulairePayment(props) {
    /*Stripe intégration
    onToken = (token, addresses) => {
        // TODO: Send the token information and any other
        // relevant information to your payment process
        // server, wait for the response, and update the UI
        // accordingly. How this is done is up to you. Using
        // XHR, fetch, or a GraphQL mutation is typical.
    };

    <StripeCheckout
        stripeKey="your_PUBLISHABLE_stripe_key"
        token={this.onToken}
      />
    */
    return (
        <StripeCheckout
            amount={5000}
            description={"Devenir membre pour un an"}
            locale="auto"
            label={"Pay {{amount}} with 💳"}
        />
    );
}

export default FormulairePayment;