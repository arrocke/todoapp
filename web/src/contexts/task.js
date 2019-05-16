// This context is responsible for managing a list of tasks and updates to it.
// It has a provider that loads the initial data,
// and a hook to get access to the task list and methods to update it.

import React, { useState, useEffect, useContext, useMemo } from 'react'
import client from '../client'

const TaskContext = React.createContext()

// API methods.

// Save task changes to the server.
const saveTask = async ({ id, name, state }) => {
  const { data } = await client.mutate({
    mutation: `
      mutation Update($input: UpdateTaskInput!) {
        updateTask(input: $input) {
          id
          name
          state
          project {
            name
          }
        }
      }
    `,
    variables: { input: { id, name, state } }
  })
  return data.updateTask
}

// Create a new task on the server.
const createTask = async ({ name, state }) => {
  const { data } = await client.mutate({
    mutation: `
      mutation Create($input: CreateTaskInput!) {
        createTask(input: $input) {
          id
          name
          state
          project {
            name
          }
        }
      }
    `,
    variables: { input: { name, state } }
  })
  return data.createTask
}

/**
 * Provides tasks to consuming components.
 */
const TaskProvider = (props) => {
  const [tasks, setTasks] = useState([])

  // Expose the list and setter.
  const value = useMemo(() => {
    return {
      tasks,
      setTasks
    }
  }, [tasks])
  return <TaskContext.Provider value={value} {...props} />
}

/**
 * Gives access to the TaskContext.
 * @throws When not used within a TaskProvider.
 */
const useTasks = () => {
  const context = useContext(TaskContext)

  // Make sure we are within a TaskProvider.
  if (!context) {
    throw new Error('useCount must be used within a TaskProvider')
  }
  const {tasks, setTasks} = context

  // Update a task and sync with the server.
  const update = async (task) => {
    task = await saveTask(task)

    // If save succeeds, update the task list.
    const index = tasks.findIndex(({ id }) => id === task.id)
    const updatedTasks = tasks.slice()
    updatedTasks[index] = task
    setTasks(updatedTasks)
  }

  // Add a new task and sync with the server.
  const create = async (task) => {
    task = await createTask(task)
    setTasks([
      ...tasks,
      task
    ])
  }

  const load = setTasks

  return { tasks, update, create, load }
}

export {TaskProvider, useTasks}
