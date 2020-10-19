import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {useHistory} from "react-router-dom";
import moment from "moment";
import OnMemberPayment from "./onMemberPayment";


const CheckoutComponent = ({price, source, user_id}) => {
    const history = useHistory();
    const priceForStripe = price * 100;
    const type = source;
    const publishableKey = 'pk_test_51HYwKuBamjKTPrkZqdhyI3YZ8enwYg3TAeGcNt7mwP5cOgPliDZDW1oEJ5ZwHMleyKUYceYkHUkSe1rVVOVb6Yxt000IGUfKG3';

    /*
    const successPayment = data => {
        alert('Payement réussi!');
    };

    const errorPayment = data => {
        alert('Payment Error');
    };
*/

    const onToken = (token) => {
        console.log(token);
        if (type === "membership") {
            alert('Payement réussi!');
            //console.log(user_id);
            OnMemberPayment(user_id);
            history.push('/');
        } else if (type === "don") {
            alert('Don réussi!');
        }
    };

    /*
    const onToken = async (token) => {

        const response = await fetch(`/pay`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: token
            }).then(successPayment).catch(errorPayment);
        }
    }
*/
    return (
        <StripeCheckout
            label='Payer Maintenant 💳'
            name='ProjetGO'
            billingAddress
            image='https://i.imgur.com/MDl3K0o.jpg'
            description={`Votre total est $${price}`}
            amount={priceForStripe}
            panelLabel='Payer'
            token={onToken}
            locale="auto"
            stripeKey={publishableKey}
        />
    )
}

export default CheckoutComponent;