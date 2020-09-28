import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ProjectCard from './components/CardProject/CardProject';
import Switch from 'react-bootstrap/esm/Switch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="App-main">
        {/* <Router>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
          </Switch>

        </Router> */}
        <ProjectCard />
      </div>
      <footer className="App-footer">

      </footer>
    </div>
  );
}

export default App;
