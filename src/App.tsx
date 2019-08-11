/** @jsx jsx */
import { jsx } from "@emotion/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProjectsView from "./ProjectsView";
import ProjectView from "./ProjectView";
import TasksView from "./TasksView";
import Navigation from "./Navigation";
import SprintsView from "./SprintsView";
import SprintView from "./SprintView";

const App: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <Route exact path="/projects" component={ProjectsView} />
      <Route exact path="/projects/:id" component={ProjectView} />
      <Route exact path="/tasks" component={TasksView} />
      <Route exact path="/sprints" component={SprintsView} />
      <Route exact path="/sprints/:id" component={SprintView} />
    </Router>
  );
};

export default App;
