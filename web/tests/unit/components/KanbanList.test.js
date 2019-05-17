import React from 'react'
import {render, within, fireEvent, wait} from 'react-testing-library'
import KanbanList from '../../../src/components/KanbanList'
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

test('displays a list of tasks with the given state', () => {
  const {tasks, getAllByTestId} = renderWithProviders(
    <KanbanList state="planned" />
  )

  const expected = tasks
    .filter(({state}) => state === 'planned')
    .map(({name}) => name)
  const actual = getAllByTestId('task-name')
    .map(({textContent}) => textContent)
  expect(actual).toEqual(expected)
})

test('displays the title based on the given state', () => {
  const {getByTestId} = renderWithProviders(
    <KanbanList state="in-progress" />
  )

  expect(getByTestId('kanban-list-title')).toHaveTextContent(/in progress/i)
})

test('hides project labels when the showProject prop is false', () => {
  const {queryAllByTestId} = renderWithProviders(
    <KanbanList state="in-progress" showProject={false} />
  )

  expect(queryAllByTestId('task-project')).toHaveLength(0)
})

test('shows project labels when the showProject prop is true', () => {
  const {tasks, getAllByTestId} = renderWithProviders(
    <KanbanList state="in-progress" showProject={true} />
  )

  const expected = tasks
    .filter(({state, project}) => state === 'in-progress' && project)
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

test('dragging a task to the list changes its state to the list state', async () => {
  const task = taskBuilder({state: 'planned'})
  const updatedTask = {
    ...task,
    state: 'in-progress'
  }

  client.mutate.mockResolvedValueOnce({data: {updateTask: updatedTask}})

  const {getByTestId, setTasks} = renderWithProviders(
    <KanbanList state="in-progress" showProject={true} />,
    {tasks: [task]}
  )

  const list = getByTestId('kanban-list')
  fireEvent(list, new DragEvent('drop', {task}))

  expect(client.mutate).toHaveBeenCalledTimes(1)
  expect(client.mutate).toHaveBeenCalledWith({
    mutation: expect.anything(),
    variables: {input: updatedTask}
  })
  
  await wait(() => expect(setTasks).toHaveBeenCalledTimes(1))
  expect(setTasks).toHaveBeenCalledWith([updatedTask])
})
