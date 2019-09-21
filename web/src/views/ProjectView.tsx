/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useProjectQuery, useUpdateTaskMutation } from "../graphql/types";
import { RouteComponentProps } from "react-router";
import LoadingContainer from "../components/LoadingContainer";
import KanbanBoard from "../components/KanbanBoard";
import { Fragment } from "react";
import ViewTitle from "../components/ViewTitle";

interface ProjectsViewProps extends RouteComponentProps<{ id: string }> {}

const ProjectView: React.FC<ProjectsViewProps> = ({ match }) => {
  const { data, loading } = useProjectQuery({
    variables: {
      id: match.params.id
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
          <ViewTitle>{data.project.name}</ViewTitle>
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
