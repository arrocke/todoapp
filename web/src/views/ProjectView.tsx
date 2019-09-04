/** @jsx jsx */
import { jsx } from "@emotion/core";
import {
  useProjectQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  ProjectDocument,
  ProjectQuery,
  ProjectQueryVariables
} from "../graphql/types";
import { RouteComponentProps } from "react-router";
import LoadingContainer from "../components/LoadingContainer";
import KanbanBoard from "../components/KanbanBoard";
import { Fragment } from "react";

interface ProjectsViewProps extends RouteComponentProps<{ id: string }> {}

const ProjectView: React.FC<ProjectsViewProps> = ({ match }) => {
  const { data, loading } = useProjectQuery({
    variables: {
      id: match.params.id
    }
  });
  const [createTask] = useCreateTaskMutation({
    // Update the project query when a task is added.
    update(cache, { data }) {
      if (data) {
        const newTask = data.createTask;
        const query = cache.readQuery<ProjectQuery, ProjectQueryVariables>({
          query: ProjectDocument,
          variables: {
            id: match.params.id
          }
        });
        if (query && query.project) {
          cache.writeQuery({
            query: ProjectDocument,
            data: {
              ...query,
              project: {
                ...query.project,
                tasks: [...query.project.tasks, newTask]
              }
            }
          });
        }
      }
    }
  });
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
      {data && data.project ? (
        <Fragment>
          <h1>{data.project.name}</h1>
          <KanbanBoard
            css={{
              minHeight: 0,
              flexGrow: 1
            }}
            tasks={data.project.tasks}
            onTaskAdd={({ name, status }) =>
              createTask({
                variables: { input: { name, status, project: match.params.id } }
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
        </Fragment>
      ) : (
        <div>Project not found</div>
      )}
    </LoadingContainer>
  );
};

export default ProjectView;
