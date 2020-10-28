import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { ListGroup } from 'react-bootstrap';
import ButtonPG from '../Buttons/ButtonPG/ButtonPG';
import DonationsListing from './DonationsListing/DonationsListing';

export default function Fundraising({ match, history }) {
  const { projectId } = match.params;
  const [currentCampaign, setCurrentCampaign] = useState(null);
  const [donations, setDonations] = useState([]);
 
  //Need the fundraising for the project
  useEffect(() => {
    async function fetchCampaign() {
      try {
        const response = await fetch(`/project/${projectId}/campaign`);

        if (!response.ok) {
          throw response;
        }

        const campaign = await response.json();
        setCurrentCampaign(campaign);
      } catch (error) {
        console.log(error.message || error.statusText);
      }
    }
    fetchCampaign();
  }, [projectId]);

  //Need the donations for the project
  useEffect(() => {
    async function fetchDonations() {
      try {
        const response = await fetch(`/project/${projectId}/donations`);

        if (!response.ok) {
          throw response;
        }

        const resJson = await response.json();
        setDonations(resJson);

      } catch (error) {
        console.log(error.message || error.statusText);
      }
    }
    fetchDonations();
  }, [projectId]);

  const handleCreateClick = () => {
    history.push(`${match.url}/nouveau`);
  };
  
  return (
    <div>
      <div className="mb-4">
        <h2>Financement</h2>
        <h3>Campagne</h3>
        {
          currentCampaign ? (
            <ListGroup horizontal>
              <ListGroup.Item>Date de debut: {moment(currentCampaign.debut).format('ll')}</ListGroup.Item>
              <ListGroup.Item>Date de fin: {moment(currentCampaign.fin).format('ll')}</ListGroup.Item>
              <ListGroup.Item>Objectif: {currentCampaign.objectif}$</ListGroup.Item>
            </ListGroup>
          ) : (
            <ButtonPG
              size="lg"
              onClick={handleCreateClick}
            >
              Créer une campagne
            </ButtonPG>
          )}
      </div>
      <div className="mb-4">
        <h3>Dons</h3>
        <DonationsListing donations={donations}/>
      </div>
    </div>
  );
}