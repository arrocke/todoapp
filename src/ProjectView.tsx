/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useProject } from "./db-client";
import { RouteComponentProps } from "react-router";
import LoadingContainer from "./LoadingContainer";
import KanbanBoard from "./KanbanBoard";

interface ProjectsViewProps extends RouteComponentProps<{ id: string }> {}

const ProjectView: React.FC<ProjectsViewProps> = ({ match }) => {
  const { project, tasks, isLoading, create } = useProject(match.params.id);

  return (
    <LoadingContainer isLoading={isLoading}>
      {project ? (
        <div>
          <h1>{project.name}</h1>
          <KanbanBoard tasks={tasks} onTaskAdd={create} />
        </div>
      ) : (
        <div>Project not found</div>
      )}
    </LoadingContainer>
  );
};

export default ProjectView;
