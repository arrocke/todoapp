/* eslint-disable */
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type CreateProjectInput = {
  name?: Maybe<Scalars['String']>,
};

export type CreateTaskInput = {
  name?: Maybe<Scalars['String']>,
  status: TaskState,
  project?: Maybe<Scalars['ID']>,
};

export type Mutation = {
  __typename?: 'Mutation',
  createProject: Project,
  updateProject?: Maybe<Project>,
  createTask: Task,
  updateTask?: Maybe<Task>,
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput
};


export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput
};


export type MutationCreateTaskArgs = {
  input: CreateTaskInput
};


export type MutationUpdateTaskArgs = {
  input: UpdateTaskInput
};

export type Project = {
  __typename?: 'Project',
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  tasks: Array<Task>,
};

export type Query = {
  __typename?: 'Query',
  projects: Array<Project>,
  project?: Maybe<Project>,
  tasks: Array<Task>,
  task?: Maybe<Task>,
};


export type QueryProjectArgs = {
  id: Scalars['ID']
};


export type QueryTaskArgs = {
  id: Scalars['ID']
};

export type Task = {
  __typename?: 'Task',
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  status: TaskState,
  project?: Maybe<Project>,
};

export enum TaskState {
  Backlog = 'backlog',
  Todo = 'todo',
  Progress = 'progress',
  Complete = 'complete'
}

export type UpdateProjectInput = {
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
};

export type UpdateTaskInput = {
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  status: TaskState,
  project?: Maybe<Scalars['ID']>,
};
export type CreateTaskMutationVariables = {
  input: CreateTaskInput
};


export type CreateTaskMutation = (
  { __typename?: 'Mutation' }
  & { createTask: (
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'name' | 'status'>
    & { project: Maybe<(
      { __typename?: 'Project' }
      & Pick<Project, 'id' | 'name'>
    )> }
  ) }
);

export type UpdateTaskMutationVariables = {
  input: UpdateTaskInput
};


export type UpdateTaskMutation = (
  { __typename?: 'Mutation' }
  & { updateTask: Maybe<(
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'name' | 'status'>
    & { project: Maybe<(
      { __typename?: 'Project' }
      & Pick<Project, 'id' | 'name'>
    )> }
  )> }
);

export type ProjectQueryVariables = {
  id: Scalars['ID']
};


export type ProjectQuery = (
  { __typename?: 'Query' }
  & { project: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name'>
    & { tasks: Array<(
      { __typename?: 'Task' }
      & Pick<Task, 'id' | 'name' | 'status'>
    )> }
  )> }
);

export type ProjectsQueryVariables = {};


export type ProjectsQuery = (
  { __typename?: 'Query' }
  & { projects: Array<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name'>
  )> }
);

export type TasksQueryVariables = {};


export type TasksQuery = (
  { __typename?: 'Query' }
  & { tasks: Array<(
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'name' | 'status'>
    & { project: Maybe<(
      { __typename?: 'Project' }
      & Pick<Project, 'id' | 'name'>
    )> }
  )> }
);

export const CreateTaskDocument = gql`
    mutation CreateTask($input: CreateTaskInput!) {
  createTask(input: $input) {
    id
    name
    status
    project {
      id
      name
    }
  }
}
    `;
export type CreateTaskMutationFn = ApolloReactCommon.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

    export function useCreateTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
      return ApolloReactHooks.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, baseOptions);
    };
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = ApolloReactCommon.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const UpdateTaskDocument = gql`
    mutation UpdateTask($input: UpdateTaskInput!) {
  updateTask(input: $input) {
    id
    name
    status
    project {
      id
      name
    }
  }
}
    `;
export type UpdateTaskMutationFn = ApolloReactCommon.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

    export function useUpdateTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
      return ApolloReactHooks.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, baseOptions);
    };
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = ApolloReactCommon.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const ProjectDocument = gql`
    query Project($id: ID!) {
  project(id: $id) {
    id
    name
    tasks {
      id
      name
      status
    }
  }
}
    `;

    export function useProjectQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
      return ApolloReactHooks.useQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, baseOptions);
    };
      export function useProjectLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, baseOptions);
      };
      
export type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>;
export type ProjectQueryResult = ApolloReactCommon.QueryResult<ProjectQuery, ProjectQueryVariables>;
export const ProjectsDocument = gql`
    query Projects {
  projects {
    id
    name
  }
}
    `;

    export function useProjectsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
      return ApolloReactHooks.useQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, baseOptions);
    };
      export function useProjectsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, baseOptions);
      };
      
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export type ProjectsQueryResult = ApolloReactCommon.QueryResult<ProjectsQuery, ProjectsQueryVariables>;
export const TasksDocument = gql`
    query Tasks {
  tasks {
    id
    name
    status
    project {
      id
      name
    }
  }
}
    `;

    export function useTasksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TasksQuery, TasksQueryVariables>) {
      return ApolloReactHooks.useQuery<TasksQuery, TasksQueryVariables>(TasksDocument, baseOptions);
    };
      export function useTasksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TasksQuery, TasksQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<TasksQuery, TasksQueryVariables>(TasksDocument, baseOptions);
      };
      
export type TasksQueryHookResult = ReturnType<typeof useTasksQuery>;
export type TasksQueryResult = ApolloReactCommon.QueryResult<TasksQuery, TasksQueryVariables>;