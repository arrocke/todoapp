/** @jsx jsx */
import { jsx } from "@emotion/core";
import { RouteComponentProps } from "react-router";
import LoadingContainer from "./LoadingContainer";
import KanbanBoard from "./KanbanBoard";

interface SprintViewProps extends RouteComponentProps<{ id: string }> {}

const SprintView: React.FC<SprintViewProps> = ({ match }) => {
  return null;
  // const {
  //   sprint,
  //   tasks,
  //   isLoading: isLoadingSprint,
  //   create,
  //   update
  // } = useSprint(match.params.id);
  // const { projects, isLoading: isLoadingProjects } = useProjects();
  // return (
  //   <LoadingContainer isLoading={isLoadingSprint || isLoadingProjects}>
  //     {sprint ? (
  //       <div>
  //         <h1>
  //           Sprint {sprint.number} ({sprint.startDate} - {sprint.endDate})
  //         </h1>
  //         <KanbanBoard
  //           tasks={tasks}
  //           projects={projects}
  //           onTaskAdd={create}
  //           onTaskChange={update}
  //         />
  //       </div>
  //     ) : (
  //       <div>Sprint not found</div>
  //     )}
  //   </LoadingContainer>
  // );
};

export default SprintView;
