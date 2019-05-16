import React, { useEffect } from 'react'
import client from '../client'
import KanbanBoard from '../components/kanban/KanbanBoard'
import {useTasks} from '../contexts/task'

const getTasks = async () => {
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
  const { load } = useTasks()

  useEffect(() => {
    let cancelled = false
    const effect = async () => {
      const tasks = await getTasks()
      if (!cancelled) {
        load(tasks)        
      }
    }
    effect()
    return () => { cancelled = true }
  }, [])
  
  return <KanbanBoard className='flex-grow' />
}