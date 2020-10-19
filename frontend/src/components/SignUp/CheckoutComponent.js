import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {useHistory} from "react-router-dom";
import OnMemberPayment from "./onMemberPayment";


const CheckoutComponent = ({price, source, user_id}) => {
    const history = useHistory();
    const priceForStripe = price*100;
    const type = source;
    const publishableKey = 'pk_test_51HYwKuBamjKTPrkZqdhyI3YZ8enwYg3TAeGcNt7mwP5cOgPliDZDW1oEJ5ZwHMleyKUYceYkHUkSe1rVVOVb6Yxt000IGUfKG3';


    const successPayment = () => {
        if(type === 'membership'){
            alert('Payement réussi!');
            OnMemberPayment(user_id);
            history.push('/');
        } else{
            alert('Donation réussi!');
        }
    };

    const declinedPayment = () => {
        if(type === 'membership'){
            alert('Payement refusé! \n Carte refusé');
        } else{
            alert('Donation échoué! \n Carte refusé');
        }

    };
    const errorPayment = () => {
        alert('Erreur de contact avec Stripe');
    };

    const onToken = async (token) => {

        const body = {
            amount: priceForStripe,
            token: token.id
        };
        const response = await fetch(`/payment`, {
            method: "POST",
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify({stripeToken: token.id,
                amount:priceForStripe,
                description:source})
        })
            .then (res => {
                console.dir(res.ok);
                if(!res.ok) {
                    declinedPayment();
                }
                else{
                    successPayment();
                }
            })
            .catch(errorPayment);
    };


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