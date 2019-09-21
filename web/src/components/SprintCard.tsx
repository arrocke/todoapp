/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Link } from "react-router-dom";
import { sprintDateInfo } from "../utils";

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

  const completePercent = (sprint.backlogCount / totalCount) * 100;
  const progressPercent =
    completePercent + (sprint.progressCount / totalCount) * 100;
  const todoPercent = progressPercent + (sprint.todoCount / totalCount) * 100;

  return (
    <li
      className={className}
      draggable
      css={css`
        border-radius: 4px;
        box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.2);
        background-color: white;
      `}
    >
      <Link
        css={css`
          color: inherit;
          text-decoration: none;
          padding: 8px;
          display: block;
        `}
        to={`/sprints/${sprint.id}`}
      >
        <div
          css={css`
            display: flex;
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
              margin: "2px 0 2px 16px"
            }}
          >
            {sprintDateInfo(
              new Date(sprint.startDate),
              new Date(sprint.endDate)
            )}
          </div>
        </div>
        <div
          css={{
            display: "flex",
            marginTop: 8,
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
          <div
            css={{
              height: 8,
              borderRadius: 6,
              position: "relative",
              backgroundColor: "#e8e8e8",
              flexGrow: 1
            }}
          >
            <div
              css={{
                width: `${todoPercent}%`,
                backgroundColor: "#81dafc",
                position: "absolute",
                borderRadius: 4,
                height: 8
              }}
            />
            <div
              css={{
                width: `${progressPercent}%`,
                backgroundColor: "#f9c825",
                position: "absolute",
                borderRadius: 4,
                height: 8
              }}
            />
            <div
              css={{
                width: `${completePercent}%`,
                backgroundColor: "#90c566",
                position: "absolute",
                borderRadius: 4,
                height: 8
              }}
            />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default SprintCard;
