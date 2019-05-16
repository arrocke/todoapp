import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import PageView from './views/PageView'
import Navigation from './components/Navigation'
import {ProjectProvider} from './contexts/projects'
import {TaskProvider} from './contexts/task'

const App = () => {
  return (
    <Router>
      <div className="h-full flex flex-col items-stretch">
        <ProjectProvider>
          <TaskProvider>
            <Navigation />
            <PageView />
          </TaskProvider>
        </ProjectProvider>
      </div>
    </Router>
  );
}

export default App;
