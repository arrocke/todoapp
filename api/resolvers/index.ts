import { Resolvers } from "./types";
import Space, { SpaceQuery, SpaceMutation } from "./space";
import Project, { ProjectQuery, ProjectMutation } from "./project";
import Task, { TaskQuery, TaskMutation } from "./task";
import Sprint, { SprintQuery, SprintMutation } from "./sprint";
import User, { UserQuery, UserMutation } from "./user";

const resolvers: Resolvers = {
  Query: {
    ...UserQuery,
    ...SpaceQuery,
    ...ProjectQuery,
    ...TaskQuery,
    ...SprintQuery
  },
  Mutation: {
    ...UserMutation,
    ...SpaceMutation,
    ...ProjectMutation,
    ...TaskMutation,
    ...SprintMutation
  },
  User,
  Space,
  Project,
  Task,
  Sprint
};

export default resolvers;
