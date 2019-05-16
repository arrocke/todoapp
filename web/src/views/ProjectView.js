import React, { useEffect } from 'react'
import client from '../client'
import KanbanBoard from '../components/kanban/KanbanBoard'
import {useTasks} from '../contexts/task'

const getTasks = async (id) => {
  const { data } = await client.query({
    query: `
      query GetProject($id: ID!) {
        project(id: $id) {
          tasks {
            id,
            name,
            state
          }
        }
      }`,
    variables: { id }
  })
  return data.project.tasks
}

const ProjectView = ({ match }) => {
  const { load } = useTasks()

  useEffect(() => {
    let cancelled = false
    const effect = async () => {
      const tasks = await getTasks(match.params.projectId)
      if (!cancelled) {
        load(tasks)        
      }
    }
    effect()
    return () => { cancelled = true }
  }, [match.params.projectId])

  return <KanbanBoard className='flex-grow' />
}

export default ProjectView
