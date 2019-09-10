/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { TaskState } from "../graphql/types";
import IconEdit from "./IconEdit";
import { Link } from "react-router-dom";

export interface KanbanTask {
  id: string;
  name?: string | null;
  status: TaskState;
  project?: {
    id: string;
    name?: string | null;
  };
}

interface KanbanCardProps {
  task: KanbanTask;
  className?: string;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ className, task }) => {
  return (
    <li
      className={className}
      draggable
      css={css`
        border-radius: 4px;
        box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.2);
        background-color: white;

        &:hover .hover-icon {
          visibility: visible;
        }
      `}
      onDragStart={e => {
        e.dataTransfer.setData("task", JSON.stringify(task));
        e.dataTransfer.dropEffect = "move";
      }}
    >
      <Link
        css={css`
          color: inherit;
          text-decoration: none;
        `}
        to={`/tasks/${task.id}`}
      >
        <div
          css={css`
            display: flex;
          `}
        >
          <div
            css={css`
              width: 100%;
              box-sizing: border-box;
              border-radius: 6px;
              padding: 8px;
              margin: 0;
              border: 0;
              font-size: 14px;
              flex-grow: 1;
            `}
          >
            {task.name}
          </div>
          <IconEdit
            className="hover-icon"
            css={{
              width: 12,
              height: 12,
              margin: 8,
              flexShrink: 0,
              visibility: "hidden"
            }}
          />
        </div>
        {task.project && (
          <div>
            <div
              css={{
                padding: "4px 8px 8px 8px",
                fontSize: 12,
                fontWeight: "bold"
              }}
            >
              {task.project.name}
            </div>
          </div>
        )}
      </Link>
    </li>
  );
};

export default KanbanCard;
