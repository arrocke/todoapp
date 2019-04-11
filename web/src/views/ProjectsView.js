import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import projectService from '../services/project'
import useLazyList from '../hooks/lazyList'

const fetchPage = (pageNumber) =>
  projectService.getPage(pageNumber)

const ProjectsView = () => {
  const [name, setName] = useState('')
  const [projects, setProjects, loadingProjects] = useLazyList({ fetchPage })

  const createProject = async () => {
    const project = await projectService.create({ name })
    setProjects([...projects, project])
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
      {projects.map(renderProject)}
    </ul>
    {loadingProjects ? <span>Loading</span> : null}
  </div>
}

export default ProjectsView