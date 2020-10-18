import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Nav, NavDropdown } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import logo from '../../assets/logo-projetgo.png';
import { Link, useHistory } from "react-router-dom";
import { withRouter } from 'react-router';
import Login from '../Login/Login';

export function Header(props) {
  const [stateVisibilityLoggedin, setStateVisibilityLoggedin] = useState('hidden');
  const [stateVisibilityNotLoggedin, setStateVisibilityNotLoggedin] = useState('visible');
  const member = props.loggin;
  const history = useHistory();


  useEffect(() => {
    if (member) {
      setStateVisibilityLoggedin('visible');
      setStateVisibilityNotLoggedin('hidden')
    }
  })


  return (
    <Container className="mt-4 mb-5" fluid >
      <Row>
        <Col lg={3}>
          <img src={logo} className="App-logo" alt="logo" />
        </Col>
        <Col lg={9}>
          <div>
            <Container className="mt-5" style={{ visibility: 'hidden' }}>
              <Nav variant="tabs" defaultActiveKey="/">
                <Nav.Item>
                  <Nav.Link className="nav-dropdown" href="/">ACCUEIL</Nav.Link>
                </Nav.Item>
                <Nav.Item><Nav.Link className="nav-dropdown" href="/projects" eventKey="link-1">PROJETS</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link className="nav-dropdown" href="/inscription" >INSCRIPTION</Nav.Link></Nav.Item>
                <Nav.Item><Login /></Nav.Item>
              </Nav>
            </Container>
            <Container style={{ visibility: 'visible' }}>
              <Nav variant="tabs" defaultActiveKey="/">
                <Nav.Item><Nav.Link className="nav-dropdown" onClick={() => history.push('/')}>ACCUEIL</Nav.Link></Nav.Item>
                <Nav.Item ><Nav.Link className="nav-dropdown" onClick={() => history.push('/projects')}>PROJETS</Nav.Link></Nav.Item>
                <NavDropdown id="nav-dropdown" title="MEMBRE" id="nav-dropdown">
                  <NavDropdown.Item className="nav-dropdown" type='submit' onClick={() => history.push('/membre/profil')}>Profil</NavDropdown.Item>
                  <NavDropdown.Item className="nav-dropdown" type='submit' onClick={() => history.push('/membre/mesProjets')} >Mes projets</NavDropdown.Item>
                  <NavDropdown.Item className="nav-dropdown" type='submit' onClick={() => history.push('/membre/mesProjets/nouveau')}>Créer un projet</NavDropdown.Item>
                </NavDropdown>
                <Nav.Item><Nav.Link className="nav-dropdown" href="/" > DÉCONNEXION</Nav.Link></Nav.Item>

              </Nav>
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;