import React, { useState, useEffect } from 'react'
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
  const [{ tasks }, loading, error] = useGraphql({
    query: fetchTasks
  })

  if (loading) {
    return null
  } else {
    return <KanbanBoard className='flex-grow' tasks={tasks} />
  }
}