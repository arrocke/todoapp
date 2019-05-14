const db = require('../db-connection')

const find = async ({ projectId, states }) => {
  const params = []
  const conditions = []
  let query = `
    SELECT name, task_id AS "taskId", project_id AS "projectId", state, created_at AS "createdAt" FROM task
  `

  // Limit to tasks in a specific project.
  if (typeof projectId !== 'undefined') {
    params.push(projectId)
    conditions.push(`project_id = $${params.length}`)
  }

  // Limit to tasks with specified state.
  if (states) {
    conditions.push(`state IN (${states.map((_, i) => '$' + (i + params.length + 1)).join(',')})`)
    params.push(...states)
  }

  // Build WHERE query.
  if (conditions.length > 0) {
    query += `WHERE ${conditions.join(' AND ')}`
  }

  // Sort tasks.
  query += `
    ORDER BY created_at
  `

  const { rows } = await db.query(query, params)
  return rows
}

const count = async ({ projectId, states }) => {
  const params = []
  const conditions = []
  let query = `
    SELECT COUNT(project_id) FROM task
  `

  // Limit to tasks in a specific project.
  if (typeof projectId !== 'undefined') {
    params.push(projectId)
    conditions.push(`project_id = $${params.length}`)
  }

  // Limit to tasks with specified state.
  if (states) {
    conditions.push(`state IN (${states.map((_, i) => '$' + (i + params.length + 1)).join(',')})`)
    params.push(...states)
  }

  // Build WHERE query.
  if (conditions.length > 0) {
    query += `WHERE ${conditions.join(' AND ')}`
  }

  const { rows: [{ count }] } = await db.query(query, params)
  return count
}

const insert = async ({ name, projectId, state }) => {
  const params = [name, projectId, state]
  const query = `
    INSERT INTO task (name, project_id, state) VALUES ($1, $2, $3) RETURNING task_id AS "taskId"
  `

  const { rows: [{ taskId }]} = await db.query(query, params)
  return { taskId }
}

const update = async ({ taskId, name, state }) => {
  const params = []
  const set = []
  const setParams = []
  let query = 'UPDATE task'

  // Update the task name.
  if (name) {
    setParams.push(name)
    set.push(`name = $${setParams.length}`)
  }

  // Update the task state.
  if (state) {
    setParams.push(state)
    set.push(`state = $${setParams.length}`)
  }

  // If there are changes to the task,
  // Compile the query and run it.
  if (set.length > 0) {
    params.push(...setParams)
    params.push(taskId)
    query += `
      SET ${set.join(', ')}
      WHERE task_id = $${params.length}
    `
    await db.query(query, params)
  }

  // Fetch the updated task.
  const { rows: [updatedTask] } = await db.query(
    `SELECT * FROM task WHERE task_id = $1`,
    [taskId]
  )
  return updatedTask
}

module.exports = {
  find,
  count,
  insert,
  update
}