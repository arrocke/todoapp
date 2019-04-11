const db = require('../db-connection')

const find = async ({ limit, offset }) => {
  const params = [limit, offset]
  const query = `
    SELECT name, project_id, created_at FROM project
    ORDER BY created_at
    LIMIT $1
    OFFSET $2
  `

  const { rows } = await db.query(query, params)
  return rows
}

const findOne = async (id) => {
  const params = [id]
  const query = `
    SELECT name, project_id, created_at FROM project
    WHERE project_id = $1
  `

  const { rows: [project] } = await db.query(query, params)
  return project
}

const count = async () => {
  const query = `
    SELECT COUNT(project_id) FROM project
  `

  const { rows: [{ count }] } = await db.query(query)
  return count
}

const insert = async ({ name }) => {
  const params = [name]
  const query = `
    INSERT INTO project (name) VALUES ($1) RETURNING project_id
  `

  const { rows: [{ project_id }]} = await db.query(query, params)
  return project_id
}

module.exports = {
  find,
  findOne,
  count,
  insert
}