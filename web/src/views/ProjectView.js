import React, { useState, useEffect } from 'react'
import gql from "graphql-tag";
import client from '../client'
import CardList from '../components/CardList'

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
    <div className="my-3 px-4 lg:w-1/5">
      <h3 className="mx-6 text-base">{title}</h3>
      <div className="overflow-scroll">
        <CardList
          list={tasks.filter(t => t.state === state)}
          renderCard={({ name }) => <span className="text-black">{name}</span>}
          selectKey={({ id }) => id}
        />
      </div>
    </div>

  return <div className="absolute w-full h-full flex flex-col">
    <h2>{name}</h2>
    <div>
      <input
        type="text"
        onInput={e => setTaskName(e.target.value)}
      />
      <button
        className="btn ml-2"
        onClick={createTask}
      >Add</button>
    </div>
    <div className="flex-grow flex justify-around flex-col lg:flex-row">
      {taskList({ title: 'ADDED', state: 'added' })}
      {taskList({ title: 'PLANNED', state: 'planned' })}
      {taskList({ title: 'IN PROGRESS', state: 'in-progress' })}
      {taskList({ title: 'BLOCKED', state: 'blocked' })}
      {taskList({ title: 'COMPLETE', state: 'complete' })}
    </div>
  </div>
}

export default ProjectView