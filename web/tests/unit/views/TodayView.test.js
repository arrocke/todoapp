import React from 'react'
import { render, waitForElement, within } from 'react-testing-library'
import TodayView from '../../../src/views/TodayView'
import client from '../../../src/client'
import { resizeWindow } from '../utils'

jest.mock('../../../src/client')

describe('TodayView', () => {
  let tasks

  const LIST_MAP = [
    { state: 'added', title: 'Added' },
    { state: 'planned', title: 'Planned' },
    { state: 'in-progress', title: 'In Progress' },
    { state: 'blocked', title: 'Blocked' },
    { state: 'complete', title: 'Complete' },
  ]

  // Set up the client to return tasks when making a request.
  const initClient = (tasks) => {
    client.query.mockResolvedValueOnce({
      data: {
        tasks
      }
    })
  }

  // Initialize tasks for testing.
  beforeEach(() => {
    tasks = [
      {
        id: '1',
        name: 'Task One',
        state: 'added'
      },
      {
        id: '2',
        name: 'Task Two',
        state: 'added'
      },
      {
        id: '3',
        name: 'Task Three',
        state: 'in-progress'
      },
      {
        id: '4',
        name: 'Task Four',
        state: 'blocked'
      },
      {
        id: '5',
        name: 'Task Five',
        state: 'complete'
      },
      {
        id: '6',
        name: 'Task Six',
        state: 'backlog'
      },
      {
        id: '7',
        name: 'Task Seven',
        state: 'planned'
      },
      {
        id: '8',
        name: 'Task Eight',
        state: 'in-progress'
      },
      {
        id: '9',
        name: 'Task Nine',
        state: 'blocked'
      },
      {
        id: '10',
        name: 'Task Ten',
        state: 'complete'
      },
    ]
  })

  describe('narrow ui', () => {
    beforeEach(() => {
      // Set the viewport for a narrow screen.
      resizeWindow(400, 800)
    })
  })

  describe('wide ui', () => {
    beforeEach(() => {
      // Set the viewport for a wide screen.
      resizeWindow(1000, 800)
    })

    it('shows a list for each task state', async () => {
      // Setup api request to return no tasks.
      initClient([])

      // Render and wait for data to load.
      const { getAllByTestId, getByTestId  } = render(<TodayView />)
      await waitForElement(() => getByTestId('kanban-board'))

      // Get the name of each list.
      const actual = getAllByTestId('kanban-list-title').map(el => el.textContent)

      // Get the expected names.
      const expected = LIST_MAP.map(x => x.title)

      expect(actual).toEqual(expected)
    })

    it('displays each task', async () => {
      // Setup api request to return a set of tasks.
      initClient(tasks) 

      // Render and wait for data to load.
      const { getAllByTestId, getByTestId } = render(<TodayView />)
      await waitForElement(() => getByTestId('kanban-board'))

      // Get the name of each task in each list.
      const actual = getAllByTestId('kanban-list')
        .map(el => within(el).getAllByTestId('task-name')
          .map(nel => nel.textContent))

      // Get the expected task names.
      const expected = LIST_MAP.map(
        x => tasks
          .filter(task => task.state === x.state)
          .map(task => task.name)
      )

      expect(actual).toEqual(expected)
    })
  })
})