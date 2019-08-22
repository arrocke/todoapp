import { GraphQLServer } from 'graphql-yoga'
import fs from 'fs'
import path from 'path'
import resolvers from './resolvers'

const typeDefs = fs.readFileSync(path.resolve(__dirname, 'schema.graphql'), 'utf8')

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => console.log('Server is running on http://localhost:4000'))