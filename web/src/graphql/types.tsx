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
  Date: string,
};

export type AddToSprintInput = {
  sprint: Scalars['ID'],
  task: Scalars['ID'],
};

export type CreateProjectInput = {
  name?: Maybe<Scalars['String']>,
};

export type CreateSprintInput = {
  startDate: Scalars['Date'],
  endDate: Scalars['Date'],
};

export type CreateTaskInput = {
  name?: Maybe<Scalars['String']>,
  status?: Maybe<TaskState>,
  project?: Maybe<Scalars['ID']>,
};


export type Mutation = {
  __typename?: 'Mutation',
  createProject: Project,
  updateProject?: Maybe<Project>,
  createTask: Task,
  updateTask?: Maybe<Task>,
  createSprint: Sprint,
  updateSprint?: Maybe<Sprint>,
  addToSprint?: Maybe<Sprint>,
  removeFromSprint?: Maybe<Sprint>,
};


export type MutationCreateProjectArgs = {
  input?: Maybe<CreateProjectInput>
};


export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput
};


export type MutationCreateTaskArgs = {
  input?: Maybe<CreateTaskInput>
};


export type MutationUpdateTaskArgs = {
  input: UpdateTaskInput
};


export type MutationCreateSprintArgs = {
  input?: Maybe<CreateSprintInput>
};


export type MutationUpdateSprintArgs = {
  input: UpdateSprintInput
};


export type MutationAddToSprintArgs = {
  input: AddToSprintInput
};


export type MutationRemoveFromSprintArgs = {
  input: RemoveFromSprintInput
};

export type Project = {
  __typename?: 'Project',
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  tasks: Array<Task>,
  taskCount: Scalars['Int'],
};


export type ProjectTasksArgs = {
  input?: Maybe<SearchTasksInput>
};


export type ProjectTaskCountArgs = {
  input?: Maybe<SearchTasksInput>
};

export type Query = {
  __typename?: 'Query',
  projects: Array<Project>,
  project?: Maybe<Project>,
  tasks: Array<Task>,
  taskCount: Scalars['Int'],
  task?: Maybe<Task>,
  sprints: Array<Sprint>,
  sprint?: Maybe<Sprint>,
};


export type QueryProjectArgs = {
  id: Scalars['ID']
};


export type QueryTasksArgs = {
  input?: Maybe<SearchTasksInput>
};


export type QueryTaskCountArgs = {
  input?: Maybe<SearchTasksInput>
};


export type QueryTaskArgs = {
  id: Scalars['ID']
};


export type QuerySprintArgs = {
  id: Scalars['ID']
};

export type RemoveFromSprintInput = {
  sprint: Scalars['ID'],
  task: Scalars['ID'],
};

export type SearchTasksInput = {
  status?: Maybe<Array<TaskState>>,
};

export type Sprint = {
  __typename?: 'Sprint',
  id: Scalars['ID'],
  startDate: Scalars['Date'],
  endDate: Scalars['Date'],
  tasks: Array<Task>,
  taskCount: Scalars['Int'],
};


export type SprintTasksArgs = {
  input?: Maybe<SearchTasksInput>
};


export type SprintTaskCountArgs = {
  input?: Maybe<SearchTasksInput>
};

export type Task = {
  __typename?: 'Task',
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  status: TaskState,
  project?: Maybe<Project>,
  sprints: Array<Sprint>,
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

export type UpdateSprintInput = {
  id: Scalars['ID'],
  startDate?: Maybe<Scalars['Date']>,
  endDate?: Maybe<Scalars['Date']>,
};

export type UpdateTaskInput = {
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  status?: Maybe<TaskState>,
  project?: Maybe<Scalars['ID']>,
};
export type CreateProjectMutationVariables = {
  input?: Maybe<CreateProjectInput>
};


export type CreateProjectMutation = (
  { __typename?: 'Mutation' }
  & { createProject: (
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name'>
  ) }
);

export type CreateTaskMutationVariables = {
  input?: Maybe<CreateTaskInput>
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

export type UpdateProjectMutationVariables = {
  input: UpdateProjectInput
};


export type UpdateProjectMutation = (
  { __typename?: 'Mutation' }
  & { updateProject: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name'>
  )> }
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
    & { backlogCount: Project['taskCount'], todoCount: Project['taskCount'], progressCount: Project['taskCount'], completeCount: Project['taskCount'] }
  )> }
);

export type SprintQueryVariables = {
  id: Scalars['ID']
};


export type SprintQuery = (
  { __typename?: 'Query' }
  & { sprint: Maybe<(
    { __typename?: 'Sprint' }
    & Pick<Sprint, 'id' | 'startDate' | 'endDate'>
    & { tasks: Array<(
      { __typename?: 'Task' }
      & Pick<Task, 'id' | 'name' | 'status'>
      & { project: Maybe<(
        { __typename?: 'Project' }
        & Pick<Project, 'id' | 'name'>
      )> }
    )> }
  )> }
);

export type SprintsQueryVariables = {};


export type SprintsQuery = (
  { __typename?: 'Query' }
  & { sprints: Array<(
    { __typename?: 'Sprint' }
    & Pick<Sprint, 'id' | 'startDate' | 'endDate'>
    & { backlogCount: Sprint['taskCount'], todoCount: Sprint['taskCount'], progressCount: Sprint['taskCount'], completeCount: Sprint['taskCount'] }
  )> }
);

export type TaskQueryVariables = {
  id: Scalars['ID']
};


export type TaskQuery = (
  { __typename?: 'Query' }
  & { task: Maybe<(
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'name' | 'status'>
    & { project: Maybe<(
      { __typename?: 'Project' }
      & Pick<Project, 'id' | 'name'>
    )> }
  )>, projects: Array<(
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

export const CreateProjectDocument = gql`
    mutation CreateProject($input: CreateProjectInput) {
  createProject(input: $input) {
    id
    name
  }
}
    `;
export type CreateProjectMutationFn = ApolloReactCommon.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

    export function useCreateProjectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
      return ApolloReactHooks.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, baseOptions);
    };
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = ApolloReactCommon.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const CreateTaskDocument = gql`
    mutation CreateTask($input: CreateTaskInput) {
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
export const UpdateProjectDocument = gql`
    mutation UpdateProject($input: UpdateProjectInput!) {
  updateProject(input: $input) {
    id
    name
  }
}
    `;
export type UpdateProjectMutationFn = ApolloReactCommon.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

    export function useUpdateProjectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
      return ApolloReactHooks.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, baseOptions);
    };
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = ApolloReactCommon.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
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
    backlogCount: taskCount(input: {status: backlog})
    todoCount: taskCount(input: {status: todo})
    progressCount: taskCount(input: {status: progress})
    completeCount: taskCount(input: {status: complete})
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
export const SprintDocument = gql`
    query Sprint($id: ID!) {
  sprint(id: $id) {
    id
    startDate
    endDate
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
}
    `;

    export function useSprintQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SprintQuery, SprintQueryVariables>) {
      return ApolloReactHooks.useQuery<SprintQuery, SprintQueryVariables>(SprintDocument, baseOptions);
    };
      export function useSprintLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SprintQuery, SprintQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<SprintQuery, SprintQueryVariables>(SprintDocument, baseOptions);
      };
      
export type SprintQueryHookResult = ReturnType<typeof useSprintQuery>;
export type SprintQueryResult = ApolloReactCommon.QueryResult<SprintQuery, SprintQueryVariables>;
export const SprintsDocument = gql`
    query Sprints {
  sprints {
    id
    startDate
    endDate
    backlogCount: taskCount(input: {status: backlog})
    todoCount: taskCount(input: {status: todo})
    progressCount: taskCount(input: {status: progress})
    completeCount: taskCount(input: {status: complete})
  }
}
    `;

    export function useSprintsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SprintsQuery, SprintsQueryVariables>) {
      return ApolloReactHooks.useQuery<SprintsQuery, SprintsQueryVariables>(SprintsDocument, baseOptions);
    };
      export function useSprintsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SprintsQuery, SprintsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<SprintsQuery, SprintsQueryVariables>(SprintsDocument, baseOptions);
      };
      
export type SprintsQueryHookResult = ReturnType<typeof useSprintsQuery>;
export type SprintsQueryResult = ApolloReactCommon.QueryResult<SprintsQuery, SprintsQueryVariables>;
export const TaskDocument = gql`
    query Task($id: ID!) {
  task(id: $id) {
    id
    name
    status
    project {
      id
      name
    }
  }
  projects {
    id
    name
  }
}
    `;

    export function useTaskQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TaskQuery, TaskQueryVariables>) {
      return ApolloReactHooks.useQuery<TaskQuery, TaskQueryVariables>(TaskDocument, baseOptions);
    };
      export function useTaskLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TaskQuery, TaskQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<TaskQuery, TaskQueryVariables>(TaskDocument, baseOptions);
      };
      
export type TaskQueryHookResult = ReturnType<typeof useTaskQuery>;
export type TaskQueryResult = ApolloReactCommon.QueryResult<TaskQuery, TaskQueryVariables>;
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