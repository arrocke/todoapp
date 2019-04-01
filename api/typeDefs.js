const { gql } = require('apollo-server')
    
module.exports = gql`
  type Project {
    id: ID!
    name: String!
  }

  type ProjectsResult {
    projects: [Project]
    count: Int!
  }

  input CreateProjectInput {
    name: String!
  }

  type CreateProjectResult {
    project: Project!
  }
  
  type Query {
    projects: ProjectsResult!
  }

  type Mutation {
    createProject(input: CreateProjectInput!): CreateProjectResult!
  }
`
