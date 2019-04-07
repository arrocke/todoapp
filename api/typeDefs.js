const { gql } = require('apollo-server')
    
module.exports = gql`
  type Project {
    id: ID!
    name: String!
  }

  type ProjectsResult {
    page: [Project]
    totalCount: Int!
    hasNext: Boolean!
  }

  input ProjectsInput {
    limit: Int
    pageNumber: Int
  }

  input CreateProjectInput {
    name: String!
  }
  
  type Query {
    projects(input: ProjectsInput): ProjectsResult!
  }

  type Mutation {
    createProject(input: CreateProjectInput!): Project!
  }
`
