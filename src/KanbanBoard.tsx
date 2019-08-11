/** @jsx jsx */
import { jsx } from "@emotion/core";
import { TaskRecord, ProjectRecord } from "./db-client";
import { useState, useEffect, useMemo } from "react";

interface KanbanBoardProps {
  tasks: TaskRecord[];
  projects?: ProjectRecord[];
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
  projects: ProjectRecord[];
  onTaskAdd?: () => void;
  onTaskChange?: (task: TaskRecord) => void;
}

interface KanbanTaskProps {
  task: TaskRecord;
  projects: ProjectRecord[];
  onTaskChange?: (task: TaskRecord) => void;
}

const KanbanTask: React.FC<KanbanTaskProps> = ({
  projects,
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

  const project =
    task.project && task.project[0]
      ? projects.find(project => project.id === task.project[0])
      : undefined;

  return (
    <p>
      <input
        value={name}
        onChange={e => setName({ name: e.target.value, isDirty: true })}
        onBlur={() => isDirty && onTaskChange({ ...task, name })}
      />
      <span>{project && project.name}</span>
    </p>
  );
};

const KanbanList: React.FC<KanbanListProps> = ({
  title,
  tasks,
  projects,
  onTaskAdd = () => {},
  onTaskChange = () => {}
}) => {
  const listElements = tasks.map(task => (
    <li key={task.id}>
      <KanbanTask task={task} projects={projects} onTaskChange={onTaskChange} />
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
  projects = [],
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
        projects={projects}
        onTaskAdd={() =>
          onTaskAdd({ id: "", name: "", status: "backlog", project: [] })
        }
        onTaskChange={onTaskChange}
      />
      <KanbanList
        title="To Do"
        tasks={lists.todo}
        projects={projects}
        onTaskAdd={() =>
          onTaskAdd({ id: "", name: "", status: "todo", project: [] })
        }
        onTaskChange={onTaskChange}
      />
      <KanbanList
        title="In Progress"
        tasks={lists.progress}
        projects={projects}
        onTaskAdd={() =>
          onTaskAdd({ id: "", name: "", status: "progress", project: [] })
        }
        onTaskChange={onTaskChange}
      />
      <KanbanList
        title="Complete"
        tasks={lists.complete}
        projects={projects}
        onTaskAdd={() =>
          onTaskAdd({ id: "", name: "", status: "complete", project: [] })
        }
        onTaskChange={onTaskChange}
      />
    </div>
  );
};

export default KanbanBoard;
