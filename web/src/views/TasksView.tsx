/** @jsx jsx */
import { jsx } from "@emotion/core";
import LoadingContainer from "../components/LoadingContainer";
import KanbanBoard from "../components/KanbanBoard";
import ViewHeader from "../components/ViewHeader";
import {
  useTasksQuery,
  useUpdateTaskMutation,
  useCreateTaskMutation,
  TaskState
} from "../graphql/types";
import ViewTitle from "../components/ViewTitle";
import { Fragment } from "react";
import AddButton from "../components/AddButton";
import { RouteComponentProps } from "react-router";
import SavingIndicator from "../components/SavingIndicator";

const TasksView: React.FC<RouteComponentProps> = ({ history }) => {
  const { data: { tasks = [] } = {}, loading } = useTasksQuery({
    fetchPolicy: "cache-and-network"
  });
  const [updateTask, { loading: saving }] = useUpdateTaskMutation({
    optimisticResponse({ input }) {
      const task = tasks.find(task => task.id === input.id);
      if (task && input.status) {
        return {
          updateTask: {
            ...task,
            status: input.status
          }
        };
      } else {
        return {
          updateTask: null
        };
      }
    }
  });
  const [createTask] = useCreateTaskMutation();

  return (
    <LoadingContainer
      css={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative"
      }}
      isLoading={loading}
    >
      {() => (
        <Fragment>
          <ViewHeader>
            <ViewTitle title="Tasks" />
            <SavingIndicator saving={saving} />
          </ViewHeader>
          <AddButton
            onClick={async () => {
              const { data: response } = await createTask({
                variables: {
                  input: {
                    status: TaskState.Backlog
                  }
                }
              });
              if (response && response.createTask) {
                history.push(`/tasks/${response.createTask.id}`);
              }
            }}
            aria-label="Add Task"
          />
          <KanbanBoard
            css={{
              minHeight: 0,
              flexGrow: 1
            }}
            tasks={tasks}
            onTaskChange={({ id, status }) =>
              updateTask({
                variables: {
                  input: { id, status }
                }
              })
            }
          />
        </Fragment>
      )}
    </LoadingContainer>
  );
};

export default TasksView;
