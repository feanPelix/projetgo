import React, { useContext, useEffect, useState } from 'react';
import { Nav, Container } from 'react-bootstrap';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext/AuthContext';

import Fundraising from '../Fundraising/Fundraising';
import NewFundraising from '../Fundraising/NewFundraising/NewFundraising';
import ProjetDetails from '../DetailProjet/MainPage/ProjetDetails';
import Report from '../Report/Report';

export default function ProjectContainer({ match }) {
  const {state: {member}} = useContext(AuthContext);
  const [currentProject, setCurrentProject] = useState({});
  
  const isDetailsMatch = useRouteMatch(`${match.path}/details`);
  const isReportsMatch = useRouteMatch(`${match.path}/rapports`);
  const isFundraisingMatch = useRouteMatch(`${match.path}/financement`);

  const projetId = match.params.projectId;
  const isCurrentUserResponsable = currentProject.responsable === member.user_id;

  const getProjectDetail = async () => {
    try {
      const response = await fetch(`/project/${projetId}`);
      const jsonData = await response.json();
      setCurrentProject(jsonData);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getProjectDetail();
  }, [projetId])

  if (!currentProject.responsable) {
    return null;
  }

  return (
    <Container>
      <div style={{backgroundColor:'white'}} className="shadow rounded p-5">
        {isCurrentUserResponsable && (
          <Nav
            variant="tabs"
            defaultActiveKey="#details"
            className="mb-4"
          >
            <Nav.Item>
              <Nav.Link href={`${match.url}/details`} active={isDetailsMatch}>
                Détails
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href={`${match.url}/rapports`} active={isReportsMatch}>
                Comptes rendus
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href={`${match.url}/financement`} active={isFundraisingMatch}>
                Financement
              </Nav.Link>
            </Nav.Item>
          </Nav>
        )}
        
        <Switch>
          <Route path={`${match.path}/details`} render={(routeProps) => <ProjetDetails {...routeProps} currentProject={currentProject}/>} exact />
          {isCurrentUserResponsable && <Route path={`${match.path}/rapports`} component={Report} exact /> }
          {isCurrentUserResponsable && <Route path={`${match.path}/financement`} component={Fundraising} exact /> }
          {isCurrentUserResponsable && <Route path={`${match.path}/financement/nouveau`} component={NewFundraising} exact /> }
          <Redirect to={`${match.url}/details`} />
        </Switch>
      </div>
     
    </Container>
  );
}