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
}

const db = {
  projects: base("Projects") as Airtable.Table<ProjectRecord>,
  tasks: base("Tasks") as Airtable.Table<TaskRecord>
};

export function useProjects() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<ProjectRecord[]>([]);

  useEffect(() => {
    let isCancelled = false;
    (async () => {
      setLoading(true);
      const records = await db.projects.select().all();
      if (!isCancelled) {
        setProjects(records.map(({ fields }) => fields));
      }
      setLoading(false);
    })();
    return () => {
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

  useEffect(() => {
    let isCancelled = false;
    (async () => {
      setLoading(true);
      const [record] = await db.projects
        .select({
          filterByFormula: `id=${id}`
        })
        .all();
      if (record && !isCancelled) {
        setProject(record.fields);
      }
      setLoading(false);
    })();
    return () => {
      isCancelled = true;
      setProject(undefined);
      setLoading(false);
    };
  }, [id]);

  return { project, isLoading };
}

export function useTasks(projectId?: string) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [tasks, setTasks] = useState<ProjectRecord[]>([]);

  useEffect(() => {
    let isCancelled = false;
    (async () => {
      setLoading(true);
      const records = await db.tasks
        .select({
          ...(projectId && {
            filterByFormula: `project="${projectId}"`
          })
        })
        .all();
      if (!isCancelled) {
        setTasks(records.map(({ fields }) => fields));
      }
      setLoading(false);
    })();
    return () => {
      isCancelled = true;
      setTasks([]);
      setLoading(false);
    };
  }, [projectId]);

  return { tasks, isLoading };
}
