import React,{useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav, Container, NavDropdown, Button} from "react-bootstrap";
import './Menu.css';
import {useHistory, Router, Switch, Route } from "react-router-dom";


function Menu(props){
    const[stateVisibilityLoggedin, setStateVisibilityLoggedin]=useState('hidden');
    const[stateVisibilityNotLoggedin, setStateVisibilityNotLoggedin]=useState('visible');
    const member = props.loggin;
    const history = props.history;


    useEffect(()=>{
        if (member) {
            setStateVisibilityLoggedin('visible');
            setStateVisibilityNotLoggedin('hidden')
        }
    })


    const IsLoggedIn=true;
    return(
      <div>
        <Container 
          style={{visibility:stateVisibilityNotLoggedin}}
        >
          <Nav
            variant="tabs"
            defaultActiveKey="/"
          >
            <Nav.Item>
              <Nav.Link
                className="nav-dropdown"
                href="/"
              >
                ACCUEIL
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className="nav-dropdown"
                eventKey="projects"
                href="/"
              >
                PROJETS
                      </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className="nav-dropdown"
                eventKey="signup"
                href="/"
              >
                INSCRIPTION
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className="nav-dropdown"
                eventKey="login"
                href="/login"
              >
                LOGIN
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>

        <Container
          style={{ visibility: stateVisibilityLoggedin }}
        >
          <Nav
            variant="tabs"
            defaultActiveKey="/"
          >
            <Nav.Item>
              <Nav.Link
                className="nav-dropdown"
                href="/"
              >
                ACCUEIL
                    </Nav.Link>
            </Nav.Item>
            <Nav.Item >
              <Nav.Link
                className="nav-dropdown"
                eventKey="projects"
                href="/"
              >
                PROJETS
                    </Nav.Link>
            </Nav.Item>
            <NavDropdown
              id="nav-dropdown"
              title="Membre"
              id="nav-dropdown"
            >
              <button
                onClick={() => history.push('/addProject')}
              >
                <NavDropdown.Item
                  className="nav-dropdown"
                  type='submit'
                >
                  Profil
                      </NavDropdown.Item>
              </button>
              <NavDropdown.Item
                className="nav-dropdown"
                type='submit'
                onClick={() => history.push('/addProject')}
              >
                Créer un projet
                      </NavDropdown.Item>
              <NavDropdown.Item
                className="nav-dropdown"
                type='submit'
                onClick={() => history.push('/listMemberProject')}
              >
                Mes projets
                      </NavDropdown.Item>
            </NavDropdown>
            <Nav.Item>
              <Nav.Link
                className="nav-dropdown"
                eventKey="disabled"
              >
                Déconnection
                    </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </div>

    )
}

export default Menu;