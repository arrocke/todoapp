import React from 'react'
import { Route, Switch } from 'react-router-dom'

import TodayView from './TodayView'

const PageView = () => {
  return <Switch>
    <Route exact path="/today" component={TodayView} />
  </Switch>
}

export default PageView