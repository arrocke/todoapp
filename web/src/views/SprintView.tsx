/** @jsx jsx */
import { jsx } from "@emotion/core";
import { RouteComponentProps } from "react-router";
import LoadingContainer from "../components/LoadingContainer";
import KanbanBoard from "../components/KanbanBoard";
import { useSprintQuery, useUpdateTaskMutation } from "../graphql/types";
import { Fragment } from "react";
import ViewTitle from "../components/ViewTitle";
import { sprintDateInfo } from "../utils";

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
          <ViewTitle>Sprint</ViewTitle>
          <div
            css={{
              fontSize: 16,
              margin: "0 32px 16px 32px"
            }}
          >
            {sprintDateInfo(
              new Date(data.sprint.startDate),
              new Date(data.sprint.endDate)
            )}
          </div>
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
