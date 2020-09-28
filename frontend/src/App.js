import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Switch from 'react-bootstrap/esm/Switch';
import ProjectCard from './components/ProjectCard';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';

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
        <VideoPlayer />
      </div>
      <footer className="App-footer">

      </footer>
    </div>
  );
}

export default App;
