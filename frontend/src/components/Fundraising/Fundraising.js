import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ButtonPG from '../Buttons/ButtonPG/ButtonPG';
import DonationsListing from './DonationsListing/DonationsListing';
import NewFundraising from './NewFundraising/NewFundraising';

export default function Fundraising({ match, history }) {
  const [currentCampaign, setCurrentCampaign] = useState(null);
  const [donations, setDonations] =useState([]);
 
  //Need the fundraising for the project
  useEffect( async() => {
    try {
      const response = await fetch(`http://localhost:5000/projects/${match.params.projectId}/campaign`);

      if (!response.ok) {
        throw response;
      }

      const resJson = await response.json();
      setCurrentCampaign(resJson.data.campaign);
    
    } catch(error) {
      console.log(error.message || error.statusText);
    }
  });

  //Need the donations for the project
  useEffect( async() => {
    try {
      const response = await fetch(`http://localhost:5000/projects/${match.params.projectId}/donations`);
      
      if (!response.ok) {
        throw response;
      }

      const resJson = await response.json();
      setDonations(resJson.data.donations);

    } catch (error) {
      console.log(error.message || error.statusText);
    }
  });

  const handleCreateClick = () => {
    history.push(`${match.url}/nouveau`);
  };
  
  return (
    <Container>
      <Row>
      ProjectId: {match.params.projectId}
      {
        currentCampaign ? 
        'campaign' : 
        <ButtonPG 
          size="lg" 
          onClick={handleCreateClick}
        >
          Créer une campagne
        </ButtonPG>
      }
      </Row>
      
      <Row>
        <DonationsListing donations={donations}/>
      </Row>
    </Container>
  );
}