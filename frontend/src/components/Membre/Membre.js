import React, { useContext } from 'react';
import { Breadcrumb, BreadcrumbItem, Container } from 'react-bootstrap';
import { Switch, Route, Redirect } from 'react-router-dom';
import Welcome from "../Welcome/Welcome";
import Profile from "../ProfilMembre/Profile";
import ListerProjects from "../ListerProjets/ListerProjects";
import AjouterProjet from "../AjouterProjet/AjouterProjet";
import ProjectContainer from '../ProjectContainer/ProjectContainer';
import { AuthContext } from '../context/AuthContext/AuthContext';

export default function Membre({ match }) {
  const {state: { isAuthenticated, member }} = useContext(AuthContext);
  if (!isAuthenticated) {
    return (
      <Redirect to="/" />
    );
  }

  return(
    <Container>
      <Breadcrumb>
        <BreadcrumbItem href={`${match.url}/bienvenue`}>
          Membre
        </BreadcrumbItem>
        <Switch>
          <Route path={`${match.path}/bienvenue`}>
            <BreadcrumbItem active>
              Bienvenue
            </BreadcrumbItem>
          </Route>
          <Route path={`${match.path}/profil`}>
            <BreadcrumbItem active>
              Profil
            </BreadcrumbItem>
          </Route>
          <Route path={`${match.path}/mesProjets`} render={(routeProps) => {
            if (routeProps.match.isExact) {
              return (
                <BreadcrumbItem active>
                  Mes Projets
                </BreadcrumbItem>
              );
            }

            return (
              <>
                <BreadcrumbItem href={routeProps.match.url}>
                  Mes Projets
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  <Switch>
                    <Route exact path={`${routeProps.match.path}/nouveau`}>Créer un projet</Route>
                    <Route path={`${routeProps.match.path}/:projectId`}>Projet</Route>
                  </Switch>
                </BreadcrumbItem>
              </>
            );
          }} />
        </Switch>
      </Breadcrumb>
      <Switch>
        <Route exact path={`${match.path}/bienvenue`} component={Welcome}/>
        <Route exact path={`${match.path}/profil`} component={Profile}/>
        {
          !!member ? (
            <Route exact path={`${match.path}/mesProjets/nouveau`} component={AjouterProjet}/>
          ) : (
            <Redirect from={`${match.path}/mesProjets/nouveau`} to={`${match.path}/profil`} />
          )
        }
        <Route exact path={`${match.path}/mesProjets`} component={ListerProjects}/>
        <Route path={`${match.path}/mesProjets/:projectId`} component={ProjectContainer}/>
        <Redirect to={`${match.path}/profil`}/>
      </Switch>
    </Container>
 );
}