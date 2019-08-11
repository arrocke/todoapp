/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useMemo } from "react";
import { useTasks } from "./db-client";
import LoadingContainer from "./LoadingContainer";

const TasksView: React.FC = () => {
  const [tasks, isLoading] = useTasks(useMemo(() => ({}), []));

  const taskElements = tasks.map(task => <li key={task.id}>{task.name}</li>);
  return (
    <LoadingContainer isLoading={isLoading}>
      <ul>{taskElements}</ul>
    </LoadingContainer>
  );
};

export default TasksView;
