import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const apollo = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL,
}, {
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache'
    }
  }
});

const client = {
  query ({ query, ...options }) {
    return apollo.query({
      ...options,
      query: gql`${query}`
    })
  },
  mutate ({ mutation, ...options }) {
    return apollo.mutate({
      ...options,
      mutation: gql`${mutation}`
    })
  }
}

export default client
