/** @jsx jsx */
import { jsx } from "@emotion/core";
import LoadingContainer from "../components/LoadingContainer";
import { useSprintsQuery } from "../graphql/types";
import ViewHeader from "../components/ViewHeader";
import SprintCard from "../components/SprintCard";
import ViewTitle from "../components/ViewTitle";

const SprintsView: React.FC = () => {
  const { data, loading } = useSprintsQuery();

  return (
    <LoadingContainer
      css={{
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
      isLoading={loading}
    >
      <ViewHeader>
        <ViewTitle title="Sprints" />
      </ViewHeader>
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
          data.sprints.map(sprint => (
            <SprintCard
              css={{
                margin: 8,
                "&:first-of-type": {
                  marginTop: 0
                },
                "&:last-of-type": {
                  marginBottom: 0
                }
              }}
              key={sprint.id}
              sprint={sprint}
            />
          ))}
      </ul>
    </LoadingContainer>
  );
};

export default SprintsView;
