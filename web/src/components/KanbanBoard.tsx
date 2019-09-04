/** @jsx jsx */
import { jsx } from "@emotion/core";
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
      css={{
        display: "flex"
      }}
    >
      {Object.values(TaskState).map(status => (
        <KanbanList
          css={{
            margin: 8,
            width: 240,
            flexShrink: 0
          }}
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
