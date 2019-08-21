import { gql } from "apollo-server";

export default gql`
  type Project {
    projectId: ID!
    name: String
  }

  input CreateProjectInput {
    name: String
  }

  input UpdateProjectInput {
    projectId: ID!
    name: String
  }

  type Query {
    projects: [Project]
    project(id: ID!): Project
  }

  type Mutation {
    createProject(input: CreateProjectInput!): Project
    updateProject(input: UpdateProjectInput!): Project
  }
`;
