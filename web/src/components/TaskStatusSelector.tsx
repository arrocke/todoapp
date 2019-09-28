/** @jsx jsx */
import { jsx } from "@emotion/core";
import ButtonSelector, {
  ButtonSelectorOption,
  ButtonSelectorProps
} from "./ButtonSelector";
import { TaskState } from "../graphql/types";

interface TaskStatusSelectorProps extends ButtonSelectorProps {
  value: TaskState;
  onChange?(value: TaskState): void;
}

const TaskStatusSelector: React.FC<TaskStatusSelectorProps> = props => {
  return (
    <ButtonSelector {...props}>
      <ButtonSelectorOption value={TaskState.Backlog} title="Backlog" />
      <ButtonSelectorOption value={TaskState.Todo} title="To Do" />
      <ButtonSelectorOption value={TaskState.Progress} title="Progress" />
      <ButtonSelectorOption value={TaskState.Complete} title="Complete" />
    </ButtonSelector>
  );
};

export default TaskStatusSelector;
