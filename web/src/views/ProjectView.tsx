/** @jsx jsx */
import { jsx } from "@emotion/core";
import {
  useProjectQuery,
  useUpdateTaskMutation,
  useUpdateProjectMutation,
  useCreateTaskMutation,
  TaskState
} from "../graphql/types";
import { RouteComponentProps } from "react-router";
import LoadingContainer from "../components/LoadingContainer";
import KanbanBoard from "../components/KanbanBoard";
import { Fragment } from "react";
import ViewHeader from "../components/ViewHeader";
import ViewTitle from "../components/ViewTitle";
import AddButton from "../components/AddButton";
import { KanbanTask } from "../components/KanbanCard";
import SavingIndicator from "../components/SavingIndicator";

interface ProjectsViewProps extends RouteComponentProps<{ id: string }> {}

const ProjectView: React.FC<ProjectsViewProps> = ({
  match: {
    params: { id }
  },
  history
}) => {
  const { data: { project = null } = {}, loading } = useProjectQuery({
    variables: { id }
  });
  const [updateProject, { loading: savingProject }] = useUpdateProjectMutation({
    optimisticResponse({ input }) {
      return {
        updateProject: { __typename: "Project", ...input }
      };
    }
  });
  const [updateTask, { loading: savingTask }] = useUpdateTaskMutation({
    optimisticResponse({ input }) {
      const task = project && project.tasks.find(task => task.id === input.id);
      if (task && input.status) {
        return {
          updateTask: {
            ...task,
            status: input.status,
            project: null
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
      {() => {
        if (project) {
          const onNameChange = (name: string) =>
            updateProject({
              variables: {
                input: {
                  id: project.id,
                  name
                }
              }
            });

          const onAddTask = async () => {
            const { data: response } = await createTask({
              variables: {
                input: {
                  project: project.id,
                  status: TaskState.Backlog
                }
              }
            });
            if (response && response.createTask) {
              history.push(`/tasks/${response.createTask.id}`);
            }
          };

          const onTaskChange = ({ id, name, status }: KanbanTask) =>
            updateTask({
              variables: {
                input: { id, name, status }
              }
            });

          return (
            <Fragment>
              <ViewHeader>
                <ViewTitle title={project.name || ""} onChange={onNameChange} />
                <SavingIndicator saving={savingProject || savingTask} />
              </ViewHeader>
              <AddButton
                onClick={onAddTask}
                aria-label={`Add Task to ${project.name}`}
              />
              <KanbanBoard
                css={{
                  minHeight: 0,
                  flexGrow: 1
                }}
                tasks={project.tasks}
                onTaskChange={onTaskChange}
              />
            </Fragment>
          );
        } else {
          return <div>Project not found</div>;
        }
      }}
    </LoadingContainer>
  );
};

export default ProjectView;
