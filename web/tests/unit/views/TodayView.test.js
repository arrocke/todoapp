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
    const { getByTestId, getAllByTestId, rerender, debug } = await renderTodayView({ tasks: [task] })

    client.query.mockReset()

    let taskElement = getByTestId('task-card')
    let taskListElement = getAllByTestId('kanban-list')[4]

    drag(taskElement, taskListElement)

    expect(client.mutate).toHaveBeenCalledTimes(1)
    expect(client.mutate.mock.calls[0][0].variables).toEqual({ input: { id: task.id, state: 'complete' } })

    taskElement = getByTestId('task-card')
    taskListElement = getAllByTestId('kanban-list')[4]
    expect(taskListElement).toContainElement(taskElement)
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
    const { tasks, getByText, getAllByTestId } = await renderTodayView()

    const button = getByText(/added/i)
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
    const { tasks, getByText, getAllByTestId } = await renderTodayView()

    const button = getByText(/planned/i)
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
    const { tasks, getByText, getAllByTestId } = await renderTodayView()

    const button1 = getByText(/planned/i)
    fireEvent.click(button1)

    const button2 = getByText(/in progress/i)
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
    const { tasks, getByText, getAllByTestId } = await renderTodayView()

    const button = getByText(/blocked/i)
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
    const { tasks, getByText, getAllByTestId } = await renderTodayView()

    const button = getByText(/complete/i)
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
})

