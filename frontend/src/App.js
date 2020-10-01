import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import AjouterProjet from "./components/Login/AjouterProjet";
import SpaceMembre from "./components/Login/SpaceMembre";
import Login from "./components/Login/Login";
import AfficherMessage from "./components/Login/AfficherMessage";
import ListerProjects from "./components/Login/ListerProjects";
import {useHistory} from "react-router-dom";
import Menu from "./components/Header/Menu";

function App() {
    const [memberSpecific, setMemberSpecific]=useState('');
    const [loggin, setLoggedin] =useState(false);
    const history = useHistory();
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="App-main">
        <Router>
            <Header loggin={loggin} />
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/login" component={()=><Login setMemberSpecific={setMemberSpecific} setLoggedin={setLoggedin}/>}/>
            <Route path="/welcome" component={()=><AfficherMessage memberSpecific={memberSpecific} setMemberSpecific={setMemberSpecific}/>}/>
            <Route path="/userSpace" component={()=><SpaceMembre memberSpecific={memberSpecific}/>}/>
            <Route path="/addProject" component={()=><AjouterProjet memberSpecific={memberSpecific}/>}/>
            <Route path="/listMemberProject" component={()=><ListerProjects memberSpecific={memberSpecific}/>}/>
          </Switch>

        </Router>
        
      </div>

      <footer className="App-footer">

      </footer>
    </div>
  );
}

export default App;
