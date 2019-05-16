import React from 'react'
import { Route, Switch } from 'react-router-dom'

import TodayView from './TodayView'
import ProjectView from './ProjectView'

const PageView = () => {
  return <Switch>
    <Route exact path="/today" component={TodayView} />
    <Route exact path="/projects/:projectId" component={ProjectView} />
  </Switch>
}

export default PageView