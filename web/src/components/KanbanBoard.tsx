/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { TaskState } from "../graphql/types";
import KanbanList from "./KanbanList";
import { KanbanTask } from "./KanbanCard";
import { useState } from "react";

interface KanbanBoardProps {
  className?: string;
  tasks: KanbanTask[];
  onTaskAdd?: (task: KanbanTask) => void;
  onTaskChange?: (task: KanbanTask) => void;
}

type OpenState = [boolean, boolean, boolean, boolean];

const titleMap = new Map<TaskState, string>([
  [TaskState.Backlog, "Backlog"],
  [TaskState.Complete, "Complete"],
  [TaskState.Progress, "In Progress"],
  [TaskState.Todo, "To Do"]
]);

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  className,
  tasks,
  onTaskAdd = () => {},
  onTaskChange = () => {}
}) => {
  const [isOpen, setIsOpen] = useState<OpenState>([false, false, true, false]);
  return (
    <div
      className={className}
      css={css`
        margin: 16px;
        display: flex;
        flex-direction: column;
        justify-content: stretch;
        @media (min-width: 768px) {
          display: flex;
          flex-direction: row;
          justify-content: center;
        }
      `}
    >
      {Object.values(TaskState).map((status, i) => (
        <KanbanList
          key={status}
          title={titleMap.get(status) || ""}
          tasks={tasks.filter(task => task.status === status)}
          isOpen={isOpen[i]}
          onTaskAdd={() => onTaskAdd({ id: "", name: "", status })}
          onTaskChange={onTaskChange}
          onToggle={() => {
            const newIsOpen: OpenState = [false, false, false, false];
            newIsOpen[i] = !isOpen[i];
            setIsOpen(newIsOpen);
          }}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
