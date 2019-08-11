/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useProjects } from "./db-client";
import { Link } from "react-router-dom";

const ProjectsView: React.FC = () => {
  const [projects, isLoading] = useProjects();

  const projectElements = projects.map(project => (
    <li key={project.id}>
      <Link to={`/projects/${project.id}`}>{project.name}</Link>
    </li>
  ));
  return <ul>{projectElements}</ul>;
};

export default ProjectsView;
