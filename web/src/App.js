import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Navigation from './components/Navigation'
import useGraphQL from './hooks/graphql'

const App = () => {
  const [query, error] = useGraphQL({
    query: `{
      hello
    }`
  })

  return (
    <Router>
      <div className="bg-black text-white">
        <Navigation />
        { JSON.stringify(query)}
        { JSON.stringify(error)}
      </div>
    </Router>
  );
}

export default App;
