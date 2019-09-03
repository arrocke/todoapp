import { Resolvers } from "./types";
import Project, { ProjectQuery, ProjectMutation } from "./project";
import Task, { TaskQuery, TaskMutation } from "./task";
import Sprint, { SprintQuery, SprintMutation } from "./sprint";

const resolvers: Resolvers = {
  Query: { ...ProjectQuery, ...TaskQuery, ...SprintQuery },
  Mutation: { ...ProjectMutation, ...TaskMutation, ...SprintMutation },
  Project,
  Task,
  Sprint
};

export default resolvers;
