/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { TaskState } from "../graphql/types";
import KanbanList from "./KanbanList";
import { KanbanTask } from "./KanbanCard";

interface KanbanBoardProps {
  className?: string;
  tasks: KanbanTask[];
  onTaskAdd?: (task: KanbanTask) => void;
  onTaskChange?: (task: KanbanTask) => void;
}

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
  return (
    <div
      className={className}
      css={css`
        margin: 16px;
        overflow-x: auto;
        @media (min-width: 768px) {
          display: flex;
          justify-content: center;
        }
      `}
    >
      {Object.values(TaskState).map(status => (
        <KanbanList
          css={[
            css`
              margin: 8px 0;
              @media (min-width: 768px) {
                margin: 0 8px;
                width: 240px;
                &:first-of-type: {
                  margin-left: 0;
                }
                &:last-of-type: {
                  margin-right: 0;
                }
              }
            `
          ]}
          key={status}
          title={titleMap.get(status) || ""}
          tasks={tasks.filter(task => task.status === status)}
          onTaskAdd={() => onTaskAdd({ id: "", name: "", status })}
          onTaskChange={onTaskChange}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
