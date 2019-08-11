/** @jsx jsx */
import { jsx } from "@emotion/core";
import { TaskRecord } from "./db-client";

interface KanbanBoardProps {
  tasks: TaskRecord[];
}

interface SortedTasks {
  backlog: TaskRecord[];
  todo: TaskRecord[];
  progress: TaskRecord[];
  complete: TaskRecord[];
}

interface KanbanListProps {
  title: string;
  tasks: TaskRecord[];
}

const KanbanList: React.FC<KanbanListProps> = ({ title, tasks }) => {
  const listElements = tasks.map(({ name, id }) => <li key={id}>{name}</li>);
  return (
    <div>
      <h2>{title}</h2>
      <ul>{listElements}</ul>
    </div>
  );
};

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks }) => {
  const lists = tasks.reduce<SortedTasks>(
    (tasks, task) => {
      const list = tasks[task.status];
      list && list.push(task);
      return tasks;
    },
    {
      backlog: [],
      todo: [],
      progress: [],
      complete: []
    }
  );
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "space-around"
      }}
    >
      <KanbanList title="Backlog" tasks={lists.backlog} />
      <KanbanList title="To Do" tasks={lists.todo} />
      <KanbanList title="In Progress" tasks={lists.progress} />
      <KanbanList title="Complete" tasks={lists.complete} />
    </div>
  );
};

export default KanbanBoard;
