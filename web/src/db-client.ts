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

export interface SprintRecord extends Airtable.FieldSet {
  id: string;
  number: number;
  startDate: string;
  endDate: string;
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
  tasks: base("Tasks") as Airtable.Table<TaskRecord>,
  sprints: base("Sprints") as Airtable.Table<SprintRecord>
};

export function useProjects() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<ProjectRecord[]>([]);

  useEffect(() => {
    let isCancelled = false;
    (async () => {
      setLoading(true);
      const records = await db.projects.select().all();
      // Don't commit state if effect was cancelled.
      if (!isCancelled) {
        setProjects(records.map(({ fields, id }) => ({ ...fields, id })));
      }
      setLoading(false);
    })();
    return () => {
      // Cancel so this doesn't have an async effect.
      isCancelled = true;
      setProjects([]);
      setLoading(false);
    };
  }, []);

  return { projects, isLoading };
}

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

export function useSprints() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [sprints, setSprints] = useState<SprintRecord[]>([]);

  useEffect(() => {
    let isCancelled = false;
    (async () => {
      setLoading(true);
      const records = await db.sprints.select().all();
      // Don't commit state if effect was cancelled.
      if (!isCancelled) {
        setSprints(records.map(({ fields, id }) => ({ ...fields, id })));
      }
      setLoading(false);
    })();
    return () => {
      // Cancel so this doesn't have an async effect.
      isCancelled = true;
      setSprints([]);
      setLoading(false);
    };
  }, []);

  return { sprints, isLoading };
}

export function useSprint(id: string) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [sprint, setSprint] = useState<SprintRecord>();
  const [tasks, setTasks] = useState<TaskRecord[]>([]);

  useEffect(() => {
    let isCancelled = false;
    (async () => {
      setLoading(true);
      const sprint = await db.sprints.find(id);
      if (sprint) {
        if ((sprint.fields.tasks || []).length > 0) {
          const tasks = await db.tasks
            .select({
              filterByFormula: `OR(${sprint.fields.tasks
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
          setSprint({ ...sprint.fields, id: sprint.id });
        }
      }
      setLoading(false);
    })();
    return () => {
      // Cancel so this doesn't have an async effect.
      isCancelled = true;
      setSprint(undefined);
      setLoading(false);
    };
  }, [id]);

  async function create({ id, ...task }: TaskRecord) {
    if (sprint) {
      const record = await db.tasks.create({
        ...task,
        project: [sprint.id]
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

  return { sprint, tasks, isLoading, create, update };
}
