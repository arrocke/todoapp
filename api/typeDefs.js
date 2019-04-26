const { gql } = require('apollo-server')
    
module.exports = gql`
  type Project {
    id: ID!
    name: String!
    tasks(input: TasksInput): [Task]
    taskCount: Int!
  }

  type Task {
    id: ID!
    name: String!
    project: Project
    state: String!
  }

  input TasksInput {
    states: [String]
  }

  input CreateProjectInput {
    name: String!
  }

  input CreateTaskInput {
    name: String!,
    projectId: ID
  }
  
  type Query {
    projects: [Project]
    project(id: ID!): Project
    tasks(input: TasksInput): [Task]
  }

  type Mutation {
    createProject(input: CreateProjectInput!): Project!
    createTask(input: CreateTaskInput!): Task!
  }
`
