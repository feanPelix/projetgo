import React, { useContext } from 'react';
import { Container, Col, Row, Nav, NavDropdown } from 'react-bootstrap';
import logo from '../../assets/logo-projetgo.png';
import { useHistory } from "react-router-dom";
import Login from '../Login/Login';
import { AuthContext } from '../context/AuthContext/AuthContext';

export function Header() {
  const {state: authState, dispatch} = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT',
    });
  };

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
              </Nav>
            </Container>
            <Container style={{ visibility: 'visible' }}>
              <Nav variant="tabs" defaultActiveKey="/">
                <Nav.Item><Nav.Link onClick={() => history.push('/')}>ACCUEIL</Nav.Link></Nav.Item>
                <Nav.Item ><Nav.Link onClick={() => history.push('/projects')}>PROJETS</Nav.Link></Nav.Item>
                {
                  authState.isAuthenticated ? (
                    <>
                      <NavDropdown id="nav-dropdown" title="MEMBRE">
                        <NavDropdown.Item className="nav-dropdown" type='submit' onClick={() => history.push('/membre/profil')}>Profil</NavDropdown.Item>
                        <NavDropdown.Item className="nav-dropdown" type='submit' onClick={() => history.push('/membre/mesProjets')} >Mes projets</NavDropdown.Item>
                        {!!authState.member && (
                          <NavDropdown.Item className="nav-dropdown" type='submit' onClick={() => history.push('/membre/mesProjets/nouveau')}>Créer un projet</NavDropdown.Item>
                        )}
                      </NavDropdown>
                      <Nav.Item><Nav.Link onClick={handleLogout}>DÉCONNEXION</Nav.Link></Nav.Item>
                    </>
                  ) : (
                    <>
                      <Nav.Item><Nav.Link href="/inscription" >INSCRIPTION</Nav.Link></Nav.Item>
                      <Nav.Item><Login /></Nav.Item>
                    </>
                  )
                }
              </Nav>
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;