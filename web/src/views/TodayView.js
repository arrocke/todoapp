import React, { useState } from 'react'
import useGraphql from '../hooks/graphql'
import KanbanBoard from '../components/KanbanBoard'

const fetchTasks = `
  {
    tasks {
      id,
      name,
      state
    }
  } 
`

export default () => {
  const [tasks, setTasks] = useState([])
  const [loading, error] = useGraphql({
    query: fetchTasks,
    onResolved ({ tasks }) {
      setTasks(tasks)
    }
  })


  if (loading) {
    return null
  } else {
    return <KanbanBoard
      className='flex-grow'
      tasks={tasks}
      onTasksChange={tasks => setTasks(tasks)}
    />
  }
}