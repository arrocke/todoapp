import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import projectService from '../services/project'
import CardList from '../components/CardList'

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
    <Link to={`/projects/${id}`} className="text-black no-underline">{name}</Link>

  return <div>
    <input
      type="text"
      onInput={e => setName(e.target.value)}
    />
    <button
      className="btn ml-2"
      onClick={createProject}
    >Add</button>
    <CardList
      list={projects}
      renderCard={renderProject}
      selectKey={p => p.id}
    />
  </div>
}

export default ProjectsView