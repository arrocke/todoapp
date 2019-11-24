/** @jsx jsx */
import { jsx } from "@emotion/core";
import {
  useTaskQuery,
  useUpdateTaskMutation,
  UpdateTaskInput
} from "../graphql/types";
import { RouteComponentProps } from "react-router";
import LoadingContainer from "../components/LoadingContainer";
import { Fragment } from "react";
import ViewHeader from "../components/ViewHeader";
import ViewTitle from "../components/ViewTitle";
import TaskStatusSelector from "../components/TaskStatusSelector";
import { breakpoints } from "../styles";
import TypeaheadInput from "../components/TypeaheadInput";
import SavingIndicator from "../components/SavingIndicator";

interface TaskViewProps extends RouteComponentProps<{ id: string }> {}

const TaskView: React.FC<TaskViewProps> = ({ match }) => {
  const { data: { task = null, projects = [] } = {}, loading } = useTaskQuery({
    variables: { id: match.params.id }
  });
  const [_updateTask, { loading: saving }] = useUpdateTaskMutation();

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
          const updateTask = (props: Partial<UpdateTaskInput>) =>
            _updateTask({
              variables: { input: { id: task.id, ...props } },
              optimisticResponse() {
                return {
                  updateTask: {
                    __typename: "Task",
                    id: task.id,
                    name: props.name || task.name,
                    project:
                      projects.find(project => project.id === props.project) ||
                      task.project,
                    status: props.status || task.status
                  }
                };
              }
            });

          return (
            <Fragment>
              <ViewHeader>
                <ViewTitle
                  title={task.name || ""}
                  onChange={name => updateTask({ name })}
                />
                <SavingIndicator saving={saving} />
              </ViewHeader>
              <div
                css={{
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
                  <TypeaheadInput
                    css={{
                      margin: "0 0 16px 0",
                      [breakpoints.medium]: {
                        margin: "0 16px 0 0"
                      }
                    }}
                    placeholder="Select project..."
                    items={projects.map(project => ({
                      value: project.id,
                      name: project.name || "(unnamed)"
                    }))}
                    value={task.project ? task.project.id : null}
                    onChange={project => updateTask({ project })}
                  />
                  <TaskStatusSelector
                    css={{
                      display: "flex",
                      [breakpoints.medium]: {
                        display: "none"
                      }
                    }}
                    direction="vertical"
                    value={task.status}
                    onChange={status => updateTask({ status })}
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
                    onChange={status => updateTask({ status })}
                  />
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
