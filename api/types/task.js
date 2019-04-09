const db = require('../db-connection')

const TASKS_QUERY = `
  SELECT name, task_id, project_id, created_at FROM task
  ORDER BY created_at
  LIMIT $1
  OFFSET $2;
`

const TASK_COUNT_QUERY = `
  SELECT COUNT(task_id) FROM task
`

const CREATE_TASK_QUERY = `
  INSERT INTO task (name, completed) VALUES ($1, $2) RETURNING task_id
`

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
    const params = [
      Math.min(20, limit) + 1,
      (pageNumber) * limit,
    ]
    let { rows: tasks } = await db.query(TASKS_QUERY, params)

    const { rows: [{ count: totalCount }] } = await db.query(TASK_COUNT_QUERY)

    const hasNext = tasks.length > limit
    if (hasNext) {
      tasks = tasks.slice(0, -1)
    }

    const page = tasks

    return { hasNext, totalCount, page }
  }

  const createTask = async (_, { input: { name } }) => {
    const completed = false
    const params = [
      name,
      completed
    ]
    const { rows: [{ task_id }]} = await db.query(CREATE_TASK_QUERY, params)

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
