import React from 'react';
import Card from 'react-bootstrap/Card';
import './CardProject.css';
import ButtonDonation from '../Buttons/ButtonDonation/ButtonDonation';



export function ProjectCard({srcImage, title, summary, projectId}) {
  const summary_size = 250;
  const size = null;
  let styles = `bkg ${size}`;
  let formattedSummary;

  // Trim le text des sommaires si depasse 'summary_size'
  if (summary.length > summary_size) {
    let cutIdx = summary.indexOf(' ', summary_size);
    formattedSummary = summary.slice(0,cutIdx)+' ...';
  } else {
    formattedSummary = summary;
  }

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
          {formattedSummary}
        </Card.Text>
          <ButtonDonation projectID={projectId}/>
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;