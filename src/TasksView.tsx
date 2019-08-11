/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useTasks } from "./db-client";
import LoadingContainer from "./LoadingContainer";
import KanbanBoard from "./KanbanBoard";

const TasksView: React.FC = () => {
  const { tasks, isLoading, create } = useTasks();

  return (
    <LoadingContainer isLoading={isLoading}>
      <h1>Tasks</h1>
      <KanbanBoard tasks={tasks} onTaskAdd={create} />
    </LoadingContainer>
  );
};

export default TasksView;
