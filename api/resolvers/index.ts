import { Resolvers } from "generated/resolver-types";
import Project, { ProjectQuery, ProjectMutation } from "./project";

const resolvers: Resolvers = {
  Query: { ...ProjectQuery },
  Mutation: { ...ProjectMutation },
  Project
};

export default resolvers;
