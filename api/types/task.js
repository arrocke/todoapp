const taskQueries = require('../queries/task')

module.exports = ({ Query, Mutation, ...types }) => {
  const Task = {
    id (model) {
      return model.task_id
    },
    name (model) {
      return model.name
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

  const createTask = async (_, { input: { name } }) => {
    const completed = false
    const task_id = await taskQueries.insert({
      name,
      completed
    })

    return { task_id, name, completed }
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
