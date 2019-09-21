import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from "graphql";
import { ProjectDocument } from "../models/project";
import { TaskDocument } from "../models/task";
import { SprintDocument } from "../models/sprint";
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
};

export type AddToSprintInput = {
  sprint: Scalars["ID"];
  task: Scalars["ID"];
};

export type CreateProjectInput = {
  name?: Maybe<Scalars["String"]>;
};

export type CreateSprintInput = {
  startDate: Scalars["Date"];
  endDate: Scalars["Date"];
};

export type CreateTaskInput = {
  name?: Maybe<Scalars["String"]>;
  status: TaskState;
  project?: Maybe<Scalars["ID"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  createProject: Project;
  updateProject?: Maybe<Project>;
  createTask: Task;
  updateTask?: Maybe<Task>;
  createSprint: Sprint;
  updateSprint?: Maybe<Sprint>;
  addToSprint?: Maybe<Sprint>;
  removeFromSprint?: Maybe<Sprint>;
};

export type MutationCreateProjectArgs = {
  input?: Maybe<CreateProjectInput>;
};

export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
};

export type MutationCreateTaskArgs = {
  input?: Maybe<CreateTaskInput>;
};

export type MutationUpdateTaskArgs = {
  input: UpdateTaskInput;
};

export type MutationCreateSprintArgs = {
  input?: Maybe<CreateSprintInput>;
};

export type MutationUpdateSprintArgs = {
  input: UpdateSprintInput;
};

export type MutationAddToSprintArgs = {
  input: AddToSprintInput;
};

export type MutationRemoveFromSprintArgs = {
  input: RemoveFromSprintInput;
};

export type Project = {
  __typename?: "Project";
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  tasks: Array<Task>;
  taskCount: Scalars["Int"];
};

export type ProjectTasksArgs = {
  input?: Maybe<SearchTasksInput>;
};

export type ProjectTaskCountArgs = {
  input?: Maybe<SearchTasksInput>;
};

export type Query = {
  __typename?: "Query";
  projects: Array<Project>;
  project?: Maybe<Project>;
  tasks: Array<Task>;
  taskCount: Scalars["Int"];
  task?: Maybe<Task>;
  sprints: Array<Sprint>;
  sprint?: Maybe<Sprint>;
};

export type QueryProjectArgs = {
  id: Scalars["ID"];
};

export type QueryTasksArgs = {
  input?: Maybe<SearchTasksInput>;
};

export type QueryTaskCountArgs = {
  input?: Maybe<SearchTasksInput>;
};

export type QueryTaskArgs = {
  id: Scalars["ID"];
};

export type QuerySprintArgs = {
  id: Scalars["ID"];
};

export type RemoveFromSprintInput = {
  sprint: Scalars["ID"];
  task: Scalars["ID"];
};

export type SearchTasksInput = {
  status?: Maybe<Array<TaskState>>;
};

export type Sprint = {
  __typename?: "Sprint";
  id: Scalars["ID"];
  startDate: Scalars["Date"];
  endDate: Scalars["Date"];
  tasks: Array<Task>;
  taskCount: Scalars["Int"];
};

export type SprintTasksArgs = {
  input?: Maybe<SearchTasksInput>;
};

export type SprintTaskCountArgs = {
  input?: Maybe<SearchTasksInput>;
};

export type Task = {
  __typename?: "Task";
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  status: TaskState;
  project?: Maybe<Project>;
  sprints: Array<Sprint>;
};

export enum TaskState {
  Backlog = "backlog",
  Todo = "todo",
  Progress = "progress",
  Complete = "complete"
}

export type UpdateProjectInput = {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
};

export type UpdateSprintInput = {
  id: Scalars["ID"];
  startDate?: Maybe<Scalars["Date"]>;
  endDate?: Maybe<Scalars["Date"]>;
};

export type UpdateTaskInput = {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  status: TaskState;
  project?: Maybe<Scalars["ID"]>;
};
export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  Project: ResolverTypeWrapper<ProjectDocument>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  SearchTasksInput: SearchTasksInput;
  TaskState: TaskState;
  Task: ResolverTypeWrapper<TaskDocument>;
  Sprint: ResolverTypeWrapper<SprintDocument>;
  Date: ResolverTypeWrapper<Scalars["Date"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Mutation: ResolverTypeWrapper<{}>;
  CreateProjectInput: CreateProjectInput;
  UpdateProjectInput: UpdateProjectInput;
  CreateTaskInput: CreateTaskInput;
  UpdateTaskInput: UpdateTaskInput;
  CreateSprintInput: CreateSprintInput;
  UpdateSprintInput: UpdateSprintInput;
  AddToSprintInput: AddToSprintInput;
  RemoveFromSprintInput: RemoveFromSprintInput;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  Project: ProjectDocument;
  ID: Scalars["ID"];
  String: Scalars["String"];
  SearchTasksInput: SearchTasksInput;
  TaskState: TaskState;
  Task: TaskDocument;
  Sprint: SprintDocument;
  Date: Scalars["Date"];
  Int: Scalars["Int"];
  Mutation: {};
  CreateProjectInput: CreateProjectInput;
  UpdateProjectInput: UpdateProjectInput;
  CreateTaskInput: CreateTaskInput;
  UpdateTaskInput: UpdateTaskInput;
  CreateSprintInput: CreateSprintInput;
  UpdateSprintInput: UpdateSprintInput;
  AddToSprintInput: AddToSprintInput;
  RemoveFromSprintInput: RemoveFromSprintInput;
  Boolean: Scalars["Boolean"];
}>;

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = ResolversObject<{
  createProject?: Resolver<
    ResolversTypes["Project"],
    ParentType,
    ContextType,
    MutationCreateProjectArgs
  >;
  updateProject?: Resolver<
    Maybe<ResolversTypes["Project"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateProjectArgs, "input">
  >;
  createTask?: Resolver<
    ResolversTypes["Task"],
    ParentType,
    ContextType,
    MutationCreateTaskArgs
  >;
  updateTask?: Resolver<
    Maybe<ResolversTypes["Task"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTaskArgs, "input">
  >;
  createSprint?: Resolver<
    ResolversTypes["Sprint"],
    ParentType,
    ContextType,
    MutationCreateSprintArgs
  >;
  updateSprint?: Resolver<
    Maybe<ResolversTypes["Sprint"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSprintArgs, "input">
  >;
  addToSprint?: Resolver<
    Maybe<ResolversTypes["Sprint"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddToSprintArgs, "input">
  >;
  removeFromSprint?: Resolver<
    Maybe<ResolversTypes["Sprint"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveFromSprintArgs, "input">
  >;
}>;

export type ProjectResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Project"] = ResolversParentTypes["Project"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  tasks?: Resolver<
    Array<ResolversTypes["Task"]>,
    ParentType,
    ContextType,
    ProjectTasksArgs
  >;
  taskCount?: Resolver<
    ResolversTypes["Int"],
    ParentType,
    ContextType,
    ProjectTaskCountArgs
  >;
}>;

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = ResolversObject<{
  projects?: Resolver<
    Array<ResolversTypes["Project"]>,
    ParentType,
    ContextType
  >;
  project?: Resolver<
    Maybe<ResolversTypes["Project"]>,
    ParentType,
    ContextType,
    RequireFields<QueryProjectArgs, "id">
  >;
  tasks?: Resolver<
    Array<ResolversTypes["Task"]>,
    ParentType,
    ContextType,
    QueryTasksArgs
  >;
  taskCount?: Resolver<
    ResolversTypes["Int"],
    ParentType,
    ContextType,
    QueryTaskCountArgs
  >;
  task?: Resolver<
    Maybe<ResolversTypes["Task"]>,
    ParentType,
    ContextType,
    RequireFields<QueryTaskArgs, "id">
  >;
  sprints?: Resolver<Array<ResolversTypes["Sprint"]>, ParentType, ContextType>;
  sprint?: Resolver<
    Maybe<ResolversTypes["Sprint"]>,
    ParentType,
    ContextType,
    RequireFields<QuerySprintArgs, "id">
  >;
}>;

export type SprintResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Sprint"] = ResolversParentTypes["Sprint"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  endDate?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  tasks?: Resolver<
    Array<ResolversTypes["Task"]>,
    ParentType,
    ContextType,
    SprintTasksArgs
  >;
  taskCount?: Resolver<
    ResolversTypes["Int"],
    ParentType,
    ContextType,
    SprintTaskCountArgs
  >;
}>;

export type TaskResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Task"] = ResolversParentTypes["Task"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes["TaskState"], ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes["Project"]>, ParentType, ContextType>;
  sprints?: Resolver<Array<ResolversTypes["Sprint"]>, ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Date?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Sprint?: SprintResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
