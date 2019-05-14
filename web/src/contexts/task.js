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
          state
        }
      }
    `,
    variables: { input: { id, name, state } }
  })
  return data
}

/**
 * Loads and provides tasks to consuming components.
 * @param {Function} props.load An async method that resolves with the initial list of tasks.
 */
const TaskProvider = ({ load, ...props}) => {
  const [tasks, setTasks] = useState([])

  // Load initial tasks.
  useEffect(() => {
    const effect = async () =>
      setTasks(await load())
    effect()
  }, [])

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
 * @throws {Error} When not used within a TaskProvider.
 * @returns {Object} Contains the tasks list and a method to update a task.
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
    await saveTask(task)

    // If save succeeds update the state.
    const index = tasks.findIndex(({ id }) => id === task.id)
    const updatedTasks = tasks.slice()
    updatedTasks[index] = task
    setTasks(updatedTasks)
  }

  return { tasks, update }
}

export {TaskProvider, useTasks}
