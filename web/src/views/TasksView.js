import React, { useState, useEffect } from 'react'
import taskService from '../services/task'

const TasksView = () => {
  const [tasks, setTasks] = useState([])
  const [name, setName] = useState('')

  useEffect(() => {
    const effect = async () => 
      setTasks(await taskService.getAll())
    effect()
  }, [])

  const createTask = async () => {
    const task = await taskService.create({ name })
    setTasks([...tasks, task])
  }

  return <div>
    <input
      type="text"
      onInput={e => setName(e.target.value)}
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

export default TasksView
