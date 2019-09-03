/** @jsx jsx */
import { jsx } from "@emotion/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProjectsView from "./views/ProjectsView";
import ProjectView from "./views/ProjectView";
import TasksView from "./views/TasksView";
import Navigation from "./components/Navigation";
import SprintsView from "./views/SprintsView";
import SprintView from "./views/SprintView";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./graphql/client";

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
