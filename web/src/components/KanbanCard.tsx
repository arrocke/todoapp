/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { TaskState } from "../graphql/types";
import Icon from "./Icon";
import Card from "./Card";

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
    <Card
      className={className}
      draggable
      css={css`
        &:hover .hover-icon {
          visibility: visible;
        }
      `}
      onDragStart={e => {
        e.dataTransfer.setData("task", JSON.stringify(task));
        e.dataTransfer.dropEffect = "move";
      }}
      to={`/tasks/${task.id}`}
      tag="li"
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
        <Icon
          type="pencil"
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
    </Card>
  );
};

export default KanbanCard;
