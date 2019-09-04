/** @jsx jsx */
import { jsx } from "@emotion/core";
import { RouteComponentProps } from "react-router";
import LoadingContainer from "../components/LoadingContainer";
import KanbanBoard from "../components/KanbanBoard";
import { useSprintQuery, useUpdateTaskMutation } from "../graphql/types";
import { Fragment } from "react";

interface SprintViewProps extends RouteComponentProps<{ id: string }> {}

const SprintView: React.FC<SprintViewProps> = ({ match }) => {
  const { data, loading } = useSprintQuery({
    variables: { id: match.params.id }
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
      {data && data.sprint ? (
        <Fragment>
          <h1>
            Sprint ({data.sprint.startDate} - {data.sprint.endDate})
          </h1>
          <KanbanBoard
            css={{
              minHeight: 0,
              flexGrow: 1
            }}
            tasks={data.sprint.tasks}
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
        <div>Sprint not found</div>
      )}
    </LoadingContainer>
  );
};

export default SprintView;
