import React from 'react'

const TaskCard = ({
  name,
  project,
  className,
  ...props
} = {}) => {
  // Don't show the project label if there is no project.
  const projectLabel = 
    project
      ? <span data-test="task-project">{project}</span>
      : null

  return <div
    className={`my-2 p-2 rounded bg-white shadow ${className}`}
    draggable="true"
    data-test="task-card"
    {...props}
  >
    <span data-test="task-name">{name}</span>
    {projectLabel}
  </div>
}

export default TaskCard
