import { Resolver, Query, Mutation } from "./resolver-types";
import { GraphQLFieldResolver, GraphQLType } from "graphql";
import { Context } from "./context";
import { GraphQLObjectResolver } from "@apollographql/apollo-tools";

type ProjectRecord = {
  id: string;
  name?: string;
};

type Project = {
  projectId: string;
  name?: string;
};

type CreateProjectInput = {
  name?: string;
};

type UpdateProjectInput = {
  projectId: string;
  name?: string;
};

type ProjectQueries = {
  project: Query<Project | undefined, { id: string }>;
  projects: Query<Project[], {}>;
};

type ProjectMutations = {
  createProject: Mutation<Project, { input: CreateProjectInput }>;
  updateProject: Mutation<Project | undefined, { input: UpdateProjectInput }>;
};

export const Project: {
  projectId: GraphQLFieldResolver<ProjectRecord, Context>;
  name: GraphQLFieldResolver<ProjectRecord, Context>;
} = {
  projectId(task) {
    return task.id;
  },
  name(task) {
    return task.name;
  }
};

export const queries: GraphQLObjectResolver = {
  project(_, { id }) {
    return {
      projectId: id,
      name: "Project"
    };
  },
  projects() {
    return [
      {
        projectId: "1",
        name: "Project 1"
      },
      {
        projectId: "2",
        name: "Project 2"
      }
    ];
  }
};

export const mutations: ProjectMutations = {
  createProject(_, { input }) {
    return {
      ...input,
      projectId: "3"
    };
  },
  updateProject(_, { input }) {
    return input;
  }
};
