import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Navigation from './components/Navigation'
import PageView from './views/PageView'

const App = () => {
  return (
    <Router>
      <div className="h-full flex flex-col items-stretch bg-grey-light">
        <Navigation className="flex-no-shrink"/>
        <main className="flex-grow relative overflow-hidden">
          <PageView />
        </main>
      </div>
    </Router>
  );
}

export default App;
