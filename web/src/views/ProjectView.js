import React, { useState, useEffect } from 'react'
import client from '../client'
import CardList from '../components/CardList'
import TaskCard from '../components/TaskCard'

const fetch = async (id) => {
  const { data: { project }} = await client.query({
    query: `
      query Project($id: ID!) {
        project(id: $id) {
          id
          name
          tasks {
            id
            name
            state
          }
        }
      }`,
    variables: {
      id
    }
  })
  return project
}

const ProjectView = ({ match }) => {
  const { id } = match.params
  const [{ name, tasks }, setProject] = useState({ tasks: [] })

  useEffect(() => {
    const effect = async () => 
      setProject(await fetch(id))
    effect()
  }, [id])

  // Render a list of tasks with the same state.
  const taskList = ({ title, state, className }) =>
    <div className={`flex flex-col lg:h-full lg:w-1/5 ${className}`}>
      <h3 className="m-3 text-base">{title}</h3>
      <CardList
        className="overflow-scroll"
        list={tasks.filter(t => t.state === state)}
        Card={TaskCard}
        selectKey={({ id }) => id}
      />
    </div>

  return <div className="w-full h-full flex flex-col">
    <h2>{name}</h2>
    <div className="flex-grow flex flex-col justify-start overflow-scroll lg:justify-around lg:flex-row lg:overflow-hidden">
      {taskList({ title: 'ADDED', state: 'added', className: 'mr-2' })}
      {taskList({ title: 'PLANNED', state: 'planned', className: 'mx-2' })}
      {taskList({ title: 'IN PROGRESS', state: 'in-progress', className: 'mx-2' })}
      {taskList({ title: 'BLOCKED', state: 'blocked', className: 'mx-2' })}
      {taskList({ title: 'COMPLETE', state: 'complete', className: 'ml-2' })}
    </div>
  </div>
}

export default ProjectView