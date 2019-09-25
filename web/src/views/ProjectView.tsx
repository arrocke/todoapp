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
import {
  updateProjectWithNewTask,
  updateTasksWithNewTask
} from "../graphql/cache";

interface ProjectsViewProps extends RouteComponentProps<{ id: string }> {}

const ProjectView: React.FC<ProjectsViewProps> = ({ match, history }) => {
  const { data, loading } = useProjectQuery({
    variables: {
      id: match.params.id
    }
  });
  const [
    updateProject,
    { loading: savingProjectName }
  ] = useUpdateProjectMutation({
    optimisticResponse({ input }) {
      return {
        updateProject: {
          __typename: "Project",
          ...input
        }
      };
    }
  });
  const [updateTask] = useUpdateTaskMutation();
  const [createTask] = useCreateTaskMutation({
    update(cache, result) {
      updateProjectWithNewTask(cache, result, match.params.id);
      updateTasksWithNewTask(cache, result);
    }
  });

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
      {data && data.project ? (
        <Fragment>
          <ViewHeader>
            <ViewTitle
              title={data.project.name || ""}
              onChange={name => {
                if (data.project) {
                  updateProject({
                    variables: {
                      input: {
                        id: data.project.id,
                        name
                      }
                    }
                  });
                }
              }}
              saving={savingProjectName}
            />
          </ViewHeader>
          <AddButton
            onClick={async () => {
              if (data.project) {
                const { data: response } = await createTask({
                  variables: {
                    input: {
                      project: data.project.id,
                      status: TaskState.Backlog
                    }
                  }
                });
                if (response && response.createTask) {
                  history.push(`/tasks/${response.createTask.id}`);
                }
              }
            }}
          />
          <KanbanBoard
            css={{
              minHeight: 0,
              flexGrow: 1
            }}
            tasks={data.project.tasks}
            onTaskChange={({ id, name, status }) =>
              updateTask({
                variables: {
                  input: { id, name, status }
                }
              })
            }
          />
        </Fragment>
      ) : (
        <div>Project not found</div>
      )}
    </LoadingContainer>
  );
};

export default ProjectView;
