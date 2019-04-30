import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import PageView from './views/PageView'

const App = () => {
  return (
    <Router>
      <PageView />
    </Router>
  );
}

export default App;
