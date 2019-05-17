import React from 'react'
import {render, within, fireEvent, wait} from 'react-testing-library'
import KanbanBoard from '../../../src/components/KanbanBoard'
import {TaskProvider} from '../../../src/contexts/task'
import taskBuilder from '../../builders/task'
import {DragEvent} from '../utils'
import client from '../../../src/client'

jest.mock('../../../src/client', () => ({
  query: jest.fn(),
  mutate: jest.fn()
}))

afterEach(() => {
  client.query.mockReset()
  client.mutate.mockReset()
})

const renderWithProviders = (ui, {
  tasks = new Array(15).fill().map(() => taskBuilder())
} = {}) => {
  const setTasks = jest.fn()
  const utils = render(
    <TaskProvider value={{tasks, setTasks}}>
      {ui}
    </TaskProvider>
  ) 
  return {
    ...utils,
    tasks,
    setTasks
  }
}

test('displays a list for each task state', () => {
  const {tasks, getAllByTestId} = renderWithProviders(
    <KanbanBoard />
  )
  const testList = (state, title) => {
    const list = getAllByTestId('kanban-list').find(el => within(el).queryByText(title))
    
    expect(within(list).getByTestId('kanban-list-title')).toHaveTextContent(title)

    const expected = tasks
      .filter(task => task.state === state)
      .map(({name}) => name)
    const actual = within(list)
      .getAllByTestId('task-name')
      .map(({textContent}) => textContent)

    expect(actual).toEqual(expected)
  }

  testList('added', /added/i)
  testList('planned', /planned/i)
  testList('in-progress', /in progress/i)
  testList('blocked', /blocked/i)
  testList('complete', /complete/i)
})

test('hides project labels when the showProject prop is false', () => {
  const {queryAllByTestId} = renderWithProviders(
    <KanbanBoard showProject={false} />
  )

  expect(queryAllByTestId('task-project')).toHaveLength(0)
})

test('shows project labels when the showProject prop is true', () => {
  const {tasks, getAllByTestId} = renderWithProviders(
    <KanbanBoard showProject={true} />
  )

  const expected = tasks
    .filter(({project}) => project)
    .map(({project}) => project.name)
    .sort()
  const actual = getAllByTestId('task-card')
    .map(el => {
      const project = within(el).queryByTestId('task-project')
      return project ? project.textContent : null
    })
    .filter(project => project)
    .sort()

  expect(actual).toEqual(expected)
})
