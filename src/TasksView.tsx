/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useTasks, useProjects } from "./db-client";
import LoadingContainer from "./LoadingContainer";
import KanbanBoard from "./KanbanBoard";

const TasksView: React.FC = () => {
  const { tasks, isLoading: isLoadingTasks, create, update } = useTasks();
  const { projects, isLoading: isLoadingProjects } = useProjects();

  return (
    <LoadingContainer isLoading={isLoadingTasks || isLoadingProjects}>
      <h1>Tasks</h1>
      <KanbanBoard
        tasks={tasks}
        projects={projects}
        onTaskAdd={create}
        onTaskChange={update}
      />
    </LoadingContainer>
  );
};

export default TasksView;
