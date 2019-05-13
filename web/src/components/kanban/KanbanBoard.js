import React, { useState, useCallback } from 'react'
import useMediaQuery from '../../hooks/media-query'
import KanbanList from './KanbanList'
import { TITLE_MAP } from './config'
import client from '../../client'

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

// Sorts tasks into different lists their state.
// Enables tasks to be dragged between lists to change their state.
const KanbanBoard = ({
  tasks = [],
  hideProject = false,
  className = '',
  onTasksChange = () => {}
} = {}) => {
  const [visibleState, setVisibleState] = useState('in-progress')
  const [screen] = useMediaQuery()

  // Event handler for when a task is updated.
  // Updates parent component and persists changes to the task to the server.
  const onTaskUpdate = useCallback(async task => {
    const index = tasks.findIndex(({ id }) => id === task.id)
    const updatedTasks = tasks.slice()
    updatedTasks[index] = task
    onTasksChange(updatedTasks)
    await saveTask({ id: task.id, state: task.state })
  }, [tasks, onTasksChange])

  // Render all of the lists on larger screens.
  if (screen.lg) {
    // Generate a list for each task state.
    const lists = Object
      .getOwnPropertyNames(TITLE_MAP)
      .map(state => <KanbanList
        key={state}
        tasks={tasks}
        state={state}
        hideProject={hideProject}
        onTaskUpdate={onTaskUpdate}
      />)

    return <div
      className={`flex-1 flex px-2 py-4 ${className}`}
      data-test="kanban-board"
    >{lists}</div>
  }
  // On smaller screens render a single list with buttons to select other lists to display. 
  else {
    // Generate a button for each task state.
    const buttons = Object
      .getOwnPropertyNames(TITLE_MAP)
      .map(state =>
        <button
          key={state} state={state}
          className={`px-1 sm:px-2 py-3 text-2xs sm:text-xs md:text-sm font-bold ${ state === visibleState ? 'bg-grey-light' : ''} ${className}`}
          type="button"
          onClick={() => setVisibleState(state)}
        >
          {TITLE_MAP[state]}
        </button>)

    return <div
      className={`flex-1 flex flex-col max-h-full ${className}`}
      data-test="kanban-board"
    >
      <div className="flex-1 flex justify-center px-2 py-4">
        <KanbanList
          className="w-full max-w-sm"
          tasks={tasks}
          state={visibleState}
          hideProject={hideProject}
          onTaskUpdate={onTaskUpdate}
        />
      </div>
      <nav
        className="flex justify-center border-t-2 border-black"
        data-test="kanban-navigation"
      >{buttons}</nav>
    </div>
  }
}

export default KanbanBoard