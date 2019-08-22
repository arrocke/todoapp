/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Link } from "react-router-dom";
import LoadingContainer from "./LoadingContainer";
import { useProjectsQuery } from "./graphql/types";

const ProjectsView: React.FC = () => {
  const { loading, data } = useProjectsQuery();

  const projectElements =
    data &&
    data.projects.map(project => (
      <li key={project.projectId}>
        <Link to={`/projects/${project.projectId}`}>{project.name}</Link>
      </li>
    ));
  return (
    <LoadingContainer isLoading={loading}>
      <h1>Projects</h1>
      <ul>{projectElements}</ul>
    </LoadingContainer>
  );
};

export default ProjectsView;
