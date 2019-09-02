/** @jsx jsx */
import { jsx } from "@emotion/core";
import LoadingContainer from "./LoadingContainer";
import KanbanBoard from "./KanbanBoard";
import {
  useTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation
} from "./graphql/types";

const TasksView: React.FC = () => {
  const { data, loading } = useTasksQuery();
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  return (
    <LoadingContainer isLoading={loading}>
      <h1>Tasks</h1>
      {data && (
        <KanbanBoard
          tasks={data.tasks}
          onTaskAdd={({ name, status }) =>
            createTask({
              variables: { input: { name, status } }
            })
          }
          onTaskChange={({ id, name, status }) =>
            updateTask({
              variables: {
                input: { id, name, status }
              }
            })
          }
        />
      )}
    </LoadingContainer>
  );
};

export default TasksView;
