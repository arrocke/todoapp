const taskQueries = require('../queries/task')
const projectQueries = require('../queries/project')

module.exports = ({ Query, Mutation, ...types }) => {
  const Task = {
    id (model) {
      return model.taskId
    },
    name (model) {
      return model.name
    },
    async project (model) {
      if (model.projectId) {
        return await projectQueries.findOne(model.projectId)
      }
    }
  }

  const tasks = async (_, { input: { limit = 20, pageNumber = 0 } = {} }) => {
    let tasks = await taskQueries.find({
      limit: Math.min(20, limit) + 1,
      offset: (pageNumber) * limit,
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
    const taskId = await taskQueries.insert({
      name,
      completed,
      projectId
    })

    return { taskId, name, completed, projectId }
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
