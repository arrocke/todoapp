const db = require('../db-connection')

const find = async ({ limit, offset, project_id }) => {
  const params = []
  let query = `
    SELECT name, task_id, project_id, created_at FROM task
  `

  // Limit to tasks in a specific project.
  if (typeof project_id !== 'undefined') {
    params.push(project_id)
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

const count = async ({ project_id }) => {
  const params = []
  let query = `
    SELECT COUNT(project_id) FROM task
  `

  // Limit to tasks in a specific project.
  if (typeof project_id !== 'undefined') {
    params.push(project_id)
    query += `WHERE project_id = $${params.length}`
  }

  const { rows: [{ count }] } = await db.query(query, params)
  return count
}

const insert = async ({ name, completed, projectId }) => {
  const params = [name, completed, projectId]
  const query = `
    INSERT INTO task (name, completed, project_id) VALUES ($1, $2, $3) RETURNING task_id
  `

  const { rows: [{ task_id }]} = await db.query(query, params)
  return task_id
}

module.exports = {
  find,
  count,
  insert
}