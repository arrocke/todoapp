/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useProject, useTasks } from "./db-client";
import { RouteComponentProps } from "react-router";

interface ProjectsViewProps extends RouteComponentProps<{ id: string }> {}

const ProjectView: React.FC<ProjectsViewProps> = ({ match }) => {
  const [project, isLoadingProject] = useProject(match.params.id);
  const [tasks, isLoadingTasks] = useTasks(match.params.id);

  const taskElements = tasks.map(task => <li key={task.id}>{task.name}</li>);
  if (project) {
    return (
      <div>
        {project.name}
        <ul>{taskElements}</ul>
      </div>
    );
  } else {
    return <div>Project not found</div>;
  }
};

export default ProjectView;
