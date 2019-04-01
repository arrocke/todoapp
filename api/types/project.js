const store = [
  { id: 1, name: 'Project 1' },
  { id: 2, name: 'Project 2' }
]

module.exports = ({ Query, Mutation, ...types }) => {
  class Project {
    constructor(model) {
      this._model = model
    }

    get id () {
      return this._model.id
    }

    get name () {
      return this._model.name
    }
  }

  const projects = () => {
    return {
      projects: store.map(p => new Project(p)),
      count: store.length
    }
  }

  const createProject = (_, { input }) => {
    const project = {
      id: store.length,
      name: input.name
    }

    store.push(project)

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