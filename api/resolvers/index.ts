import { Resolvers } from "./types";
import Project, { ProjectQuery, ProjectMutation } from "./project";
import Task, { TaskQuery, TaskMutation } from "./task";

const resolvers: Resolvers = {
  Query: { ...ProjectQuery, ...TaskQuery },
  Mutation: { ...ProjectMutation, ...TaskMutation },
  Project,
  Task
};

export default resolvers;
