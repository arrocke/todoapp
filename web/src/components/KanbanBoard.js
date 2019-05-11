import React, { useState } from 'react'
import useMediaQuery from '../hooks/media-query'
import client from '../client'

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

  const TaskCard = ({
    task: { name, project, id } = {},
    className = ''
  } = {}) => {
    const onDragStart = e => {
      e.dataTransfer.setData('text/plain', id)
      e.dataTransfer.dropEffect = 'move'
    }

    return <li
      className={`my-2 p-2 rounded bg-white shadow ${className}`}
      draggable="true"
      onDragStart={onDragStart}
    >
      <span data-test="task-name">{name}</span>
      {
        !hideProject && project
          ? <span data-test="task-project">{project.name}</span>
          : null
      }
    </li>
  }

  const KanbanList = ({
    state,
    className = ''
  }) => {
    const onDragOver = e => {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'
    }

    const onDrop = e => {
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
        updateTask(updatedTask)
      }
    }

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
                />
              )
          } 
        </ul>
    </div>
  }

  const ListButton = ({
    state,
    className = ''
  }) =>
    <button
      className={`px-1 sm:px-2 py-3 text-2xs sm:text-xs md:text-sm font-bold ${ state === visibleState ? 'bg-grey-light' : ''} ${className}`}
      type="button"
      onClick={() => setVisibleState(state)}
    >
      {TASK_STATE_MAP[state].title}
    </button>

  if (screen.lg) {
    // Generate a list for each task state.
    const lists = Object
      .getOwnPropertyNames(TASK_STATE_MAP)
      .map(state => <KanbanList key={state} state={state} />)

    return <div
      className={`flex-1 flex px-2 py-4 ${className}`}
      data-test="kanban-board"
    > { lists } </div>
  } else {
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
      <nav className="flex justify-center border-t-2 border-black">{ buttons }</nav>
    </div>
  }
}

export default KanbanBoard