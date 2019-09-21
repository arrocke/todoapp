/** @jsx jsx */
import { jsx } from "@emotion/core";
import LoadingContainer from "../components/LoadingContainer";
import KanbanBoard from "../components/KanbanBoard";
import ViewHeader from "../components/ViewHeader";
import { useTasksQuery, useUpdateTaskMutation } from "../graphql/types";
import ViewTitle from "../components/ViewTitle";

const TasksView: React.FC = () => {
  const { data, loading } = useTasksQuery();
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
      <ViewHeader>
        <ViewTitle title="Tasks" />
      </ViewHeader>
      {data && (
        <KanbanBoard
          css={{
            minHeight: 0,
            flexGrow: 1
          }}
          tasks={data.tasks}
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
