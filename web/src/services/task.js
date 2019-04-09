import gql from "graphql-tag";
import client from '../client'

const LIMIT = 5

const getPage = async (pageNumber) => {
  const query = gql`
    query Tasks($input: TasksInput) {
      tasks(input: $input) {
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
  const { data: { tasks: { page, hasNext }}}  = await client.query({ query, variables, fetchPolicy: 'no-cache' })

  return { tasks: page, hasNext}
}

const create = async ({ name }) => {
  const mutation = gql`
    mutation CreateTask($input: CreateTaskInput!) {
      createTask(input: $input) {
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
  create
}