const taskQueries = require('../queries/task')
const projectQueries = require('../queries/project')

const DEFAULT_PAGE_SIZE = 20
const DEFAULT_PAGE_NUMBER = 0

module.exports = ({ Query, Mutation, ...types }) => {
  const Task = {
    id (model) {
      return model.taskId
    },
    name (model) {
      return model.name
    },
    state (model) {
      return model.state
    },
    async project (model) {
      if (model.projectId) {
        return await projectQueries.findOne(model.projectId)
      }
    }
  }

  const tasks = async (_, { input: { limit = DEFAULT_PAGE_SIZE, pageNumber = DEFAULT_PAGE_SIZE, states } = {} }) => {
    let tasks = await taskQueries.find({
      limit: limit + 1,
      offset: (pageNumber) * limit,
      states
    })

    const totalCount = taskQueries.count()

    const hasNext = tasks.length > limit
    if (hasNext) {
      tasks = tasks.slice(0, -1)
    }

    const page = tasks

    return { hasNext, totalCount, page }
  }

  const createTask = async (_, { input: { name, projectId } }) => {
    const completed = false
    const { taskId, state } = await taskQueries.insert({
      name,
      completed,
      projectId
    })

    return { taskId, state, name, completed, projectId }
  }

  return {
    ...types,
    Task,
    Query: {
      ...Query,
      tasks
    },
    Mutation: {
      ...Mutation,
      createTask
    }
  }
}
