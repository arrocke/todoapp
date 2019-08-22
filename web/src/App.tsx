/** @jsx jsx */
import { jsx } from "@emotion/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProjectsView from "./ProjectsView";
import ProjectView from "./ProjectView";
import TasksView from "./TasksView";
import Navigation from "./Navigation";
import SprintsView from "./SprintsView";
import SprintView from "./SprintView";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  uri: "/api"
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navigation />
        <Route exact path="/projects" component={ProjectsView} />
        <Route exact path="/projects/:id" component={ProjectView} />
        <Route exact path="/tasks" component={TasksView} />
        <Route exact path="/sprints" component={SprintsView} />
        <Route exact path="/sprints/:id" component={SprintView} />
      </Router>
    </ApolloProvider>
  );
};

export default App;
