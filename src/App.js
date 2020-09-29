import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <div className="App-main">
        <Router>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>

        </Router>
        
      </div>
      <footer className="App-footer">

      </footer>
    </div>
  );
}

export default App;
