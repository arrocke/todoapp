/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import KanbanCard, { KanbanTask } from "./KanbanCard";
import { useState, useRef, useLayoutEffect } from "react";

interface KanbanListProps {
  className?: string;
  title: string;
  tasks: KanbanTask[];
  isOpen: boolean;
  onTaskAdd?: () => void;
  onTaskChange?: (task: KanbanTask) => void;
  onToggle?: () => void;
}

const KanbanList: React.FC<KanbanListProps> = ({
  className,
  title,
  tasks,
  isOpen,
  onTaskAdd = () => {},
  onTaskChange = () => {},
  onToggle
}) => {
  return (
    <div
      className={className}
      css={css`
        flex-basis: 42px;
        flex-shrink: ${isOpen ? "1" : "0"};
        flex-grow: ${isOpen ? "1" : "0"};
        display: flex;
        flex-direction: column;
        margin: 8px 0;
        padding: 8px 0;
        min-height: 0;
        background-color: #e8e8e8;
        border-radius: 8px;
        transition: flex-grow 1s;
        @media (min-width: 768px) {
          flex: 1 1 auto;
          margin: 0 8px;
          width: 240px;
          &:first-of-type: {
            margin-left: 0;
          }
          &:last-of-type: {
            margin-right: 0;
          }
        }
      `}
    >
      <h2
        css={css`
          margin: 8px 16px 16px 16px;
          font-size: 16px;
          &::before {
            content: "";
            margin: 4px 8px 0 0;
            border-left: 8px solid black;
            border-top: 6px solid transparent;
            border-bottom: 6px solid transparent;
            display: inline-block;
            transition: transform 0.8s;
            ${isOpen ? "transform: rotate(90deg)" : ""}
          }
          @media (min-width: 768px) {
            &::before {
              content: none;
            }
          }
        `}
        onClick={onToggle}
      >
        {title} ({tasks.length})
      </h2>
      <ul
        css={css`
          height: ${isOpen ? "100%" : "0"};
          overflow: auto;
          list-style-type: none;
          flex-grow: 1;
          margin: 0;
          padding: 0;
          min-height: 0;
        `}
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
