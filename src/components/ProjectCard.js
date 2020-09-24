import React from 'react';
import Card from 'react-bootstrap/Card';

import ButtonDonation from './ButtonDonation';

export function ProjectCard() {
  return (
    <Card 
      style={{ width: '18rem' }}
    >
      <Card.Img 
        variant="top" 
        src={}
      />
      <Card.Body>
        <Card.Title>
          {}
        </Card.Title>
        <Card.Text>
          {}
        </Card.Text>
          <ButtonDonation />
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;