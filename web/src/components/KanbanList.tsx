/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import KanbanCard, { KanbanTask } from "./KanbanCard";
import { TaskState } from "../graphql/types";
import { useState } from "react";

interface KanbanListProps {
  className?: string;
  title: string;
  status: TaskState;
  tasks: KanbanTask[];
  isVisible: boolean;
  onTaskChange?: (task: KanbanTask) => void;
  onPrevListClick?: () => void;
  onNextListClick?: () => void;
}

const listButtonStyle = css`
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  padding: 0;
  margin: 0;
  border: none;
  background: inherit;
  &::before {
    content: "";
    display: inline-block;
    margin: 2px 0 0 0;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
  }
  @media (min-width: 768px) {
    display: none;
  }
`;

const KanbanList: React.FC<KanbanListProps> = ({
  className,
  title,
  tasks,
  status,
  isVisible,
  onTaskChange = () => {},
  onNextListClick,
  onPrevListClick
}) => {
  const [dragCount, setDragCount] = useState<number>(0);
  const isDraggedOver = !!dragCount;

  const filteredTasks = tasks.filter(task => task.status === status);

  return (
    <div
      className={className}
      css={css`
        display: ${isVisible ? "flex" : "none"};
        flex-direction: column;
        margin: 0;
        padding: 0 0 8px 0;
        background-color: #e8e8e8;
        border-radius: 8px;
        border: 2px solid transparent;
        ${isDraggedOver && "border-color: black;"}
        @media (min-width: 768px) {
          display: flex;
        }
      `}
      onDragOver={e => {
        if (e.dataTransfer.types.includes("task")) {
          e.preventDefault();
          e.dataTransfer.dropEffect = "move";
        }
      }}
      onDragEnter={e => {
        if (e.dataTransfer.types.includes("task")) {
          setDragCount(dragCount + 1);
        }
      }}
      onDragLeave={e => {
        if (e.dataTransfer.types.includes("task")) {
          setDragCount(dragCount - 1);
        }
      }}
      onDrop={e => {
        if (e.dataTransfer.types.includes("task")) {
          e.preventDefault();
          const task = JSON.parse(e.dataTransfer.getData("task")) as KanbanTask;
          setDragCount(0);
          onTaskChange({
            ...task,
            status
          });
        }
      }}
    >
      <div
        css={css`
          display: flex;
        `}
      >
        <button
          css={[
            listButtonStyle,
            css`
              &::before {
                border-right: 8px solid black;
              }
            `
          ]}
          aria-label="Previous List"
          onClick={onPrevListClick}
        />
        <h2
          css={css`
            margin: 16px 16px 16px 0;
            width: 100%;
            font-size: 16px;
            text-align: center;
            @media (min-width: 768px) {
              text-align: left;
              margin: 16px;
            }
          `}
        >
          {title}
        </h2>
        <button
          css={[
            listButtonStyle,
            css`
              &::before {
                border-left: 8px solid black;
              }
            `
          ]}
          aria-label="Next List"
          onClick={onNextListClick}
        />
      </div>
      <ul
        css={css`
          list-style-type: none;
          flex-grow: 1;
          margin: 0;
          padding: 0;
          min-height: 0;
          overflow-y: auto;
        `}
      >
        {filteredTasks.map(task => (
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
          />
        ))}
      </ul>
    </div>
  );
};

export default KanbanList;
