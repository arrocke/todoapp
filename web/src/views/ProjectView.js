import React, { useState, useEffect } from 'react'
import projectService from '../services/project'

const ProjectView = ({ match }) => {
  const { id } = match.params
  const [pageNumber, setPageNumber] = useState(0)
  const [{ name, tasks }, setProject] = useState({ tasks: { page: [], hasNext: false }})

  useEffect(() => {
    const effect = async () => {
      setProject(await projectService.getOne({ id, pageNumber }))
    }
    effect()
  }, [id])

  return <div>
    <h2>{name}</h2>
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