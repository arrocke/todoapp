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
    async tasks ({ projectId }, { input: { states } = {}}) {
      return await taskQueries.find({ projectId, states })
    },
    async taskCount ({ projectId }, { input: { states } = {}}) {
      return await taskQueries.count({ projectId, states })
    }
  }

  const projects = async () => {
    return await projectQueries.find()
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