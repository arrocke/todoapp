/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useTaskQuery } from "../graphql/types";
import { RouteComponentProps } from "react-router";

interface TaskViewProps extends RouteComponentProps<{ id: string }> {}

const TaskView: React.FC<TaskViewProps> = ({ match }) => {
  const { data, loading } = useTaskQuery({
    variables: { id: match.params.id }
  });

  if (loading || !data || !data.task) {
    return null;
  } else {
    const { name, project, status } = data.task;
    return (
      <div
        css={css`
          display: flex;
          justify-content: center;
          margin: 16px;
        `}
      >
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
            {name}
          </h1>
          <div>{project && project.name}</div>
          <div>{status}</div>
        </div>
      </div>
    );
  }
};

export default TaskView;
