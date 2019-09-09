/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import KanbanCard, { KanbanTask } from "./KanbanCard";

interface KanbanListProps {
  className?: string;
  title: string;
  tasks: KanbanTask[];
  onTaskAdd?: () => void;
  onTaskChange?: (task: KanbanTask) => void;
}

const KanbanList: React.FC<KanbanListProps> = ({
  className,
  title,
  tasks,
  onTaskAdd = () => {},
  onTaskChange = () => {}
}) => {
  return (
    <div
      className={className}
      css={{
        display: "flex",
        flexDirection: "column",
        margin: 0,
        padding: "8px 0",
        backgroundColor: "#e8e8e8",
        borderRadius: 8
      }}
    >
      <h2
        css={{
          margin: "8px 16px 16px 16px",
          fontSize: 16
        }}
      >
        {title}
      </h2>
      <ul
        css={{
          listStyleType: "none",
          flexGrow: 1,
          margin: 0,
          padding: 0,
          minHeight: 0,
          overflowY: "auto"
        }}
      >
        {tasks.map(task => (
          <KanbanCard
            css={css`
              margin: 8px;

              &:first-of-type {
                margin-top: 0;
              }

              &:last-of-type {
                margin-bottom: 0;
              }
            `}
            key={task.id}
            task={task}
            onTaskChange={onTaskChange}
          />
        ))}
      </ul>
    </div>
  );
};

export default KanbanList;
