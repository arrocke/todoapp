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
    <Link to={`/projects/${id}`} className="p-3 text-black no-underline block">{name}</Link>

  return <div className="w-full max-w-md h-full m-auto px-4 pt-4 flex flex-col">
    <div className="mb-4 flex">
      <button
        className="btn mr-2"
        onClick={createProject}
      >Add</button>
      <input
        className="text-input flex-grow"
        type="text"
        onInput={e => setName(e.target.value)}
        placeholder="Project name..."
      />
    </div>
    <CardList
      className="overflow-scroll"
      list={projects}
      renderCard={renderProject}
      selectKey={p => p.id}
    />
  </div>
}

export default ProjectsView