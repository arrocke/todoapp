/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { sprintDateInfo } from "../utils";
import Card from "./Card";
import ProgressBar, { ProgressMarker } from "./ProgressBar";

interface SprintCardProps {
  sprint: {
    id: string;
    startDate: string;
    endDate: string;
    backlogCount: number;
    todoCount: number;
    progressCount: number;
    completeCount: number;
  };
  className?: string;
}

const SprintCard: React.FC<SprintCardProps> = ({ className, sprint }) => {
  const totalCount =
    sprint.backlogCount +
    sprint.completeCount +
    sprint.progressCount +
    sprint.todoCount;

  const completePercent = sprint.backlogCount / totalCount;
  const progressPercent = completePercent + sprint.progressCount / totalCount;
  const todoPercent = progressPercent + sprint.todoCount / totalCount;

  return (
    <Card className={className} draggable to={`/sprints/${sprint.id}`} tag="li">
      <div
        css={css`
          display: flex;
          padding: 8px 8px 0 8px;
        `}
      >
        <div
          css={css`
            box-sizing: border-box;
            border-radius: 6px;
            margin: 0;
            border: 0;
            font-size: 14px;
            flex-grow: 1;
          `}
        >
          Sprint{" "}
        </div>
        <div
          css={{
            fontSize: 12,
            fontWeight: "bold",
            margin: "0 0 0 16px"
          }}
        >
          {sprintDateInfo(new Date(sprint.startDate), new Date(sprint.endDate))}
        </div>
      </div>
      <div
        css={{
          display: "flex",
          marginTop: 8,
          padding: "0 8px 8px 8px",
          alignItems: "center"
        }}
      >
        <div
          css={{
            fontSize: 12,
            marginRight: 16,
            fontWeight: "bold"
          }}
        >
          {totalCount} Tasks
        </div>
        <ProgressBar>
          <ProgressMarker progress={todoPercent} color="#81dafc" />
          <ProgressMarker progress={progressPercent} color="#f9c825" />
          <ProgressMarker progress={completePercent} color="#90c566" />
        </ProgressBar>
      </div>
    </Card>
  );
};

export default SprintCard;
