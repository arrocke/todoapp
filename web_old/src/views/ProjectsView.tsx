/** @jsx jsx */
import { jsx } from "@emotion/core";
import LoadingContainer from "../components/LoadingContainer";
import {
  useProjectsQuery,
  useCreateProjectMutation,
  ProjectsDocument,
  ProjectsQuery
} from "../graphql/types";
import ViewHeader from "../components/ViewHeader";
import ProjectCard from "../components/ProjectCard";
import ViewTitle from "../components/ViewTitle";
import AddButton from "../components/AddButton";
import { RouteComponentProps } from "react-router";
import { Fragment } from "react";

const ProjectsView: React.FC<RouteComponentProps> = ({ history }) => {
  const { loading, data: { projects = [] } = {} } = useProjectsQuery({
    fetchPolicy: "cache-and-network"
  });
  const [createProject] = useCreateProjectMutation({
    update(cache, { data }) {
      if (data) {
        const query = cache.readQuery<ProjectsQuery, {}>({
          query: ProjectsDocument
        });
        if (query) {
          query.projects.push({
            ...data.createProject,
            backlogCount: 0,
            todoCount: 0,
            progressCount: 0,
            completeCount: 0
          });
        }
        cache.writeQuery({
          query: ProjectsDocument,
          data: query
        });
      }
    }
  });

  return (
    <LoadingContainer
      css={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative"
      }}
      isLoading={loading && projects.length === 0}
    >
      {() => (
        <Fragment>
          <ViewHeader>
            <ViewTitle title="Projects" />
          </ViewHeader>
          <AddButton
            onClick={async () => {
              const { data } = await createProject();
              if (data) {
                history.push(`/projects/${data.createProject.id}`);
              }
            }}
            aria-label="Add Project"
          />
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
            {projects.map(project => (
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
        </Fragment>
      )}
    </LoadingContainer>
  );
};

export default ProjectsView;
