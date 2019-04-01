const http = require('http')
const hostname = 'localhost'
const port = 3000

const graphql = require('./graphql')

const server = http.createServer(graphql)

server.listen(port, hostname, () => {
  console.log(`listening on ${hostname}:${port}`)
})