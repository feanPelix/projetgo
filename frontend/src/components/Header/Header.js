import React, {useEffect, useState} from 'react';
import {Container, Col, Row, Nav, NavDropdown} from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import logo from '../../assets/logo-projetgo.png';
import Menu from "./Menu";
import {useHistory} from "react-router-dom";
import {withRouter} from 'react-router';

export function Header(props) {
    const[stateVisibilityLoggedin, setStateVisibilityLoggedin]=useState('hidden');
    const[stateVisibilityNotLoggedin, setStateVisibilityNotLoggedin]=useState('visible');
    const member = props.loggin;
    const history = useHistory();


    useEffect(()=>{
        if (member) {
            setStateVisibilityLoggedin('visible');
            setStateVisibilityNotLoggedin('hidden')
        }
    })


  return(
    <Container fluid>
      <Row>
        <Col lg={3}>
          <img src={logo} className="App-logo" alt="logo"/>
        </Col>
        <Col lg={9}>
            <div>
                <Container style={{visibility:stateVisibilityNotLoggedin}}>
                    <Nav  variant="tabs" defaultActiveKey="/">
                        <Nav.Item><Nav.Link className="nav-dropdown" href="/">ACCUEIL</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link  className="nav-dropdown" href="/projects" eventKey="link-1">PROJETS</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link  className="nav-dropdown" href="/inscription" >INSCRIPTION</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link className="nav-dropdown"  href="/login" >LOGIN</Nav.Link></Nav.Item>
                    </Nav>
                </Container>
                <Container style={{visibility:stateVisibilityLoggedin}}>
                    <Nav variant="tabs" defaultActiveKey="/">
                        <Nav.Item><Nav.Link className="nav-dropdown" onClick={() => history.push('/')}>ACCUEIL</Nav.Link></Nav.Item>
                        <Nav.Item ><Nav.Link  className="nav-dropdown" href="/projects">PROJETS</Nav.Link></Nav.Item>
                        <NavDropdown id="nav-dropdown" title="Membre" id="nav-dropdown">
                            <NavDropdown.Item className="nav-dropdown" type='submit' onClick={() => history.push('/userSpace')}>Profil</NavDropdown.Item>
                            <NavDropdown.Item className="nav-dropdown" type='submit' onClick={() => history.push('/addProject')}>Créer un projet</NavDropdown.Item>
                            <NavDropdown.Item className="nav-dropdown"  type='submit' onClick={() => history.push('/listMemberProject')} >Mes projets</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Item><Nav.Link className="nav-dropdown" href="/" > Déconnection</Nav.Link></Nav.Item>

                    </Nav>
                </Container>
                {/* <Menu 
                  member={props.loggin}
                  history={history}
                /> */}
            </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;