import gql from "graphql-tag";
import client from '../client'

const getAll = async () => {
  const query = gql`
    query Tasks {
      tasks {
        name
        id
      }
    }`
  const { data: { tasks }}  = await client.query({ query, fetchPolicy: 'no-cache' })

  return tasks
}

const create = async ({ name, projectId }) => {
  const mutation = gql`
    mutation CreateTask($input: CreateTaskInput!) {
      createTask(input: $input) {
        id
      }
    }
  `
  const variables = {
    input: { name, projectId }
  }
  const { data: { createTask: { id } }} = await client.mutate({ mutation, variables })

  return { id, name }
}

export default {
  getAll,
  create
}