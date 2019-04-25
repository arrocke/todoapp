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

const NavigationSpacer = () =>
  <span className="inline-block h-full w-px bg-grey"/>

const Navigation = () => {
  return <nav className="flex justify-center items-center border-b border-grey">
    <NavigationSpacer/>
    <NavigationLink to="/projects" icon="projects" title="PROJECTS"/>
    <NavigationSpacer/>
    <NavigationLink to="#" icon="add" title="NEW"/>
    <NavigationSpacer/>
    <NavigationLink to="/tasks" icon="tasks" title="TASKS"/>
    <NavigationSpacer/>
  </nav>
}

export default Navigation