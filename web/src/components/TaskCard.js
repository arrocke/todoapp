import React from 'react'

export default ({
  task: { name, project } = {},
  hideProject = false
} = {}) => {
  return <div>
    <span data-test="task-name">{name}</span>
    {
      !hideProject && project
        ? <span data-test="task-project">{project.name}</span>
        : null
    }
  </div>
}
