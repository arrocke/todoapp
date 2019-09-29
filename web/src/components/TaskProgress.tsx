/** @jsx jsx */
import { jsx } from "@emotion/core";
import ProgressBar, { ProgressMarker } from "./ProgressBar";

interface TaskProgressProps {
  backlogCount: number;
  todoCount: number;
  progressCount: number;
  completeCount: number;
}

const TaskProgress: React.FC<TaskProgressProps> = ({
  backlogCount,
  todoCount,
  progressCount,
  completeCount
}) => {
  const totalCount = backlogCount + completeCount + progressCount + todoCount;

  return (
    <ProgressBar>
      <ProgressMarker
        progress={todoCount / totalCount}
        color="#81dafc"
        label="To Do Tasks"
      />
      <ProgressMarker
        progress={progressCount / totalCount}
        color="#f9c825"
        label="In Progress Tasks"
      />
      <ProgressMarker
        progress={completeCount / totalCount}
        color="#90c566"
        label="Complete Tasks"
      />
    </ProgressBar>
  );
};

export default TaskProgress;
