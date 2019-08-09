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
  const [projects, setProjects] = useState<ProjectRecord[]>([]);

  useEffect(() => {
    async function effect() {
      const records = await db.projects.select().all();
      setProjects(records.map(({ fields, id }) => ({ ...fields, id })));
    }
    effect();
  }, []);

  return { projects };
}
