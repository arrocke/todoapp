/** @jsx jsx */
import { jsx } from "@emotion/core";
import LoadingContainer from "../components/LoadingContainer";
import KanbanBoard from "../components/KanbanBoard";
import {
  useTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation
} from "../graphql/types";

const TasksView: React.FC = () => {
  const { data, loading } = useTasksQuery();
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  return (
    <LoadingContainer
      css={{
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
      isLoading={loading}
    >
      <h1>Tasks</h1>
      {data && (
        <KanbanBoard
          css={{
            minHeight: 0,
            flexGrow: 1
          }}
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
