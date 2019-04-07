import { useEffect, useState } from 'react'
import client from '../client'
import gql from "graphql-tag";

const useGraphQL = ({ query, mutation, variables }) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    client.query({
      query: query ? gql`${query}` : null,
      mutation: mutation ? gql`${mutation}`: null,
      variables
    }).then(response => {
      setResponse(response.data)
      setError(null)
    }).catch(e => {
      setResponse(null)
      setError(e)
    })
  }, [query, variables])

  return [ response, error ]
}

export default useGraphQL