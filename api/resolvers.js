const typeList = ['project']

// Construct resolvers from type files.
module.exports = typeList.reduce(
  (config, typeName) => require(`./types/${typeName}`)(config),
  {
    Query: {},
    Mutation: {}
  }
)
