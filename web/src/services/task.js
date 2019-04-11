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

export default {
  getAll
}