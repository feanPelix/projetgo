import React from 'react';
import Table from 'react-bootstrap/Table';

export default function DonationsListing({donations}) {
  return(
    <Table
      bordered 
      hover 
      size="sm"
    >
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Courriel</th>
          <th>Date</th>
          <th>Montant</th>
        </tr>
      </thead>
      <tbody>
        {donations.map(donation => {
          return (
            <tr>
              <td>{donation.nom}</td>
              <td>{donation.prenom}</td>
              <td>{donation.email}</td>
              <td>{donation.datedon}</td>
              <td>{donation.montant}</td>
            </tr>
          );  
        })}
      </tbody>
    </Table>
  );
}