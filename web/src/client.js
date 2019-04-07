import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL,
}, {
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache'
    }
  }
});

export default client
