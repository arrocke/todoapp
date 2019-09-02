/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState, useEffect } from "react";
import { TaskState } from "./graphql/types";

interface KanbanTask {
  id: string;
  name?: string | null;
  status: TaskState;
  project?: {
    id: string;
    name?: string | null;
  };
}

interface KanbanBoardProps {
  tasks: KanbanTask[];
  onTaskAdd?: (task: KanbanTask) => void;
  onTaskChange?: (task: KanbanTask) => void;
}

interface SortedTasks {
  [status: string]: KanbanTask[];
  backlog: KanbanTask[];
  todo: KanbanTask[];
  progress: KanbanTask[];
  complete: KanbanTask[];
}

interface KanbanListProps {
  title: string;
  tasks: KanbanTask[];
  onTaskAdd?: () => void;
  onTaskChange?: (task: KanbanTask) => void;
}

interface TaskCardProps {
  task: KanbanTask;
  onTaskChange?: (task: KanbanTask) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onTaskChange = () => {}
}) => {
  const [{ name, isDirty }, setName] = useState({
    name: task.name,
    isDirty: false
  });

  useEffect(() => {
    setName({ name: task.name || "", isDirty: false });
  }, [task.name]);

  return (
    <li>
      <p css={{ marginBottom: 0 }}>
        <input
          type="text"
          value={name || undefined}
          onChange={e => setName({ name: e.target.value, isDirty: true })}
          onBlur={() => isDirty && onTaskChange({ ...task, name })}
        />
        <span>{task.project && task.project.name}</span>
      </p>
      <p css={{ marginTop: 0 }}>
        <button
          onClick={() =>
            onTaskChange({ ...task, name, status: TaskState.Backlog })
          }
        >
          B
        </button>
        <button
          onClick={() =>
            onTaskChange({ ...task, name, status: TaskState.Todo })
          }
        >
          T
        </button>
        <button
          onClick={() =>
            onTaskChange({ ...task, name, status: TaskState.Progress })
          }
        >
          P
        </button>
        <button
          onClick={() =>
            onTaskChange({ ...task, name, status: TaskState.Complete })
          }
        >
          C
        </button>
      </p>
    </li>
  );
};

const KanbanList: React.FC<KanbanListProps> = ({
  title,
  tasks,
  onTaskAdd = () => {},
  onTaskChange = () => {}
}) => {
  const listElements = tasks.map(task => (
    <TaskCard key={task.id} task={task} onTaskChange={onTaskChange} />
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
  onTaskAdd = () => {},
  onTaskChange = () => {}
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
          onTaskAdd({ id: "", name: "", status: TaskState.Backlog })
        }
        onTaskChange={onTaskChange}
      />
      <KanbanList
        title="To Do"
        tasks={lists.todo}
        onTaskAdd={() =>
          onTaskAdd({ id: "", name: "", status: TaskState.Todo })
        }
        onTaskChange={onTaskChange}
      />
      <KanbanList
        title="In Progress"
        tasks={lists.progress}
        onTaskAdd={() =>
          onTaskAdd({ id: "", name: "", status: TaskState.Progress })
        }
        onTaskChange={onTaskChange}
      />
      <KanbanList
        title="Complete"
        tasks={lists.complete}
        onTaskAdd={() =>
          onTaskAdd({ id: "", name: "", status: TaskState.Complete })
        }
        onTaskChange={onTaskChange}
      />
    </div>
  );
};

export default KanbanBoard;
