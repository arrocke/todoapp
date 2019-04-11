const db = require('../db-connection')

const find = async ({ projectId, states }) => {
  let params = []
  let query = `
    SELECT name, task_id AS "taskId", project_id AS "projectId", state, created_at AS "createdAt" FROM task
  `
  let conditions = []

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

const count = async ({ projectId }) => {
  const params = []
  let query = `
    SELECT COUNT(project_id) FROM task
  `

  // Limit to tasks in a specific project.
  if (typeof project_id !== 'undefined') {
    params.push(projectId)
    query += `WHERE project_id = $${params.length}`
  }

  const { rows: [{ count }] } = await db.query(query, params)
  return count
}

const insert = async ({ name, projectId }) => {
  const params = [name, projectId]
  const query = `
    INSERT INTO task (name, project_id) VALUES ($1, $2) RETURNING task_id AS "taskId", state
  `

  const { rows: [{ taskId, state }]} = await db.query(query, params)
  return { taskId, state }
}

module.exports = {
  find,
  count,
  insert
}