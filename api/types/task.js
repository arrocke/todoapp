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

  const tasks = async (_, { input: { states } = {} }) => {
    return await taskQueries.find({ states })
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

  const updateTask = async (_, { input: { name, state, id: taskId } }) => {
    return await taskQueries.update({ taskId, name, state })
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
      createTask,
      updateTask
    }
  }
}
