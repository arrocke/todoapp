import React from 'react'
import TaskCard from './TaskCard'

export default ({
  tasks = [],
  hideProject = false,
  className = ''
} = {}) => {
  return <ul className={className}>
    {
      tasks.map(task =>
        <li key={task.taskId}>
          <TaskCard task={task} hideProject={hideProject}/>
        </li>)
    } 
  </ul>
}
