const db = require('../db-connection')

const PROJECTS_QUERY = `
  SELECT name, project_id, created_at FROM project
  ORDER BY created_at
  LIMIT $1
  OFFSET $2;
`

const PROJECT_COUNT_QUERY = `
  SELECT COUNT(project_id) FROM project
`

module.exports = ({ Query, Mutation, ...types }) => {
  class Project {
    constructor(model) {
      this._model = model
    }

    get id () {
      return this._model.project_id
    }

    get name () {
      return this._model.name
    }
  }

  const projects = async (_, { input: { limit = 20, pageNumber = 0 } = {} }) => {
    const params = [
      Math.min(20, limit) + 1,
      (pageNumber) * limit,
    ]
    let { rows: projects } = await db.query(PROJECTS_QUERY, params)

    const { rows: [{ count: totalCount }] } = await db.query(PROJECT_COUNT_QUERY)

    const hasNext = projects.length > limit
    if (hasNext) {
      projects = projects.slice(0, -1)
    }

    const page = projects.map(p => new Project(p))

    return { hasNext, totalCount, page }
  }

  const createProject = (_, { input }) => {
    const project = {
      id: store.length,
      name: input.name
    }

    return {
      project
    }
  }

  return {
    ...types,
    Project,
    Query: {
      ...Query,
      projects
    },
    Mutation: {
      ...Mutation,
      createProject
    }
  }
}