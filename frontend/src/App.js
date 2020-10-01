import React, {useState} from 'react';
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
import FormulaireSignUpMembre from "./components/SignUp/FormulaireSignUpMembre";
import FormulaireSignUpBenevole from "./components/SignUp/FormulaireSignUpBenevole";
import FormulairePayment from "./components/SignUp/FomulairePayment";
import ChoixMembership from "./components/SignUp/ChoixMembership";

import Menu from "./components/Header/Menu";


import Footer from './components/Footer/Footer';

function App() {
const [memberSpecific, setMemberSpecific]=useState('');
const [loggin, setLoggedin] =useState(false);
const history = useHistory();

  return (
    <div className="App">
      <header className="App-header">
        <Header loggin={loggin} />
      </header>
      <div className="App-main">
        <Router>
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/login" component={()=><Login setMemberSpecific={setMemberSpecific} setLoggedin={setLoggedin}/>}/>
            <Route path="/welcome" component={()=><AfficherMessage memberSpecific={memberSpecific} setMemberSpecific={setMemberSpecific}/>}/>
            <Route path="/userSpace" component={()=><SpaceMembre memberSpecific={memberSpecific}/>}/>
            <Route path="/addProject" component={()=><AjouterProjet memberSpecific={memberSpecific}/>}/>
            <Route path="/listMemberProject" component={()=><ListerProjects memberSpecific={memberSpecific}/>}/>
            <Route path="/inscription" component={()=><ChoixMembership />}/>
            <Route path="/inscription/benevole" component={()=><FormulaireSignUpBenevole />}/>
            <Route path="/inscription/membre" component={()=><FormulaireSignUpMembre />}/>
            <Route path="/inscription/payment" component={()=><FormulairePayment />}/>

          </Switch>
        </Router>
        
      </div>

      <footer className="App-footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
