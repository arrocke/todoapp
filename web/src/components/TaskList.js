import React from 'react'
import TaskCard from './TaskCard'

export default ({
  tasks = [],
  hideProject = false
} = {}) => {
  return <ul>
    {
      tasks.map(task =>
        <li key={task.taskId}>
          <TaskCard task={task} hideProject={hideProject}/>
        </li>)
    } 
  </ul>
}
