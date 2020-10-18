import React from 'react';
import { Nav, Container } from 'react-bootstrap';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';

import Fundraising from '../Fundraising/Fundraising';
import NewFundraising from '../Fundraising/NewFundraising/NewFundraising';
import ProjetDetails from '../Login/ProjetDetails';
import Report from '../Report/Report';

export default function ProjectContainer({ match }) {
  const isDetailsMatch = useRouteMatch(`${match.path}/details`);
  const isReportsMatch = useRouteMatch(`${match.path}/rapports`);
  const isFundraisingMatch = useRouteMatch(`${match.path}/financement`);

  return (
    <Container>
        <Nav
          variant="tabs"
          defaultActiveKey="#details"
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
      
        <Switch>
          <Route path={`${match.path}/details`} component={ProjetDetails} exact />
          <Route path={`${match.path}/rapports`} component={Report} exact />
          <Route path={`${match.path}/financement`} component={Fundraising} exact />
          <Route path={`${match.path}/financement/nouveau`} component={NewFundraising} exact />
          <Redirect from={`${match.path}/`} to={`${match.path}/details`} />
        </Switch>
     
    </Container>
  );
}