import gql from "graphql-tag";
import client from '../client'

const LIMIT = 5

const getPage = async (pageNumber) => {
  const query = gql`
    query Projects($input: ProjectsInput) {
      projects(input: $input) {
        page {
          name
          id
        }
        hasNext
      }
    }`
  const variables = {
    input: {
      pageNumber,
      limit: LIMIT
    }
  }
  const { data: { projects }}  = await client.query({ query, variables, fetchPolicy: 'no-cache' })

  return projects
}

const getOne = async ({ id, pageNumber }) => {
  const query = gql`
    query Project($id: ID!, $tasksInput: TasksInput) {
      project(id: $id) {
        id
        name
        tasks(input: $tasksInput) {
          page {
            name
            id
          }
          hasNext
        }
      }
    }
  `
  const variables = {
    id,
    tasksInput: {
      pageNumber,
      limit: LIMIT
    }
  }
  const { data: { project }} = await client.query({ query, variables, fetchPolicy: 'no-cache' })
  return project
}

const create = async ({ name }) => {
  const mutation = gql`
    mutation CreateProject($input: CreateProjectInput!) {
      createProject(input: $input) {
        id
      }
    }
  `
  const variables = {
    input: { name }
  }
  const { data: { id }} = await client.mutate({ mutation, variables })

  return { id, name }
}

export default {
  getPage,
  getOne,
  create
}