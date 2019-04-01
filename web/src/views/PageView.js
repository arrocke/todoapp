import React from 'react'
import { Route } from 'react-router-dom'
import ProjectsView from './ProjectsView'

const PageView = ({ className }) => {
  return <Route exact path="/projects/" component={ProjectsView} />
}

export default PageView