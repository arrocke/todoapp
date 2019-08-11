import Airtable from "airtable";
import { useState, useEffect } from "react";

const base = new Airtable({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY
}).base(process.env.REACT_APP_AIRTABLE_BASE);

export interface ProjectRecord extends Airtable.FieldSet {
  id: string;
  name: string;
}

export interface TaskRecord extends Airtable.FieldSet {
  id: string;
  name: string;
  status: "backlog" | "todo" | "progress" | "complete";
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
  commit: records => records.map(({ fields }) => fields),
  init: () => []
});

export const useProject = createLoadingHook<
  ProjectRecord | undefined,
  readonly Airtable.Row<ProjectRecord>[],
  string
>({
  load: id =>
    db.projects
      .select({
        filterByFormula: `id=${id}`
      })
      .all(),
  commit: ([record]) => (record ? record.fields : undefined),
  init: undefined
});

export const useTasks = createLoadingHook<
  TaskRecord[],
  readonly Airtable.Row<TaskRecord>[],
  { projectId?: string }
>({
  load: ({ projectId }) =>
    db.tasks
      .select({
        ...(projectId && {
          filterByFormula: `project="${projectId}"`
        })
      })
      .all(),
  commit: records => records.map(({ fields }) => fields),
  init: () => []
});
