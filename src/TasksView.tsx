/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useMemo } from "react";
import { useTasks } from "./db-client";
import LoadingContainer from "./LoadingContainer";
import KanbanBoard from "./KanbanBoard";

const TasksView: React.FC = () => {
  const [tasks, isLoading] = useTasks(useMemo(() => ({}), []));

  return (
    <LoadingContainer isLoading={isLoading}>
      <h1>Tasks</h1>
      <KanbanBoard tasks={tasks} />
    </LoadingContainer>
  );
};

export default TasksView;
