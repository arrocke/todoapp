import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Navigation from './components/Navigation'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="bg-black text-white">
          <Navigation />
        </div>
      </Router>
    );
  }
}

export default App;
