import React, { useCallback } from 'react'

const TaskCard = ({
  task: { name, project, id } = {},
  hideProject = false,
  className = ''
} = {}) => {
  const onDragStart = useCallback(e => {
    e.dataTransfer.setData('text/plain', id)
    e.dataTransfer.dropEffect = 'move'
  }, [id])

  return <li
    className={`my-2 p-2 rounded bg-white shadow cursor-pointer ${className}`}
    draggable="true"
    onDragStart={onDragStart}
    data-test="task-card"
  >
    <span data-test="task-name">{name}</span>
    {
      !hideProject && project
        ? <span data-test="task-project">{project ? project.name : null}</span>
        : null
    }
  </li>
}

export default TaskCard