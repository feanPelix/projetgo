import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Projects from './components/Projects/Projects';
import Header from './components/Header/Header';
import AjouterProjet from "./components/Login/AjouterProjet";
import SpaceMembre from "./components/Login/SpaceMembre";
import Login from "./components/Login/Login";
import AfficherMessage from "./components/Login/AfficherMessage";
import ListerProjects from "./components/Login/ListerProjects";
import FormulaireSignUpMembre from "./components/SignUp/FormulaireSignUpMembre";
import FormulaireSignUpBenevole from "./components/SignUp/FormulaireSignUpBenevole";
import FormulairePayment from "./components/SignUp/FomulairePayment";
import ChoixMembership from "./components/SignUp/ChoixMembership";
import ProjetDetails from "./components/Login/ProjetDetails";



import Footer from './components/Footer/Footer';

function App() {
const [memberSpecific, setMemberSpecific]=useState('');
const [loggin, setLoggedin] =useState(false);
const [projetID, setProjetID] = useState('');
const [memberID, setMemberID]=useState('');

  return (
    <div className="App">
      <div className="App-main">
        <Router>
        <Header loggin={loggin} />
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/projects" component={Projects} />
            <Route path="/login" component={()=><Login setMemberSpecific={setMemberSpecific} setLoggedin={setLoggedin}/>}/>
            <Route path="/welcome" component={()=><AfficherMessage memberSpecific={memberSpecific} setMemberSpecific={setMemberSpecific}/>}/>
            <Route path="/userSpace" component={()=><SpaceMembre memberSpecific={memberSpecific}/>}/>
            <Route path="/addProject" component={()=><AjouterProjet memberSpecific={memberSpecific}/>}/>
            <Route path="/listMemberProject" component={()=><ListerProjects memberSpecific={memberSpecific} setProjetID={setProjetID} setMemberID={setMemberID}/>}/>
            <Route path="/inscription-benevole" component={()=><FormulaireSignUpBenevole />}/>
            <Route path="/inscription-membre" component={()=><FormulaireSignUpMembre />}/>
            <Route path="/inscription-payment" component={()=><FormulairePayment />}/>
            <Route path="/inscription" component={()=><ChoixMembership />}/>
            <Route path="/projectDetail" component={()=><ProjetDetails  projetID={projetID} memberID={memberID} />}/>

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
