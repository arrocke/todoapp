import React, { useState, useEffect } from 'react'
import projectService from '../services/project'
import taskService from '../services/task'

const ProjectView = ({ match }) => {
  const { id } = match.params
  const [pageNumber, setPageNumber] = useState(0)
  const [{ name, tasks }, setProject] = useState({ tasks: { page: [], hasNext: false }})
  const [taskName, setTaskName] = useState('')

  useEffect(() => {
    const effect = async () => {
      setProject(await projectService.getOne({ id, pageNumber }))
    }
    effect()
  }, [id])

  const createTask = async () => {
    await taskService.create({ name: taskName, projectId: id })
    setProject(await projectService.getOne({ id, pageNumber }))
  }

  return <div>
    <h2>{name}</h2>
    <input
      type="text"
      onInput={e => setTaskName(e.target.value)}
    />
    <button
      className="btn ml-2"
      onClick={createTask}
    >Add</button>
    <ul>
      {tasks.page.map(p => <li key={p.id}>{p.name}</li>)}
    </ul>
    <p className="mt-4">
      <button
        className="btn"
        disabled={pageNumber === 0}
        type="button"
        onClick={() => setPageNumber(pageNumber - 1)}
      >Previous Page</button>
      <span className="mx-2">{pageNumber + 1}</span>
      <button
        className="btn"
        disabled={!tasks.hasNext}
        type="button"
        onClick={() => setPageNumber(pageNumber + 1)}
      >Next Page</button>
    </p>
  </div>
}

export default ProjectView