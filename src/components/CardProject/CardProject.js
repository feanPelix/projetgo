import React from 'react';
import Card from 'react-bootstrap/Card';

import ButtonDonation from '../ButtonDonation/ButtonDonation';

export function ProjectCard({srcImage, name, summary}) {
  const variant = null;

  return (
    <Card 
      style={{ width: '18rem' }}
    >
      <Card.Img 
        variant={variant}
        src={srcImage}
      />
      <Card.Body>
        <Card.Title>
          {name}
        </Card.Title>
        <Card.Text>
          {summary}
        </Card.Text>
          <ButtonDonation />
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;