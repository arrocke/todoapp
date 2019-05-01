import React from 'react'
import TaskCard from './TaskCard'

export default ({ tasks = [] } = {}) => {
  return <ul>
    {
      tasks.map(task =>
        <li key={task.taskId}>
          <TaskCard task={task}/>
        </li>)
    } 
  </ul>
}
