import React, { useCallback } from 'react'
import TaskCard from './TaskCard'
import {TITLE_MAP} from '../config'
import {useTasks} from '../contexts/task'

const KanbanList = ({
  state,
  showProject = false,
  className = ''
}) => {
  const { tasks, update } = useTasks()

  // Event handler to begin dragging a task to another state list.
  const onDragStart = useCallback((task) => {
    return e => {
      e.dataTransfer.setData('task', task)
      e.dataTransfer.dropEffect = 'move'
    }
  }, [])

  // Event handler for dragging a task over the list.
  const onDragOver = useCallback(e => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }, [])

  // Event handler for dropping a task over the list.
  // Updates the state only if the task was dropped on a different list.
  const onDrop = useCallback(e => {
    e.preventDefault()
    const task = e.dataTransfer.getData('task')
    if (task.state !== state) {
      update({
        ...task,
        state
      })
    }
  }, [state, update])

  // The list of TaskCards that have the state for this list.
  const title = TITLE_MAP[state]
  const filteredTasks = tasks
    .filter(task => task.state === state)
    .map(
      task => <TaskCard
        key={task.id}
        name={task.name}
        project={showProject && task.project && task.project.name}
        onDragStart={onDragStart(task)}
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
