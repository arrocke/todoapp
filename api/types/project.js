const projectQueries = require('../queries/project')
const taskQueries = require('../queries/task')

const DEFAULT_PAGE_SIZE = 20
const DEFAULT_PAGE_NUMBER = 0

module.exports = ({ Query, Mutation, ...types }) => {
  const Project = {
    id (model) {
      return model.projectId
    },
    name (model) {
      return model.name
    },
    async tasks (model, { input: { limit = DEFAULT_PAGE_SIZE, pageNumber = DEFAULT_PAGE_NUMBER, states } = {}}) {
      let tasks = await taskQueries.find({
        limit: limit + 1,
        offset: (pageNumber) * limit,
        projectId: model.projectId,
        states
      })

      const totalCount = taskQueries.count({ projectId: model.projectId })

      const hasNext = tasks.length > limit
      if (hasNext) {
        tasks = tasks.slice(0, -1)
      }

      const page = tasks

      return { hasNext, totalCount, page }
    }
  }

  const projects = async (_, { input: { limit = DEFAULT_PAGE_SIZE, pageNumber = DEFAULT_PAGE_NUMBER } = {} }) => {
    let projects = await projectQueries.find({
      limit: limit + 1,
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
    const projectId = projectQueries.insert({ name })
    return { projectId, name }
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