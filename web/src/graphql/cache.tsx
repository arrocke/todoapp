import {
  Project,
  Task,
  Sprint,
  CreateTaskMutation,
  ProjectQuery,
  ProjectQueryVariables,
  ProjectDocument,
  TasksQuery,
  TasksQueryVariables,
  TasksDocument
} from "./types";
import { DataProxy } from "apollo-cache";
import { InvariantError } from "ts-invariant";
import { FetchResult } from "apollo-link";

export type CachedProject = Partial<
  {
    __typename?: "Project" | undefined;
  } & Pick<Project, "id" | "name"> & {
      tasks: CachedTask[];
      backlogCount: number;
      todoCount: number;
      progressCount: number;
      completeCount: number;
    }
>;

export type CachedTask = Partial<
  {
    __typename?: "Task" | undefined;
  } & Pick<Task, "id" | "name" | "status"> & {
      project: CachedProject;
      sprints: CachedSprint[];
    }
>;

export type CachedSprint = Partial<
  {
    __typename?: "Sprint" | undefined;
  } & Pick<Sprint, "id" | "startDate" | "endDate"> & {
      tasks: CachedTask[];
      backlogCount: number;
      todoCount: number;
      progressCount: number;
      completeCount: number;
    }
>;

type CacheUpdaterFn<
  T = {
    [key: string]: any;
  },
  P = void
> = (cache: DataProxy, mutationResult: FetchResult<T>, params: P) => void;

function catchInvariantError(update: () => void) {
  try {
    update();
  } catch (error) {
    if (!(error instanceof InvariantError)) {
      throw error;
    }
  }
}

export const updateProjectWithNewTask: CacheUpdaterFn<
  CreateTaskMutation,
  string
> = (cache, { data }, id: string) => {
  catchInvariantError(() => {
    if (data && data.createTask) {
      const projectQuery = cache.readQuery<ProjectQuery, ProjectQueryVariables>(
        {
          query: ProjectDocument,
          variables: { id }
        }
      );
      if (projectQuery && projectQuery.project) {
        const project = projectQuery.project as CachedProject;
        if (project.tasks) project.tasks.push(data.createTask);
        if (typeof project.backlogCount === "number") project.backlogCount += 1;
        cache.writeQuery({
          query: ProjectDocument,
          variables: { id },
          data: projectQuery
        });
      }
    }
  });
};

export const updateTasksWithNewTask: CacheUpdaterFn<
  CreateTaskMutation,
  void
> = (cache, { data }) => {
  catchInvariantError(() => {
    if (data && data.createTask) {
      const tasksQuery = cache.readQuery<TasksQuery, TasksQueryVariables>({
        query: TasksDocument
      });
      if (tasksQuery) {
        if (tasksQuery.tasks) tasksQuery.tasks.push(data.createTask);
        cache.writeQuery({
          query: TasksDocument,
          data: tasksQuery
        });
      }
    }
  });
};
