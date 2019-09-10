/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useState, useEffect } from "react";
import { TaskState } from "../graphql/types";
import IconEdit from "./IconEdit";

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
  onTaskChange?: (task: KanbanTask) => void;
}

const KanbanCard: React.FC<KanbanCardProps> = ({
  className,
  task,
  onTaskChange = () => {}
}) => {
  const [{ name, isDirty }, setName] = useState({
    name: task.name || "",
    isDirty: false
  });
  const [isDragging, setDragging] = useState<boolean>(false);

  useEffect(() => {
    setName({ name: task.name || "", isDirty: false });
  }, [task.name]);

  return (
    <li
      className={className}
      draggable
      css={css`
        border-radius: 4px;
        box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.2);
        background-color: white;

        &:hover input:not(:focus) + .hover-icon {
          visibility: visible;
        }
      `}
      onDragStart={e => {
        e.dataTransfer.setData("task", JSON.stringify(task));
        e.dataTransfer.dropEffect = "move";
        setDragging(true);
      }}
      onDragEnd={e => {
        setDragging(false);
      }}
    >
      <div
        css={css`
          position: relative;
        `}
      >
        <input
          type="text"
          css={css`
            width: 100%;
            box-sizing: border-box;
            border-radius: 6px;
            padding: 8px;
            margin: 0;
            border: 0;
            font-size: 14px;
            ${isDragging && "outline: none;"}
          `}
          value={name}
          aria-label="Task Name"
          onChange={e => setName({ name: e.target.value, isDirty: true })}
          onBlur={() => isDirty && onTaskChange({ ...task, name })}
        />
        <IconEdit
          className="hover-icon"
          css={{
            zIndex: 1,
            position: "absolute",
            width: 12,
            height: 12,
            top: 8,
            right: 8,
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
    </li>
  );
};

export default KanbanCard;
