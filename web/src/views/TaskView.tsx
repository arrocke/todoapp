/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useTaskQuery } from "../graphql/types";
import { RouteComponentProps } from "react-router";
import LoadingContainer from "../components/LoadingContainer";

interface TaskViewProps extends RouteComponentProps<{ id: string }> {}

const TaskView: React.FC<TaskViewProps> = ({ match }) => {
  const { data: { task = null } = {}, loading } = useTaskQuery({
    variables: { id: match.params.id }
  });
  return (
    <LoadingContainer
      css={css`
        display: flex;
        justify-content: center;
        margin: 16px;
      `}
      isLoading={loading}
    >
      {() => {
        if (task) {
          return (
            <div
              css={css`
                background-color: #e8e8e8;
                border-radius: 8px;
                width: 1000px;
                padding: 16px;
              `}
            >
              <h1
                css={css`
                  margin: 0 0 16px 0;
                `}
              >
                {task.name}
              </h1>
              <div>{task.project && task.project.name}</div>
              <div>{task.status}</div>
            </div>
          );
        } else {
          return <div>Task not found</div>;
        }
      }}
    </LoadingContainer>
  );
};

export default TaskView;
