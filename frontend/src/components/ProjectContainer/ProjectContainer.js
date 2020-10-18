import React from 'react';
import { Nav, Container } from 'react-bootstrap';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Fundraising from '../Fundraising/Fundraising';
import NewFundraising from '../Fundraising/NewFundraising/NewFundraising';
import ProjetDetails from '../Login/ProjetDetails';

export default function ProjectContainer({ match }) {
  const isDetailsMatch = useRouteMatch(`${match.path}/details`);
  const isReportsMatch = useRouteMatch(`${match.path}/reports`);
  const isFundraisingMatch = useRouteMatch(`${match.path}/fundraising`);

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
            <Nav.Link href={`${match.url}/reports`} active={isReportsMatch}>
              Comptes rendus
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href={`${match.url}/fundraising`} active={isFundraisingMatch}>
              Financement
            </Nav.Link>
          </Nav.Item>
        </Nav>
      
        <Switch>
          <Route path={`${match.path}/`} component={ProjetDetails} exact />
          <Route path={`${match.path}/details`} component={ProjetDetails} exact />
            {/*<Route path={`${match.path}/reports`} component={span} exact /> */}
          <Route path={`${match.path}/fundraising`} component={Fundraising} exact />
          <Route path={`${match.path}/fundraising/new`} component={NewFundraising} exact />
        </Switch>
     
    </Container>
  );
}