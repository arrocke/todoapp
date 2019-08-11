/** @jsx jsx */
import { jsx } from "@emotion/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProjectsView from "./ProjectsView";
import ProjectView from "./ProjectView";
import TasksView from "./TasksView";

const App: React.FC = () => {
  return (
    <Router>
      <Route exact path="/projects" component={ProjectsView} />
      <Route exact path="/projects/:id" component={ProjectView} />
      <Route exact path="/tasks" component={TasksView} />
    </Router>
  );
};

export default App;
