import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Timeline, TimelineEvent} from 'react-event-timeline';
import {Check, ConeStriped, ExclamationTriangle} from 'react-bootstrap-icons';
import moment from 'moment';
import './Report.css';

/*Les comptes rendu de statut de projet doivent avoir les informations :
    - date compte rendu(datereport),
    - informations à jour du projet(update),
    - sommaire contenant les réalisations complétées(completed),
    - les réalisations reportées(reported),
    - état des risques(etatrisque).
*/

function Report(props) {
  const [listReport, setListReport] = useState([]);

  const getReports = async () => {
    try {
      const response = await fetch(`http://localhost:5000/report/${props.project}`);
      const jsonData = await response.json();
      console.log(jsonData);

      setListReport(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect( () => {
    getReports();
  }, []);


  //console.log(props.project.titre);
  return (
    <>
      <h2>Rapport de projet</h2>
      <Timeline>
        {listReport.map((report) => {
          let icon;
          let iconColor;
          if (report.etatrisque === "Élevé") {
            icon = <ExclamationTriangle />;
            iconColor = "red";
          } else if (report.etatrisque === "Moyen") {
            icon = <ConeStriped />;
            iconColor = "yellow";
          } else {
            icon = <Check />;
            iconColor = "green";
          }

          return (
            <TimelineEvent
              title={report.update}
              createdAt={moment(report.datereport).calendar()}
              icon={icon}
              iconColor={iconColor}>
              Sommaire : {report.completed}
              <br />
              Reporté : {report.reported}
            </TimelineEvent>
          );
        })}

      </Timeline>
    </>
  );
}

export default Report;