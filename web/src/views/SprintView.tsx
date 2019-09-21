/** @jsx jsx */
import { jsx } from "@emotion/core";
import { RouteComponentProps } from "react-router";
import LoadingContainer from "../components/LoadingContainer";
import KanbanBoard from "../components/KanbanBoard";
import { useSprintQuery, useUpdateTaskMutation } from "../graphql/types";
import { Fragment } from "react";
import ViewHeader from "../components/ViewHeader";
import { sprintDateInfo } from "../utils";
import ViewTitle from "../components/ViewTitle";

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
          <ViewHeader
            css={{
              display: "flex",
              alignItems: "baseline"
            }}
          >
            <ViewTitle title="Sprint" />
            <div
              css={{
                flexGrow: 1
              }}
            />
            <div
              css={{
                fontSize: 16,
                fontWeight: "bold"
              }}
            >
              {sprintDateInfo(
                new Date(data.sprint.startDate),
                new Date(data.sprint.endDate)
              )}
            </div>
          </ViewHeader>
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
