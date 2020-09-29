import React from 'react';
import Card from 'react-bootstrap/Card';
import './CardProject.css';
import ButtonDonation from '../ButtonDonation/ButtonDonation';



export function ProjectCard({srcImage, name, summary}) {
  const size = null;
  let styles = `bkg ${size}`;

  return (
    <Card 
      className={styles}
    >
      <Card.Img 
        variant="top"
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