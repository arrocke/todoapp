import React, { useState, useEffect } from 'react'
import gql from "graphql-tag";
import client from '../client'

const fetch = async (id) => {
  const { data: { project }} = await client.query({
    query: gql`
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

const create = async ({ name, projectId }) => {
  const { data: { createTask: { id } }} = await client.mutate({
    mutation: gql`
      mutation CreateTask($input: CreateTaskInput!) {
        createTask(input: $input) {
          id
        }
      }`,
    variables: {
      input: { name, projectId }
    }
  })
  return { id, name }
}

const ProjectView = ({ match }) => {
  const { id } = match.params
  const [{ name, tasks }, setProject] = useState({ tasks: [] })
  const [taskName, setTaskName] = useState('')

  useEffect(() => {
    const effect = async () => 
      setProject(await fetch(id))
    effect()
  }, [id])

  const createTask = async () =>
    setProject({
      name,
      tasks: [...tasks, await create({ name: taskName })],
    })

  // Render a list of tasks with the same state.
  const taskList = ({ title, state }) =>
    <div>
      <h3>{title}</h3>
      <ul className="list-reset">
        {tasks
          .filter(t => t.state === state)
          .map(p => <li key={p.id}>{p.name}</li>)}
      </ul>
    </div>

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
    <div className="flex justify-around">
      {taskList({ title: 'Added', state: 'added' })}
      {taskList({ title: 'Planned', state: 'planned' })}
      {taskList({ title: 'In Progress', state: 'in-progress' })}
      {taskList({ title: 'Blocked', state: 'blocked' })}
      {taskList({ title: 'Complete', state: 'complete' })}
    </div>
  </div>
}

export default ProjectView