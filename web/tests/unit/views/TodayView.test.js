import React from 'react'
import { within, render, fireEvent, wait } from 'react-testing-library'
import TodayView from '../../../src/views/TodayView'
import { resizeWindow, drag } from '../utils'
import taskBuilder from '../../builders/task'
import client from '../../../src/client'

jest.mock('../../../src/client', () => ({
  query: jest.fn().mockResolvedValue({}),
  mutate: jest.fn().mockResolvedValue({})
}))

afterEach(() => {
  client.query.mockReset()
  client.query.mockResolvedValue({})
  client.mutate.mockReset()
  client.mutate.mockResolvedValue({})
})

const renderTodayView = async ({
  tasks = new Array(15).fill().map(() => taskBuilder())
} = {}) => {
  client.query.mockResolvedValueOnce({ data: { tasks }})
  const utils = render(<TodayView />)
  await wait(() => utils.getByTestId('kanban-board'))
  return {
    ...utils,
    tasks
  }
}

// Test a list for its title and tasks.
const testKanbanList = ({ el, state, title, tasks }) => {
  const { getByTestId, queryAllByTestId } = within(el)

  // Test the list title
  const titleElement = getByTestId('kanban-list-title')
  expect(titleElement).toHaveTextContent(title)

  // Test for the presence of the correct tasks.
  const taskElements = queryAllByTestId('task-name')
    .map(card => card.textContent)
  const expected = tasks
    .filter(task => task.state === state)
    .map(({ name }) => name)
  expect(taskElements).toEqual(expected)
}


describe('on wide screens', () => {
  beforeEach(() => {
    resizeWindow(1280, 786)
  })

  it('displays a list of added tasks.', async () => {
    const { tasks, getAllByTestId } = await renderTodayView()
    const listElement = getAllByTestId('kanban-list')[0]

    testKanbanList({
      el: listElement,
      state: 'added',
      title: /added/i,
      tasks
    })
  })

  it('displays a list of planned tasks.', async () => {
    const { tasks, getAllByTestId } = await renderTodayView()
    const listElement = getAllByTestId('kanban-list')[1]

    testKanbanList({
      el: listElement,
      state: 'planned',
      title: /planned/i,
      tasks
    })
  })

  it('displays a list of in progress tasks.', async () => {
    const { tasks, getAllByTestId } = await renderTodayView()
    const listElement = getAllByTestId('kanban-list')[2]

    testKanbanList({
      el: listElement,
      state: 'in-progress',
      title: /in progress/i,
      tasks
    })
  })

  it('displays a list of blocked tasks.', async () => {
    const { tasks, getAllByTestId } = await renderTodayView()
    const listElement = getAllByTestId('kanban-list')[3]

    testKanbanList({
      el: listElement,
      state: 'blocked',
      title: /blocked/i,
      tasks
    })
  })

  it('displays a list of completed tasks.', async () => {
    const { tasks, getAllByTestId } = await renderTodayView()
    const listElement = getAllByTestId('kanban-list')[4]

    testKanbanList({
      el: listElement,
      state: 'complete',
      title: /complete/i,
      tasks
    })
  })

  it('dragging a task from one list to another changes its state.', async () => {
    const task = taskBuilder({ state: 'planned' })
    client.mutate.mockResolvedValueOnce({ data: { updateTask: { ...task, state: 'complete' }}})

    const { getByTestId, getAllByTestId } = await renderTodayView({ tasks: [task] })

    let taskElement = getByTestId('task-card')
    let taskListElement = getAllByTestId('kanban-list')[4]

    drag(taskElement, taskListElement)

    expect(client.mutate).toHaveBeenCalledTimes(1)
    expect(client.mutate.mock.calls[0][0].variables).toEqual({ input: { ...task, state: 'complete' } })

    taskElement = getByTestId('task-card')
    taskListElement = getAllByTestId('kanban-list')[4]
    wait(() => expect(taskListElement).toContainElement(taskElement))
  })

  it('using the move menu changes a task state.', async () => {
    const task = taskBuilder({ state: 'planned' })
    client.mutate.mockResolvedValueOnce({ data: { updateTask: { ...task, state: 'complete' }}})

    const { getByTestId, getAllByTestId } = await renderTodayView({ tasks: [task] })

    let taskElement = getByTestId('task-card')

    const menuElement = within(taskElement).getByText(/move/i)
    fireEvent.click(menuElement)

    const menuItem = within(taskElement).getByText(/complete/i)
    fireEvent.click(menuItem)

    expect(client.mutate).toHaveBeenCalledTimes(1)
    expect(client.mutate.mock.calls[0][0].variables).toEqual({ input: { ...task, state: 'complete' } })

    taskElement = getByTestId('task-card')
    const taskListElement = getAllByTestId('kanban-list')[4]
    wait(() => expect(taskListElement).toContainElement(taskElement))
  })
})

describe('on narrow screens', () => {
  beforeEach(() => {
    resizeWindow(640, 800)
  })

  it('displays only the in progress tasks list by default', async () => {
    const { tasks, getAllByTestId } = await renderTodayView()

    const listElements = getAllByTestId('kanban-list')
    expect(listElements).toHaveLength(1)

    testKanbanList({
      el: listElements[0],
      state: 'in-progress',
      title: /in progress/i,
      tasks
    })
  })

  it('displays only the added tasks after clicking the added button.', async () => {
    const { tasks, getByTestId, getAllByTestId } = await renderTodayView()

    const menu = getByTestId('kanban-navigation')
    const button = within(menu).getByText(/added/i)
    fireEvent.click(button)

    const listElements = getAllByTestId('kanban-list')
    expect(listElements).toHaveLength(1)

    testKanbanList({
      el: listElements[0],
      state: 'added',
      title: /added/i,
      tasks
    })
  })

  it('displays only the planned tasks after clicking the planned button.', async () => {
    const { tasks, getByTestId, getAllByTestId } = await renderTodayView()

    const menu = getByTestId('kanban-navigation')
    const button = within(menu).getByText(/planned/i)
    fireEvent.click(button)

    const listElements = getAllByTestId('kanban-list')
    expect(listElements).toHaveLength(1)

    testKanbanList({
      el: listElements[0],
      state: 'planned',
      title: /planned/i,
      tasks
    })
  })

  it('displays only the in progress tasks after clicking the in progress button.', async () => {
    const { tasks, getByTestId, getAllByTestId } = await renderTodayView()

    const menu = getByTestId('kanban-navigation')
    const button1 = within(menu).getByText(/planned/i)
    fireEvent.click(button1)

    const button2 = within(menu).getByText(/in progress/i)
    fireEvent.click(button2)

    const listElements = getAllByTestId('kanban-list')
    expect(listElements).toHaveLength(1)

    testKanbanList({
      el: listElements[0],
      state: 'in-progress',
      title: /in progress/i,
      tasks
    })
  })

  it('displays only the blocked tasks after clicking the blocked button.', async () => {
    const { tasks, getByTestId, getAllByTestId } = await renderTodayView()

    const menu = getByTestId('kanban-navigation')
    const button = within(menu).getByText(/blocked/i)
    fireEvent.click(button)

    const listElements = getAllByTestId('kanban-list')
    expect(listElements).toHaveLength(1)

    testKanbanList({
      el: listElements[0],
      state: 'blocked',
      title: /blocked/i,
      tasks
    })
  })

  it('displays only the complete tasks after clicking the complete button.', async () => {
    const { tasks, getByTestId, getAllByTestId } = await renderTodayView()

    const menu = getByTestId('kanban-navigation')
    const button = within(menu).getByText(/complete/i)
    fireEvent.click(button)

    const listElements = getAllByTestId('kanban-list')
    expect(listElements).toHaveLength(1)

    testKanbanList({
      el: listElements[0],
      state: 'complete',
      title: /complete/i,
      tasks
    })
  })

  it('using the move menu changes a task state.', async () => {
    const task = taskBuilder({ state: 'in-progress' })
    client.mutate.mockResolvedValueOnce({ data: { updateTask: { ...task, state: 'complete' }}})

    const { getByTestId, debug } = await renderTodayView({ tasks: [task] })

    let taskElement = getByTestId('task-card')

    const menuElement = within(taskElement).getByText(/move/i)
    fireEvent.click(menuElement)

    const menuItem = within(taskElement).getByText(/complete/i)
    fireEvent.click(menuItem)

    expect(client.mutate).toHaveBeenCalledTimes(1)
    expect(client.mutate.mock.calls[0][0].variables).toEqual({ input: { ...task, state: 'complete' } })

    const taskListElement = getByTestId('kanban-list')
    wait(() => expect(within(taskListElement).queryAllByTestId('task-card')).toHaveLength(0))
  })
})

