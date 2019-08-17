/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useSprints } from "./db-client";
import { Link } from "react-router-dom";
import LoadingContainer from "./LoadingContainer";

const SprintsView: React.FC = () => {
  const { sprints, isLoading } = useSprints();

  const sprintElements = sprints.map(sprint => (
    <li key={sprint.id}>
      <Link to={`/sprints/${sprint.id}`}>
        Sprint {sprint.number} ({sprint.startDate} - {sprint.endDate})
      </Link>
    </li>
  ));
  return (
    <LoadingContainer isLoading={isLoading}>
      <h1>Sprints</h1>
      <ul>{sprintElements}</ul>
    </LoadingContainer>
  );
};

export default SprintsView;
