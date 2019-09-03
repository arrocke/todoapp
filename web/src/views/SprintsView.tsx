/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Link } from "react-router-dom";
import LoadingContainer from "../components/LoadingContainer";
import { useSprintsQuery } from "../graphql/types";

const SprintsView: React.FC = () => {
  const { data, loading } = useSprintsQuery();

  return (
    <LoadingContainer isLoading={loading}>
      <h1>Sprints</h1>
      <ul>
        {data &&
          data.sprints.map(sprint => (
            <li key={sprint.id}>
              <Link to={`/sprints/${sprint.id}`}>
                Sprint ({sprint.startDate} - {sprint.endDate})
              </Link>
            </li>
          ))}
      </ul>
    </LoadingContainer>
  );
};

export default SprintsView;
