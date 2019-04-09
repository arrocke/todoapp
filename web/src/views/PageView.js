import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ProjectsView from './ProjectsView'
import TasksView from './TasksView'

const PageView = () => {
  return <Switch>
    <Route exact path="/projects/" component={ProjectsView} />
    <Route exact path="/tasks/" component={TasksView} />
  </Switch>
}

export default PageView