import React from 'react'
import { Router } from 'react-router-dom'
import { render } from 'react-testing-library'
import {createMemoryHistory} from 'history'

export const resizeWindow = (x, y) => {
  window.innerWidth = x
  window.innerHeight = y
  window.dispatchEvent(new Event('resize'))
}

export const renderWithRouter = (
  ui,
  {
      route = '/',
      history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) =>
  render(
    <Router history={history}>
      {ui}
    </Router>
  )
