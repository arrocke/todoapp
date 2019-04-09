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

  input CreateTaskInput {
    name: String!
  }

  type Task {
    id: ID!
    name: String!
    project: Project
    completed: Boolean!
  }

  type TasksResult {
    page: [Task]
    totalCount: Int!
    hasNext: Boolean!
  }

  input TasksInput {
    limit: Int
    pageNumber: Int
  }
  
  type Query {
    projects(input: ProjectsInput): ProjectsResult!
    tasks(input: TasksInput): TasksResult!
  }

  type Mutation {
    createProject(input: CreateProjectInput!): Project!
    createTask(input: CreateTaskInput!): Task!
  }
`
