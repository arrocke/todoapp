/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useProjects } from "./db-client";
import { Link } from "react-router-dom";
import LoadingContainer from "./LoadingContainer";

const ProjectsView: React.FC = () => {
  const [projects, isLoading] = useProjects();

  const projectElements = projects.map(project => (
    <li key={project.id}>
      <Link to={`/projects/${project.id}`}>{project.name}</Link>
    </li>
  ));
  return (
    <LoadingContainer isLoading={isLoading}>
      <h1>Projects</h1>
      <ul>{projectElements}</ul>
    </LoadingContainer>
  );
};

export default ProjectsView;
