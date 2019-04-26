import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL,
}, {
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache'
    }
  }
});

// Rewrite query and mutate to auto compile graphql query strings.
const queryRef = client.query.bind(client)
const mutateRef = client.mutate.bind(client)

client.query = ({ query, ...options }) => queryRef({
  ...options,
  query: gql`${query}`
})

client.mutate = ({ mutation, ...options }) => mutateRef({
  ...options,
  mutation: gql`${mutation}`
})

export default client
