/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useMemo } from "react";
import { useProject, useTasks } from "./db-client";
import { RouteComponentProps } from "react-router";
import LoadingContainer from "./LoadingContainer";
import KanbanBoard from "./KanbanBoard";

interface ProjectsViewProps extends RouteComponentProps<{ id: string }> {}

const ProjectView: React.FC<ProjectsViewProps> = ({ match }) => {
  const [project, isLoadingProject] = useProject(match.params.id);
  const [tasks, isLoadingTasks] = useTasks(
    useMemo(() => ({ projectId: match.params.id }), [match.params.id])
  );

  return (
    <LoadingContainer isLoading={isLoadingProject || isLoadingTasks}>
      {project ? (
        <div>
          <h1>{project.name}</h1>
          <KanbanBoard tasks={tasks} />
        </div>
      ) : (
        <div>Project not found</div>
      )}
    </LoadingContainer>
  );
};

export default ProjectView;
