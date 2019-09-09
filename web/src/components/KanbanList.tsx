/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import KanbanCard, { KanbanTask } from "./KanbanCard";
import { useState, useRef, useLayoutEffect } from "react";

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
  const listElement = useRef<HTMLUListElement>(null);
  const [isClosed, setClosed] = useState<boolean>(true);
  const [listHeight, setListHeight] = useState<string>("0");

  useLayoutEffect(() => {
    if (listElement.current) {
      setListHeight(`${listElement.current.clientHeight}px`);
      if (isClosed) {
        const timeout = setTimeout(() => {
          setListHeight("0");
        });
        return () => clearTimeout(timeout);
      }
    }
  }, [isClosed]);

  return (
    <div
      className={className}
      css={css`
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 8px 0;
        background-color: #e8e8e8;
        border-radius: 8px;
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
            ${isClosed ? "" : "transform: rotate(90deg)"}
          }
          @media (min-width: 768px) {
            &::before {
              content: none;
            }
          }
        `}
        onClick={() => setClosed(closed => !closed)}
      >
        {title} ({tasks.length})
      </h2>
      <div
        css={css`
          height: ${listHeight};
          transition: height 0.8s;
          overflow: hidden;
          @media (min-width: 768px) {
            height: auto;
          }
        `}
        onTransitionEnd={() =>
          listElement.current &&
          !isClosed &&
          setListHeight(`${listElement.current.clientHeight}px`)
        }
      >
        <ul
          ref={listElement}
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
    </div>
  );
};

export default KanbanList;
