import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {useProjects} from '../contexts/projects'

export default () => {
  const [isOpen, setOpen] = useState(false)
  const {projects} = useProjects()

  const projectLinks = projects.map(
    project =>
      <NavLink
        key={project.id}
        className="px-3 py-4 hover:bg-grey-light block text-black no-underline"
        activeClassName="bg-grey-light"
        to={`/projects/${project.id}`}
        onClick={() => setOpen(false)}
        data-test="nav-link"
      >{project.name}</NavLink>
  )

  return <div>
    <nav className="p-3 border-b-2 flex items-center">
      <button
        className="icon icon-menu w-8 h-8"
        data-test="menu-button"
        onClick={() => setOpen(true)}
      />
      <span className="flex-grow font-bold text-xl text-center">TODO</span>
      <button className="rounded-full icon icon-profile bg-grey-light w-8 h-8" />
    </nav>

    <div
      className={`bg-shadow fixed pin transition z-10 ${isOpen ? '' : 'bg-transparent invisible'}`}
      style={{ transitionProperty: `background-color, ${isOpen ? '' : 'visibility'}` }}
      onClick={() => setOpen(false)}
      data-test="side-menu-overlay"
    >
      <div
        className={`w-96 bg-white h-full shadow-lg transition ${isOpen ? '' : '-ml-96'}`}
        style={{ transitionProperty: 'margin-left' }}
        onClick={e => e.stopPropagation()}
        data-test="side-menu"
      >
        <div className="flex flex-row-reverse p-3">
          <button
            className="icon icon-close w-8 h-8"
            data-test="close-menu-button"
            onClick={() => setOpen(false)}
          />
        </div>
        <NavLink
          className="px-3 py-4 hover:bg-grey-light block text-black no-underline"
          activeClassName="bg-grey-light"
          to="/today"
          onClick={() => setOpen(false)}
          data-test="nav-link"
        >Today</NavLink>
        {projectLinks}
      </div>
    </div>
  </div>
}