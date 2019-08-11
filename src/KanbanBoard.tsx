/** @jsx jsx */
import { jsx } from "@emotion/core";
import { TaskRecord } from "./db-client";
import { useState, useEffect } from "react";

interface KanbanBoardProps {
  tasks: TaskRecord[];
  onTaskAdd?: (task: TaskRecord) => void;
  onTaskChange?: (task: TaskRecord) => void;
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
  onTaskChange?: (task: TaskRecord) => void;
}

interface KanbanTaskProps {
  task: TaskRecord;
  onTaskChange?: (task: TaskRecord) => void;
}

const KanbanTask: React.FC<KanbanTaskProps> = ({
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
    <input
      value={name}
      onChange={e => setName({ name: e.target.value, isDirty: true })}
      onBlur={() => isDirty && onTaskChange({ ...task, name })}
    />
  );
};

const KanbanList: React.FC<KanbanListProps> = ({
  title,
  tasks,
  onTaskAdd = () => {},
  onTaskChange = () => {}
}) => {
  const listElements = tasks.map(task => (
    <li key={task.id}>
      <KanbanTask task={task} onTaskChange={onTaskChange} />
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
          onTaskAdd({ id: "", name: "", status: "backlog", project: [] })
        }
        onTaskChange={onTaskChange}
      />
      <KanbanList
        title="To Do"
        tasks={lists.todo}
        onTaskAdd={() =>
          onTaskAdd({ id: "", name: "", status: "todo", project: [] })
        }
        onTaskChange={onTaskChange}
      />
      <KanbanList
        title="In Progress"
        tasks={lists.progress}
        onTaskAdd={() =>
          onTaskAdd({ id: "", name: "", status: "progress", project: [] })
        }
        onTaskChange={onTaskChange}
      />
      <KanbanList
        title="Complete"
        tasks={lists.complete}
        onTaskAdd={() =>
          onTaskAdd({ id: "", name: "", status: "complete", project: [] })
        }
        onTaskChange={onTaskChange}
      />
    </div>
  );
};

export default KanbanBoard;
