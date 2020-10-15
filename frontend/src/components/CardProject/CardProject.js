import React from 'react';
import Card from 'react-bootstrap/Card';
import './CardProject.css';
import ButtonDonation from '../Buttons/ButtonDonation/ButtonDonation';



export function ProjectCard({srcImage, title, summary}) {
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
          {title}
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