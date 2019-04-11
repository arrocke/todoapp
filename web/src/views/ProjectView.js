import React, { useState, useEffect } from 'react'
import projectService from '../services/project'
import taskService from '../services/task'

const ProjectView = ({ match }) => {
  const { id } = match.params
  const [{ name, tasks }, setProject] = useState({ tasks: [] })
  const [taskName, setTaskName] = useState('')

  useEffect(() => {
    const effect = async () =>
      setProject(await projectService.getOne({ id }))
    effect()
  }, [id])

  const createTask = async () => {
    const task = await taskService.create({ name: taskName, projectId: id })
    setProject({
      name,
      tasks: [...tasks, task]
    })
  }

  return <div>
    <h2>{name}</h2>
    <input
      type="text"
      onInput={e => setTaskName(e.target.value)}
    />
    <button
      className="btn ml-2"
      onClick={createTask}
    >Add</button>
    <ul>
      {tasks.map(p => <li key={p.id}>{p.name}</li>)}
    </ul>
  </div>
}

export default ProjectView