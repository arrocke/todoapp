import React from 'react'
import client from '../client'
import KanbanBoard from '../components/kanban/KanbanBoard'
import {TaskProvider} from '../contexts/task'

const load = async () => {
  const { data } = await client.query({
    query: `
      {
        tasks {
          id,
          name,
          state
        }
      }`
  })
  return data.tasks
}

export default () => {
  return <TaskProvider load={load}>
    <KanbanBoard className='flex-grow' />
  </TaskProvider>
}