/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { TaskState } from "../graphql/types";
import KanbanList from "./KanbanList";
import { KanbanTask } from "./KanbanCard";
import { useState } from "react";

interface KanbanBoardProps {
  className?: string;
  tasks: KanbanTask[];
  onTaskChange?: (task: KanbanTask) => void;
}

const listConfig: {
  status: TaskState;
  title: string;
  next: TaskState;
  prev: TaskState;
}[] = [
  {
    status: TaskState.Backlog,
    title: "Backlog",
    next: TaskState.Todo,
    prev: TaskState.Complete
  },
  {
    status: TaskState.Todo,
    title: "To Do",
    next: TaskState.Progress,
    prev: TaskState.Backlog
  },
  {
    status: TaskState.Progress,
    title: "In Progress",
    next: TaskState.Complete,
    prev: TaskState.Todo
  },
  {
    status: TaskState.Complete,
    title: "Complete",
    next: TaskState.Todo,
    prev: TaskState.Progress
  }
];

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  className,
  tasks,
  onTaskChange = () => {}
}) => {
  const [visibleList, setVisibleList] = useState<string>("progress");

  return (
    <div
      className={className}
      css={css`
        display: flex;
        justify-content: center;
        margin: 16px;
      `}
    >
      {listConfig.map(({ status, title, next, prev }) => (
        <KanbanList
          css={[
            css`
              margin: 8px 0;
              width: 100%;
              @media (min-width: 768px) {
                margin: 0 8px;
                width: 360px;
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
          title={title}
          status={status}
          tasks={tasks}
          isVisible={visibleList === status}
          onTaskChange={onTaskChange}
          onNextListClick={() => setVisibleList(next)}
          onPrevListClick={() => setVisibleList(prev)}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
