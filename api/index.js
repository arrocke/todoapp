if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
require('./db-connection')
    
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen()
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
  })
