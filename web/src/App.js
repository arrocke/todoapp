import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Navigation from './components/Navigation'
import PageView from './views/PageView'

const App = () => {
  return (
    <Router>
      <div className="min-h-full flex flex-col items-stretch">
        <Navigation />
        <main className="flex-grow relative">
          <PageView />
        </main>
      </div>
    </Router>
  );
}

export default App;
