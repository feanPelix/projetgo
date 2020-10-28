import React from 'react';
import moment from "moment";

async function OnMemberPayment(user_id) {
    let date = moment().format("YYYY-MM-DD");
    const statusAd = "Actif";

    try{
        console.log(user_id);
        const body = {user_id,date,statusAd};

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