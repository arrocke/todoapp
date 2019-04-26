import React, { useState, useEffect } from 'react'
import client from '../client'
import CardList from '../components/CardList'
import ProjectCard from '../components/ProjectCard'

const fetch = async () => {
  const { data: { projects }} = await client.query({
    query: `
      query Projects {
        projects {
          name
          id
          taskCount
        }
      }`
  })
  return projects
}

const create = async ({ name }) => {
  const { data: { createTask: { id }}} = await client.mutate({
    mutation: `
      mutation CreateProject($input: CreateProjectInput!) {
        createProject(input: $input) {
          id
        }
      }
    `,
    variables: {
      input: { name }
    }
  })
  return { id, name }
}

const ProjectsView = () => {
  const [name, setName] = useState('')
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const effect = async () =>
      setProjects(await fetch())
    effect()
  }, [])

  const createProject = async () => {
    const project = await create({ name })
    setProjects([...projects, project])
  }

  return <div className="w-full max-w-md h-full m-auto flex flex-col">
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
      Card={ProjectCard}
      selectKey={p => p.id}
    />
  </div>
}

export default ProjectsView