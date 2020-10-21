import moment from "moment";

async function OnDonation( res, fundraising_id, price, resCard ) {
    const datedon = moment().format("YYYY-MM-DD");

    const fundraising = fundraising_id;
    const montant = price;
    const typepaiement = res.type;
    const nom = res.card.name;
    const prenom = "N/A";
    const email = res.email;
    const phone = "514-333-1234";
    const adresse = resCard;

    try{
        const body = {fundraising, datedon, montant, typepaiement, nom, prenom, email, phone, adresse};

        const response = await fetch(`/payment/don`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });
    } catch (err) {
        console.log(err.message);
        alert("Problème lors de création du don.")
    }
}

export default OnDonation;
