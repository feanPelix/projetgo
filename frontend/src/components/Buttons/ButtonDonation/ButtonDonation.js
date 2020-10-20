import React from 'react';
import ButtonPG from '../ButtonPG/ButtonPG';
import './ButtonDonation.css';
import { useHistory } from "react-router-dom";

export function ButtonDonation({projectID}) {

    let history = useHistory();

    const handleClick = async (event) => {
      event.preventDefault();
      try {
          const response = await fetch(`/project/${projectID}`);
          const jsonData = await response.json();
          if (!response.ok) {
              alert("Requête refusée");
              return;
          } else {
              if(jsonData.statutprojet != "Actif") {
                  alert("Le project n'est pas actif");
                  return;
              } else{
                  const res = await fetch(`/project/${projectID}/campaign`)
                  const jsonDataFund = await  res.json();
                  console.log(res);
                  if (!res.ok) {
                      alert("Le projet n'accepte pas de dons pour le moment.");
                      return;
                  } else {
                      history.push({
                          pathname: '/donation',
                          state: { id:jsonDataFund.fundraising_id, projet:jsonData.titre}
                      });
                  }
              }
          }
      }catch (error){
          console.log(error.message);
          alert("Erreur de communication avec la base de données.");
      }
  };

  return (
    <ButtonPG
      text="Faire un don"
      variant="orange"
      onClick={handleClick}
    />
  );
}

export default ButtonDonation;