import React, { useState, useCallback } from 'react'
import useMediaQuery from '../hooks/media-query'
import client from '../client'
import TaskCard from './TaskCard'

const TASK_STATE_MAP = {
  'added': { title: 'ADDED' },
  'planned': { title: 'PLANNED' },
  'in-progress': { title: 'IN PROGRESS' },
  'blocked': { title: 'BLOCKED' },
  'complete': { title: 'COMPLETE' }
}

const updateTask = async ({ id, name, state }) => {
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

const KanbanBoard = ({
  tasks = [],
  hideProject = false,
  className = '',
  onTasksChange = () => {}
} = {}) => {
  const [visibleState, setVisibleState] = useState('in-progress')
  const [screen] = useMediaQuery()

  const KanbanList = useCallback(({
    state,
    className = ''
  }) => {
    const onDragOver = useCallback(e => {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'
    }, [])

    const onDrop = useCallback(e => {
      e.preventDefault()
      const id = e.dataTransfer.getData('text/plain')
      const task = tasks.find(task => task.id === id)
      if (task.state !== state) {
        const index = tasks.findIndex(t => t.id === id)
        const updatedTasks = tasks.slice()
        const updatedTask = {
          ...task,
          state
        }
        updatedTasks[index] = updatedTask
        onTasksChange(updatedTasks)
        updateTask({ id, state })
      }
    }, [tasks, state, onTasksChange])

    return <div 
      className={`flex flex-col lg:w-full max-h-full pb-2 mx-2 rounded-lg shadow-inner bg-grey-light ${className}`}
      data-test="kanban-list"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <h2
        className="p-4 pb-1 text-base"
        data-test="kanban-list-title"
      >{TASK_STATE_MAP[state].title}</h2>
        <ul className="flex-1 px-2 m-0 overflow-auto list-reset">
          {
            tasks
              .filter(task => task.state === state)
              .map(
                task => <TaskCard
                  key={task.id}
                  task={task}
                  hideProject={hideProject}
                />
              )
          } 
        </ul>
    </div>
  }, [tasks, onTasksChange])

  const ListButton = useCallback(({
    state,
    className = ''
  }) => {
    return <button
      className={`px-1 sm:px-2 py-3 text-2xs sm:text-xs md:text-sm font-bold ${ state === visibleState ? 'bg-grey-light' : ''} ${className}`}
      type="button"
      onClick={() => setVisibleState(state)}
    >
      {TASK_STATE_MAP[state].title}
    </button>
  }, [visibleState])

  // Render more lists on larger screens.
  if (screen.lg) {
    // Generate a list for each task state.
    const lists = Object
      .getOwnPropertyNames(TASK_STATE_MAP)
      .map(state => <KanbanList key={state} state={state} />)

    return <div
      className={`flex-1 flex px-2 py-4 ${className}`}
      data-test="kanban-board"
    >{lists}</div>
  }
  // On smaller screens render a single list with buttons to select other lists to display. 
  else {
    // Generate a button for each task state.
    const buttons = Object
      .getOwnPropertyNames(TASK_STATE_MAP)
      .map(state => <ListButton key={state} state={state} />)

    return <div
      className={`flex-1 flex flex-col max-h-full ${className}`}
      data-test="kanban-board"
    >
      <div className="flex-1 flex justify-center px-2 py-4">
        <KanbanList className="w-full max-w-sm" state={visibleState} />
      </div>
      <nav className="flex justify-center border-t-2 border-black">{buttons}</nav>
    </div>
  }
}

export default KanbanBoard