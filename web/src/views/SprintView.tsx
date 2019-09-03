/** @jsx jsx */
import { jsx } from "@emotion/core";
import { RouteComponentProps } from "react-router";
import LoadingContainer from "../components/LoadingContainer";
import KanbanBoard from "../components/KanbanBoard";
import { useSprintQuery, useUpdateTaskMutation } from "../graphql/types";

interface SprintViewProps extends RouteComponentProps<{ id: string }> {}

const SprintView: React.FC<SprintViewProps> = ({ match }) => {
  const { data, loading } = useSprintQuery({
    variables: { id: match.params.id }
  });
  const [updateTask] = useUpdateTaskMutation();

  return (
    <LoadingContainer isLoading={loading}>
      {data && data.sprint ? (
        <div>
          <h1>
            Sprint ({data.sprint.startDate} - {data.sprint.endDate})
          </h1>
          <KanbanBoard
            tasks={data.sprint.tasks}
            onTaskChange={({ id, name, status }) =>
              updateTask({
                variables: {
                  input: { id, name, status }
                }
              })
            }
          />
        </div>
      ) : (
        <div>Sprint not found</div>
      )}
    </LoadingContainer>
  );
};

export default SprintView;
