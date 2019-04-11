const projectQueries = require('../queries/project')
const taskQueries = require('../queries/task')

module.exports = ({ Query, Mutation, ...types }) => {
  const Project = {
    id (model) {
      return model.project_id
    },
    name (model) {
      return model.name
    },
    async tasks (model, { input: { limit = 20, pageNumber = 0 } = {}}) {
      let tasks = await taskQueries.find({
        limit: Math.min(20, limit) + 1,
        offset: (pageNumber) * limit,
        project_id: model.project_id
      })

      const totalCount = taskQueries.count({ project_id: model.project_id })

      const hasNext = tasks.length > limit
      if (hasNext) {
        tasks = tasks.slice(0, -1)
      }

      const page = tasks

      return { hasNext, totalCount, page }
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

  const project = async (_, { id }) => {
    return await projectQueries.findOne(id)
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
      projects,
      project
    },
    Mutation: {
      ...Mutation,
      createProject
    }
  }
}