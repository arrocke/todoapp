import React from 'react'
import { NavLink } from 'react-router-dom'

const NavigationLink = ({ to, icon, title }) =>
  <NavLink
    to={to}
    className="w-24 relative no-underline block flex flex-col items-center py-3 text-black hover:bg-grey"
    activeClassName="bg-grey-light" 
  >
    <div className={`icon icon-${icon}`}/>
    <div className="mt-1 text-xs font-bold">{title}</div>
  </NavLink>

const Navigation = ({ className }) => {
  return <nav className={`flex justify-center items-center bg-white ${className}`}>
    <NavigationLink to="/projects" icon="projects" title="PROJECTS"/>
    <NavigationLink to="#" icon="add" title="NEW"/>
    <NavigationLink to="/tasks" icon="tasks" title="TASKS"/>
  </nav>
}

export default Navigation