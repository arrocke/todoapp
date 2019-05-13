import React, { useCallback } from 'react'
import client from '../client'
import TaskCard from './TaskCard'

export const TITLE_MAP = {
  'added': 'ADDED',
  'planned': 'planned',
  'in-progress': 'IN PROGRESS',
  'blocked': 'BLOCKED',
  'complete': 'COMPLETE'
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

const KanbanList = ({
  tasks = [],
  state,
  hideProject = false,
  className = '',
  onTasksChange = () => {}
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

  const title = TITLE_MAP[state]
  const filteredTasks = tasks
    .filter(task => task.state === state)
    .map(
      task => <TaskCard
        key={task.id}
        task={task}
        hideProject={hideProject}
      />
    )

  return <div 
    className={`flex flex-col lg:w-full max-h-full pb-2 mx-2 rounded-lg shadow-inner bg-grey-light ${className}`}
    data-test="kanban-list"
    onDragOver={onDragOver}
    onDrop={onDrop}
  >
    <h2
      className="p-4 pb-1 text-base"
      data-test="kanban-list-title"
    >{title}</h2>
      <ul className="flex-1 px-2 m-0 overflow-auto list-reset">
        {filteredTasks} 
      </ul>
  </div>
}

export default KanbanList
