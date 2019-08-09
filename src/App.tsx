/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useProjects } from "./db-client";

const App: React.FC = () => {
  const { projects } = useProjects();

  const projectElements = projects.map(project => (
    <li key={project.id}>{project.name}</li>
  ));
  return <ul>{projectElements}</ul>;
};

export default App;
