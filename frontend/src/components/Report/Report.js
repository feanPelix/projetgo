import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Timeline, TimelineEvent} from 'react-event-timeline';
import {Check, ConeStriped, ExclamationTriangle, GearFill, Plus, TrashFill} from 'react-bootstrap-icons';
import moment from 'moment';
import './Report.css';
import ReportAction from "./ReportAction/ReportAction";

function Report({ match }) {
  const [listReport, setListReport] = useState([]);
  const [show, setShow] = useState(false);
  const [action, setAction] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getReports = async () => {
    try {
      const response = await fetch(`/report/${match.params.projectId}`);
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

  const deleteReport = async (id) => {
    handleShow();
    setAction({
      desc:'delete',
      projet: match.params.projectId,
      reportID: id
    });
  };

  const modifReport = async (id) => {
    handleShow();
    setAction({
      desc: 'modif',
      projet: match.params.projectId,
      reportID: id
    });
  };

  const ajouterReport = async () => {
    handleShow();
    setAction({
      desc: 'ajout',
      projet: match.params.projectId
    });
  };

  return (
    <>
      <ReportAction
        visibility={show}
        handleClose={handleClose}
        handleReload={getReports}
        action={action}
      />
      <h2>Rapports de projet</h2>
      <Timeline>
        { listReport.map((report) => {
          let icon;
          let iconColor;
          if (report.etatrisque === "Élevé") {
            icon = <ExclamationTriangle />;
            iconColor = "red";
          } else if (report.etatrisque === "Moyen") {
            icon = <ConeStriped />;
            iconColor = "orange";
          } else {
            icon = <Check />;
            iconColor = "green";
          }

          return (
            <TimelineEvent
              title={<strong>{report.update}</strong>}
              createdAt={moment(report.datereport).calendar()}
              icon={icon}
              iconColor={iconColor}
              buttons= {<>
                    <GearFill
                      className='clickable'
                      onClick={() => modifReport(report.id)}
                    />
                    <TrashFill
                      className='clickable'
                      onClick={() => deleteReport(report.id)}
                    />
                  </>}
            >
              <strong>Sommaire :</strong> {report.completed}
              <br />
              <strong>Reporté :</strong> {report.reported}
            </TimelineEvent>
          );
        })}
        <TimelineEvent
          className={"clickable"}
          title={<p><strong>Créer un nouveau rapport</strong></p>}
          icon={<Plus />}
          iconColor='blue'
          onIconClick={ajouterReport}
          onClick={ajouterReport}
        />
      </Timeline>
    </>
  );
}

export default Report;