import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

console.log(process.env)
const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL
});

export default client

client.query({
  query: gql`{
    hello
  }`
})
.then(result => console.log(result));