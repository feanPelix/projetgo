import React, { useContext } from 'react';
import { Nav, Container } from 'react-bootstrap';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext/AuthContext';

import Fundraising from '../Fundraising/Fundraising';
import NewFundraising from '../Fundraising/NewFundraising/NewFundraising';
import ProjetDetails from '../Login/ProjetDetails';
import Report from '../Report/Report';

export default function ProjectContainer({ match }) {
  const {state: {member}} = useContext(AuthContext);
  const isDetailsMatch = useRouteMatch(`${match.path}/details`);
  const isReportsMatch = useRouteMatch(`${match.path}/rapports`);
  const isFundraisingMatch = useRouteMatch(`${match.path}/financement`);
  console.log('match.path', match.path);

  return (
    <Container>
      <div style={{backgroundColor:'white'}} className="shadow rounded p-5">
        {!!member && (
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
          <Route path={`${match.path}/details`} component={ProjetDetails} exact />
          {!!member && <Route path={`${match.path}/rapports`} component={Report} exact /> }
          {!!member && <Route path={`${match.path}/financement`} component={Fundraising} exact /> }
          {!!member && <Route path={`${match.path}/financement/nouveau`} component={NewFundraising} exact /> }
          <Redirect to={`${match.url}/details`} />
        </Switch>
      </div>
     
    </Container>
  );
}