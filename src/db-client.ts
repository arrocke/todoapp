import Airtable from "airtable";
import { useState, useEffect } from "react";

const base = new Airtable({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY
}).base(process.env.REACT_APP_AIRTABLE_BASE);

export interface ProjectRecord extends Airtable.FieldSet {
  id: string;
  name: string;
  tasks: string[];
}

export interface TaskRecord extends Airtable.FieldSet {
  id: string;
  name: string;
  status: "backlog" | "todo" | "progress" | "complete";
  project: string[];
}

const db = {
  projects: base("Projects") as Airtable.Table<ProjectRecord>,
  tasks: base("Tasks") as Airtable.Table<TaskRecord>
};

/**
 * Creates a hook that loads data with useEffect.
 * Maintains a loading state and prevents effect from completing if it run again.
 * @param options.load Async step of the loading process.
 * @param options.commit Function that runs when the async step has completed, but only if the effect has not been cancelled.
 * @param options.init The value that the hook is initialized to and is reset to when cancelled.
 * @example
 * const useData = createLoadingHook({
 *   load: (arg) => service.loadAsync(arg),
 *   commit: response => response.data,
 *   init: () => []
 * })
 * const [data, isLoading] = useData(arg)
 */
function createLoadingHook<State, Response, Argument>({
  load,
  commit,
  init
}: {
  load: (arg: Argument) => Promise<Response>;
  commit: (response: Response) => State;
  init: State | (() => State);
}): (arg: Argument) => [State, boolean] {
  return function(arg: Argument) {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [state, setState] = useState<State>(init);

    useEffect(() => {
      let isCancelled = false;
      (async () => {
        setLoading(true);
        const response = await load(arg);
        // Don't commit state if effect was cancelled.
        if (!isCancelled) {
          setState(commit(response));
        }
        setLoading(false);
      })();
      return () => {
        // Cancel so this doesn't have an async effect.
        isCancelled = true;
        setState(init);
        setLoading(false);
      };
    }, [arg]);

    return [state, isLoading];
  };
}

export const useProjects = createLoadingHook<
  ProjectRecord[],
  readonly Airtable.Row<ProjectRecord>[],
  void
>({
  load: () => db.projects.select().all(),
  commit: records => records.map(({ fields, id }) => ({ ...fields, id })),
  init: () => []
});

export function useProject(id: string) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [project, setProject] = useState<ProjectRecord>();
  const [tasks, setTasks] = useState<TaskRecord[]>([]);

  useEffect(() => {
    let isCancelled = false;
    (async () => {
      setLoading(true);
      const project = await db.projects.find(id);
      if (project) {
        if ((project.fields.tasks || []).length > 0) {
          const tasks = await db.tasks
            .select({
              filterByFormula: `OR(${project.fields.tasks
                .map(task => `RECORD_ID()="${task}"`)
                .join(",")})`
            })
            .all();
          if (!isCancelled) {
            setTasks(tasks.map(({ fields, id }) => ({ ...fields, id })));
          }
        }

        // Don't commit state if effect was cancelled.
        if (!isCancelled) {
          setProject({ ...project.fields, id: project.id });
        }
      }
      setLoading(false);
    })();
    return () => {
      // Cancel so this doesn't have an async effect.
      isCancelled = true;
      setProject(undefined);
      setLoading(false);
    };
  }, [id]);

  async function create({ id, ...task }: TaskRecord) {
    if (project) {
      const record = await db.tasks.create({
        ...task,
        project: [project.id]
      } as TaskRecord);
      setTasks(tasks => [...tasks, record.fields]);
    }
  }

  async function update({ id: taskId, ...task }: TaskRecord) {
    const { fields, id } = await db.tasks.update(taskId, task);
    setTasks(tasks => {
      const index = tasks.findIndex(task => task.id === taskId);
      return [
        ...tasks.slice(0, index),
        { ...fields, id },
        ...tasks.slice(index + 1)
      ];
    });
  }

  return { project, tasks, isLoading, create, update };
}

export function useTasks() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [tasks, setTasks] = useState<TaskRecord[]>([]);

  useEffect(() => {
    let isCancelled = false;
    (async () => {
      setLoading(true);
      const records = await db.tasks.select().all();
      // Don't commit state if effect was cancelled.
      if (!isCancelled) {
        setTasks(records.map(({ fields, id }) => ({ ...fields, id })));
      }
      setLoading(false);
    })();
    return () => {
      // Cancel so this doesn't have an async effect.
      isCancelled = true;
      setTasks([]);
      setLoading(false);
    };
  }, []);

  async function create({ id, ...task }: TaskRecord) {
    const record = await db.tasks.create(task as TaskRecord);
    setTasks(tasks => [...tasks, record.fields]);
  }

  async function update({ id: taskId, ...task }: TaskRecord) {
    const { fields, id } = await db.tasks.update(taskId, task);
    setTasks(tasks => {
      const index = tasks.findIndex(task => task.id === taskId);
      return [
        ...tasks.slice(0, index),
        { ...fields, id },
        ...tasks.slice(index + 1)
      ];
    });
  }

  return { tasks, isLoading, create, update };
}
