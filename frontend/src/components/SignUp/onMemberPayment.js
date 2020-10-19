import React from 'react';
import moment from "moment";

async function OnMemberPayment(user_id) {
    let inscription = moment().format("YYYY-MM-DD");
    const statusAd = "Actif";

    try{
        const body = {user_id,inscription,statusAd};

        const response = await fetch(`/user/memberCreation`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });
    }catch (err) {
        console.log(err.message);
        alert("Problème lors de la connection au serveur.")
    }
}

export default OnMemberPayment;