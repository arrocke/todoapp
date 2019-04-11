import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import projectService from '../services/project'

const ProjectsView = () => {
  const [pageNumber, setPageNumber] = useState(0)
  const [{ page, hasNext }, setPage] = useState({ page: [], hasNext: false })
  const [name, setName] = useState('')

  useEffect(() => {
    const effect = async () => {
      setPage(await projectService.getPage(pageNumber))
    }
    effect()
  }, [pageNumber])

  const createProject = async () => {
    await projectService.create({ name })
    setPage(await projectService.getPage(pageNumber))
  }

  const renderProject = ({ id, name }) =>
    <li key={id}>
      <Link to={`/projects/${id}`}>{name}</Link>
    </li>

  return <div>
    <input
      type="text"
      onInput={e => setName(e.target.value)}
    />
    <button
      className="btn ml-2"
      onClick={createProject}
    >Add</button>
    <ul>
      {page.map(renderProject)}
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
        disabled={!hasNext}
        type="button"
        onClick={() => setPageNumber(pageNumber + 1)}
      >Next Page</button>
    </p>
  </div>
}

export default ProjectsView