import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {useHistory} from "react-router-dom";
import OnMemberPayment from "./onMemberPayment";
import OnDonation from "../Fundraising/OnDonation"

const CheckoutComponent = ({price, source, user_id, fundraising_id}) => {
    const history = useHistory();
    const priceForStripe = price * 100;
    const type = source;
    const publishableKey = 'pk_test_51HYwKuBamjKTPrkZqdhyI3YZ8enwYg3TAeGcNt7mwP5cOgPliDZDW1oEJ5ZwHMleyKUYceYkHUkSe1rVVOVb6Yxt000IGUfKG3';

    function successPayment (res) {
        if(type === 'membership'){
            alert('Payement réussi!');
            OnMemberPayment(user_id);
        } else{
            alert('Donation réussie!');
            let adresseCard = res.card.address_city;
            OnDonation(res, fundraising_id, price, adresseCard);
        }
        history.push('/');
    };

    const declinedPayment = () => {
        if(type === 'membership'){
            alert('Payement refusé! \n Carte refusé');
        } else{
            alert('Donation échoué! \n Carte refusé');
        }

    };

    const montantInvalide = () => {
        alert('Payement refusé! \n Montant invalide.');
    }

    const erreurInfos = () => {
        alert('Informations fournies invalides.');
    }

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
            body: JSON.stringify(
                {stripeToken: token.id,
                amount:priceForStripe,
                description:source})
        } ).then (res => {
                console.log(res);
                if(res.status === 500) {
                    declinedPayment();
                } else if (res.status === 501) {
                    montantInvalide();
                } else if (!res.ok) {
                    erreurInfos();
                } else{
                    successPayment(token);
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
