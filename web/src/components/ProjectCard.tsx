/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Icon from "./Icon";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  project: {
    id: string;
    name?: string | null;
    backlogCount: number;
    todoCount: number;
    progressCount: number;
    completeCount: number;
  };
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ className, project }) => {
  const totalCount =
    project.backlogCount +
    project.completeCount +
    project.progressCount +
    project.todoCount;

  const completePercent = (project.backlogCount / totalCount) * 100;
  const progressPercent =
    completePercent + (project.progressCount / totalCount) * 100;
  const todoPercent = progressPercent + (project.todoCount / totalCount) * 100;

  return (
    <li
      className={className}
      draggable
      css={css`
        border-radius: 4px;
        box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.2);
        background-color: white;

        &:hover .hover-icon {
          visibility: visible;
        }
      `}
    >
      <Link
        css={css`
          color: inherit;
          text-decoration: none;
          padding: 8px;
          display: block;
        `}
        to={`/projects/${project.id}`}
      >
        <div
          css={css`
            display: flex;
          `}
        >
          <div
            css={css`
              box-sizing: border-box;
              border-radius: 6px;
              margin: 0;
              border: 0;
              font-size: 14px;
              flex-grow: 1;
            `}
          >
            {project.name}
          </div>
          <Icon
            type="pencil"
            className="hover-icon"
            css={{
              width: 12,
              height: 12,
              flexShrink: 0,
              visibility: "hidden"
            }}
          />
        </div>
        <div
          css={{
            display: "flex",
            marginTop: 8,
            alignItems: "center"
          }}
        >
          <div
            css={{
              fontSize: 12,
              marginRight: 16,
              fontWeight: "bold"
            }}
          >
            {totalCount} Tasks
          </div>
          <div
            css={{
              height: 8,
              borderRadius: 6,
              position: "relative",
              backgroundColor: "#e8e8e8",
              flexGrow: 1
            }}
          >
            <div
              css={{
                width: `${todoPercent}%`,
                backgroundColor: "#81dafc",
                position: "absolute",
                borderRadius: 4,
                height: 8
              }}
            />
            <div
              css={{
                width: `${progressPercent}%`,
                backgroundColor: "#f9c825",
                position: "absolute",
                borderRadius: 4,
                height: 8
              }}
            />
            <div
              css={{
                width: `${completePercent}%`,
                backgroundColor: "#90c566",
                position: "absolute",
                borderRadius: 4,
                height: 8
              }}
            />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ProjectCard;
