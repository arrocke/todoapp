/** @jsx jsx */
import { jsx } from "@emotion/core";
import { TaskRecord } from "./db-client";

interface KanbanBoardProps {
  tasks: TaskRecord[];
  onTaskAdd?: (task: TaskRecord) => void;
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
  onTaskAdd?: () => void;
}

const KanbanList: React.FC<KanbanListProps> = ({
  title,
  tasks,
  onTaskAdd = () => {}
}) => {
  const listElements = tasks.map(({ name, id }) => (
    <li
      css={{
        border: "1px solid black",
        margin: 4,
        minHeight: 20
      }}
      key={id}
    >
      {name}
    </li>
  ));
  return (
    <div>
      <h2>{title}</h2>
      <ul
        css={{
          listStyleType: "none",
          padding: 0
        }}
      >
        <li>
          <button onClick={onTaskAdd}>+ Add Task</button>
        </li>
        {listElements}
      </ul>
    </div>
  );
};

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  tasks,
  onTaskAdd = () => {}
}) => {
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
      <KanbanList
        title="Backlog"
        tasks={lists.backlog}
        onTaskAdd={() =>
          onTaskAdd({ id: "", name: "", status: "backlog", project: [] })
        }
      />
      <KanbanList
        title="To Do"
        tasks={lists.todo}
        onTaskAdd={() =>
          onTaskAdd({ id: "", name: "", status: "todo", project: [] })
        }
      />
      <KanbanList
        title="In Progress"
        tasks={lists.progress}
        onTaskAdd={() =>
          onTaskAdd({ id: "", name: "", status: "progress", project: [] })
        }
      />
      <KanbanList
        title="Complete"
        tasks={lists.complete}
        onTaskAdd={() =>
          onTaskAdd({ id: "", name: "", status: "complete", project: [] })
        }
      />
    </div>
  );
};

export default KanbanBoard;
