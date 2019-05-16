import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import PageView from './views/PageView'
import Navigation from './components/Navigation'
import {ProjectProvider} from './contexts/projects'

const App = () => {
  return (
    <Router>
      <div className="h-full flex flex-col items-stretch">
        <ProjectProvider>
          <Navigation />
          <PageView />
        </ProjectProvider>
      </div>
    </Router>
  );
}

export default App;
