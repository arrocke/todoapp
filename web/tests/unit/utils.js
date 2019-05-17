import React from 'react'
import { Router } from 'react-router-dom'
import { render, fireEvent } from 'react-testing-library'
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
  ({
    ...render(
      <Router history={history}>
        {ui}
      </Router>
    ),
    history
  })

// Mock DragEvent for JSDOM.
export class DragEvent extends Event {
  constructor(event, data) {
    super(event, { cancelable: true, bubbles: true })

    this.dataTransfer = {
      setData (key, value) {
        data[key] = value
      },
      getData (key) {
        return data[key]
      },
      dropEffect: null
    }
  }
}

export const drag = (el, target) => {
  const data = {}
  fireEvent(el, new DragEvent('dragstart', data))
  fireEvent(target, new DragEvent('dragover', data))
  fireEvent(target, new DragEvent('drop', data))
}