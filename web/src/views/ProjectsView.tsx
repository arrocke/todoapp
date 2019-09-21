/** @jsx jsx */
import { jsx } from "@emotion/core";
import LoadingContainer from "../components/LoadingContainer";
import { useProjectsQuery } from "../graphql/types";
import ViewTitle from "../components/ViewTitle";
import ProjectCard from "../components/ProjectCard";

const ProjectsView: React.FC = () => {
  const { loading, data } = useProjectsQuery();

  return (
    <LoadingContainer
      css={{
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
      isLoading={loading}
    >
      <ViewTitle>Projects</ViewTitle>
      <ul
        css={{
          padding: "8px 0",
          backgroundColor: "#e8e8e8",
          borderRadius: 8,
          listStyleTtype: "none",
          flexGrow: 1,
          margin: " 0 16px 16px 16px",
          minHeight: 0,
          overflowY: "auto"
        }}
      >
        {data &&
          data.projects.map(project => (
            <ProjectCard
              css={{
                margin: 8,
                "&:first-of-type": {
                  marginTop: 0
                },
                "&:last-of-type": {
                  marginBottom: 0
                }
              }}
              key={project.id}
              project={project}
            />
          ))}
      </ul>
    </LoadingContainer>
  );
};

export default ProjectsView;
