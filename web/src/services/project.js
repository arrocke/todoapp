import gql from "graphql-tag";
import client from '../client'

const getAll = async () => {
  const query = gql`
    query Projects {
      projects {
        name
        id
      }
    }`
  const { data: { projects }}  = await client.query({ query, fetchPolicy: 'no-cache' })

  return projects
}

const getOne = async ({ id, pageNumber }) => {
  const query = gql`
    query Project($id: ID!) {
      project(id: $id) {
        id
        name
        tasks {
          name
          id
        }
      }
    }
  `
  const variables = { id }
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
  const { data: { createProject: { id } }} = await client.mutate({ mutation, variables })

  return { id, name }
}

export default {
  getAll,
  getOne,
  create
}