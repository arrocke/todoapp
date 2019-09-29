/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Icon from "./Icon";
import Card from "./Card";
import ProgressBar, { ProgressMarker } from "./ProgressBar";
import { readerOnly } from "../styles";

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

  const completePercent = project.completeCount / totalCount;
  const progressPercent = completePercent + project.progressCount / totalCount;
  const todoPercent = progressPercent + project.todoCount / totalCount;

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
      <div>
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
            {!project.name && <span css={readerOnly}>Unnamed Project</span>}
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
          <ProgressBar>
            <ProgressMarker progress={todoPercent} color="#81dafc" />
            <ProgressMarker progress={progressPercent} color="#f9c825" />
            <ProgressMarker progress={completePercent} color="#90c566" />
          </ProgressBar>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
