/** @jsx jsx */
import { jsx } from "@emotion/core";
import {
  useTaskQuery,
  useUpdateTaskMutation,
  TaskState
} from "../graphql/types";
import { RouteComponentProps } from "react-router";
import LoadingContainer from "../components/LoadingContainer";
import { Fragment } from "react";
import ViewHeader from "../components/ViewHeader";
import ViewTitle from "../components/ViewTitle";
import TaskStatusSelector from "../components/TaskStatusSelector";
import { breakpoints } from "../styles";

interface TaskViewProps extends RouteComponentProps<{ id: string }> {}

const TaskView: React.FC<TaskViewProps> = ({ match }) => {
  const { data: { task = null } = {}, loading } = useTaskQuery({
    variables: { id: match.params.id }
  });
  const [updateTask, { loading: savingProject }] = useUpdateTaskMutation();

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
      {() => {
        if (task) {
          const onNameChange = (name: string) =>
            updateTask({
              variables: {
                input: {
                  id: task.id,
                  name,
                  status: task.status
                }
              }
            });

          const onStatusChange = (status: TaskState) =>
            updateTask({
              variables: {
                input: {
                  id: task.id,
                  status
                }
              }
            });

          return (
            <Fragment>
              <ViewHeader>
                <ViewTitle
                  title={task.name || ""}
                  onChange={onNameChange}
                  saving={savingProject}
                />
              </ViewHeader>
              <div
                css={{
                  backgroundColor: "#e8e8e8",
                  borderRadius: 8,
                  boxSizing: "border-box",
                  width: "calc(100% - 32px)",
                  padding: 16,
                  margin: "0 16px 16px 16px",
                  flexGrow: 1
                }}
              >
                <div
                  css={{
                    display: "flex",
                    flexDirection: "column",
                    [breakpoints.medium]: {
                      flexDirection: "row"
                    }
                  }}
                >
                  <TaskStatusSelector
                    css={{
                      display: "flex",
                      [breakpoints.medium]: {
                        display: "none"
                      }
                    }}
                    direction="vertical"
                    value={task.status}
                    onChange={onStatusChange}
                  />
                  <TaskStatusSelector
                    css={{
                      display: "none",
                      [breakpoints.medium]: {
                        display: "flex"
                      }
                    }}
                    direction="horizontal"
                    value={task.status}
                    onChange={onStatusChange}
                  />
                  <div
                    css={{
                      margin: "0 0 0 16px"
                    }}
                  >
                    {task.project && task.project.name}
                  </div>
                </div>
              </div>
            </Fragment>
          );
        } else {
          return <div>Task not found</div>;
        }
      }}
    </LoadingContainer>
  );
};

export default TaskView;
