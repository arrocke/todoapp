/** @jsx jsx */
import { jsx } from "@emotion/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProjectsView from "./views/ProjectsView";
import ProjectView from "./views/ProjectView";
import TasksView from "./views/TasksView";
import TaskView from "./views/TaskView";
import Navigation from "./components/Navigation";
import SprintsView from "./views/SprintsView";
import SprintView from "./views/SprintView";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./graphql/client";
import { breakpoints } from "./styles";

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
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
            <Route exact path="/projects" component={ProjectsView} />
            <Route exact path="/projects/:id" component={ProjectView} />
            <Route exact path="/tasks" component={TasksView} />
            <Route exact path="/tasks/:id" component={TaskView} />
            <Route exact path="/sprints" component={SprintsView} />
            <Route exact path="/sprints/:id" component={SprintView} />
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
