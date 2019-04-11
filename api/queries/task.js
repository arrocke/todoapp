const db = require('../db-connection')

const find = async ({ limit, offset, projectId }) => {
  const params = []
  let query = `
    SELECT name, task_id AS "taskId", project_id AS "projectId", created_at AS "createdAt" FROM task
  `

  // Limit to tasks in a specific project.
  if (typeof projectId !== 'undefined') {
    params.push(projectId)
    query += `WHERE project_id = $${params.length}`
  }

  // Limit to a single page.
  params.push(limit, offset)
  query += `
    ORDER BY created_at
    LIMIT $${params.length - 1}
    OFFSET $${params.length}
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

const insert = async ({ name, completed, projectId }) => {
  const params = [name, completed, projectId]
  const query = `
    INSERT INTO task (name, completed, project_id) VALUES ($1, $2, $3) RETURNING task_id AS "taskId"
  `

  const { rows: [{ taskId }]} = await db.query(query, params)
  return taskId
}

module.exports = {
  find,
  count,
  insert
}