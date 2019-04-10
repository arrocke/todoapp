const projectQueries = require('../queries/project')

module.exports = ({ Query, Mutation, ...types }) => {
  const Project = {
    id (model) {
      return model.project_id
    },
    name (model) {
      return model.name
    }
  }

  const projects = async (_, { input: { limit = 20, pageNumber = 0 } = {} }) => {
    let projects = await projectQueries.find({
      limit: Math.min(20, limit) + 1,
      offset: (pageNumber) * limit,
    })

    const totalCount = await projectQueries.count()

    const hasNext = projects.length > limit
    if (hasNext) {
      projects = projects.slice(0, -1)
    }

    return { hasNext, totalCount, page: projects }
  }

  const createProject = async (_, { input: { name } }) => {
    const project_id = projectQueries.insert({ name })
    return { project_id, name }
  }

  return {
    ...types,
    Project,
    Query: {
      ...Query,
      projects
    },
    Mutation: {
      ...Mutation,
      createProject
    }
  }
}