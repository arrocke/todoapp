/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Icon from "./Icon";
import Card from "./Card";

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

  const completePercent = (project.completeCount / totalCount) * 100;
  const progressPercent =
    completePercent + (project.progressCount / totalCount) * 100;
  const todoPercent = progressPercent + (project.todoCount / totalCount) * 100;

  return (
    <Card
      tag="li"
      className={className}
      draggable
      css={css`
        &:hover .hover-icon {
          visibility: visible;
        }
      `}
      to={`/projects/${project.id}`}
    >
      <div
        css={css`
          display: flex;
          padding: 8px 8px 0 8px;
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
          padding: "0 8px 8px 8px",
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
    </Card>
  );
};

export default ProjectCard;
