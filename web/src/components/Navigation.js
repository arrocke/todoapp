import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return <header className="p-4 flex">
    <h1>Todo App</h1>
    <span className="flex-grow" />
    <ul className="list-reset display-flex">
      <li className="p-3 inline-block"><Link to="/projects" className="text-white font-bold no-underline">PROJECTS</Link></li>
      <li className="p-3 inline-block"><Link to="/tasks" className="text-white font-bold no-underline">TASKS</Link></li>
    </ul>
  </header>
}

export default Navigation