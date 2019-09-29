import { Resolvers } from "./types";
import Project, { ProjectQuery, ProjectMutation } from "./project";
import Task, { TaskQuery, TaskMutation } from "./task";
import Sprint, { SprintQuery, SprintMutation } from "./sprint";
import User, { UserQuery, UserMutation } from "./user";

const resolvers: Resolvers = {
  Query: { ...UserQuery, ...ProjectQuery, ...TaskQuery, ...SprintQuery },
  Mutation: {
    ...UserMutation,
    ...ProjectMutation,
    ...TaskMutation,
    ...SprintMutation
  },
  User,
  Project,
  Task,
  Sprint
};

export default resolvers;
