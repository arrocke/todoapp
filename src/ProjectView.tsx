/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useProject, useTasks } from "./db-client";
import { RouteComponentProps } from "react-router";
import LoadingContainer from "./LoadingContainer";

interface ProjectsViewProps extends RouteComponentProps<{ id: string }> {}

const ProjectView: React.FC<ProjectsViewProps> = ({ match }) => {
  const [project, isLoadingProject] = useProject(match.params.id);
  const [tasks, isLoadingTasks] = useTasks(match.params.id);

  const taskElements = tasks.map(task => <li key={task.id}>{task.name}</li>);
  return (
    <LoadingContainer isLoading={isLoadingProject || isLoadingTasks}>
      {project ? (
        <div>
          {project.name}
          <ul>{taskElements}</ul>
        </div>
      ) : (
        <div>Project not found</div>
      )}
    </LoadingContainer>
  );
};

export default ProjectView;
