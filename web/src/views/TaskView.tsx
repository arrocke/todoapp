/** @jsx jsx */
import { jsx } from "@emotion/core";
import LoadingContainer from "../components/LoadingContainer";

const TaskView: React.FC = () => {
  return (
    <LoadingContainer
      css={{
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
      isLoading={false}
    >
      <h1>Task</h1>
    </LoadingContainer>
  );
};

export default TaskView;
