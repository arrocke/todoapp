/** @jsx jsx */
import { jsx } from "@emotion/core";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import ProjectsView from "./views/ProjectsView";
import ProjectView from "./views/ProjectView";
import TasksView from "./views/TasksView";
import TaskView from "./views/TaskView";
import Navigation from "./components/Navigation";
import SprintsView from "./views/SprintsView";
import SprintView from "./views/SprintView";
import AccountView from "./views/AccountView";
import { breakpoints } from "./styles";
import LoginView from "./views/LoginView";
import { useAuth } from "./contexts/auth";
import { Fragment } from "react";

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <div
        css={{
          display: "flex",
          flexDirection: "column-reverse",
          height: "100%",
          "& > div": {
            minHeight: 0
          },
          [breakpoints.medium]: {
            flexDirection: "column"
          }
        }}
      >
        {isAuthenticated ? (
          <Fragment>
            <Navigation />
            <div
              css={{
                flexGrow: 1,
                [breakpoints.large]: {
                  display: "flex",
                  justifyContent: "center",
                  "& > div": {
                    width: 1280
                  }
                }
              }}
            >
              <Switch>
                <Route exact path="/account" component={AccountView} />
                <Route exact path="/projects" component={ProjectsView} />
                <Route exact path="/projects/:id" component={ProjectView} />
                <Route exact path="/tasks" component={TasksView} />
                <Route exact path="/tasks/:id" component={TaskView} />
                <Route exact path="/sprints" component={SprintsView} />
                <Route exact path="/sprints/:id" component={SprintView} />
                <Redirect to="/tasks" />
              </Switch>
            </div>
          </Fragment>
        ) : (
          <Switch>
            <Route exact path="/login" component={LoginView} />
            <Redirect to="/login" />
          </Switch>
        )}
      </div>
    </Router>
  );
};

export default App;
