import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Col, Row, Button, ListGroup, Container, Breadcrumb, Image, Dropdown,DropdownButton} from "react-bootstrap";
import {Timeline, TimelineEvent} from 'react-event-timeline';

/*Les comptes rendu de statut de projet doivent avoir les informations :
    - date compte rendu(datereport),
    - informations à jour du projet(update),
    - sommaire contenant les réalisations complétées(completed),
    - les réalisations reportées(reported),
    - état des risques(etatrisque).
*/

function Report(props) {
  const [listReport, setListReport] = useState([]);

  useEffect( () => {
    try {
      const response = fetch("http://localhost:5000/report/:props.project.code");
      const jsonData = response.json();

      console.log(jsonData);

      setListReport(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }, [])
  //console.log(props.project.titre);
  return (
    <Timeline>
      {listReport.map((report) => {
        return (
          <TimelineEvent
            title={report.titre}
            createdAt={report.datereport}>

          </TimelineEvent>
        );
      })}

    </Timeline>
  );
}

export default Report;