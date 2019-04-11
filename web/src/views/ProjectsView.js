import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import projectService from '../services/project'

const ProjectsView = () => {
  const [name, setName] = useState('')
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const effect = async () =>
      setProjects(await projectService.getAll())
    effect()
  }, [])

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
  </div>
}

export default ProjectsView