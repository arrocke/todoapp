import React from 'react'
import { build, incrementingId, fake, oneOf } from 'test-data-bot'
import { within, render, fireEvent } from 'react-testing-library'
import KanbanBoard from '../../../src/components/KanbanBoard'
import { resizeWindow } from '../utils'

const taskBuilder = build('Task')
  .fields({
    id: incrementingId(),
    name: fake(f => f.lorem.word()),
    state: oneOf('added', 'planned', 'in-progress', 'blocked', 'complete')
  })
  .map(task => ({
    ...task,
    id: task.id.toString()
  }))

const renderKanbanBoard = ({
  tasks = new Array(15).fill().map(() => taskBuilder())
} = {}) =>
  ({
    ...render(<KanbanBoard tasks={tasks} />),
    tasks
  })

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

  it('displays a list of added tasks.', () => {
    const { tasks, getAllByTestId } = renderKanbanBoard()
    const listElement = getAllByTestId('kanban-list')[0]

    testKanbanList({
      el: listElement,
      state: 'added',
      title: /added/i,
      tasks
    })
  })

  it('displays a list of planned tasks.', () => {
    const { tasks, getAllByTestId } = renderKanbanBoard()
    const listElement = getAllByTestId('kanban-list')[1]

    testKanbanList({
      el: listElement,
      state: 'planned',
      title: /planned/i,
      tasks
    })
  })

  it('displays a list of in progress tasks.', () => {
    const { tasks, getAllByTestId } = renderKanbanBoard()
    const listElement = getAllByTestId('kanban-list')[2]

    testKanbanList({
      el: listElement,
      state: 'in-progress',
      title: /in progress/i,
      tasks
    })
  })

  it('displays a list of blocked tasks.', () => {
    const { tasks, getAllByTestId } = renderKanbanBoard()
    const listElement = getAllByTestId('kanban-list')[3]

    testKanbanList({
      el: listElement,
      state: 'blocked',
      title: /blocked/i,
      tasks
    })
  })

  it('displays a list of completed tasks.', () => {
    const { tasks, getAllByTestId } = renderKanbanBoard()
    const listElement = getAllByTestId('kanban-list')[4]

    testKanbanList({
      el: listElement,
      state: 'complete',
      title: /complete/i,
      tasks
    })
  })
})

describe('on narrow screens', () => {
  beforeEach(() => {
    resizeWindow(640, 800)
  })

  it('displays only the in progress tasks list by default', () => {
    const { tasks, getAllByTestId } = renderKanbanBoard()

    const listElements = getAllByTestId('kanban-list')
    expect(listElements).toHaveLength(1)

    testKanbanList({
      el: listElements[0],
      state: 'in-progress',
      title: /in progress/i,
      tasks
    })
  })

  it('displays only the added tasks after clicking the added button.', () => {
    const { tasks, getByText, getAllByTestId } = renderKanbanBoard()

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

  it('displays only the planned tasks after clicking the planned button.', () => {
    const { tasks, getByText, getAllByTestId } = renderKanbanBoard()

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

  it('displays only the in progress tasks after clicking the in progress button.', () => {
    const { tasks, getByText, getAllByTestId } = renderKanbanBoard()

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

  it('displays only the blocked tasks after clicking the blocked button.', () => {
    const { tasks, getByText, getAllByTestId } = renderKanbanBoard()

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

  it('displays only the complete tasks after clicking the complete button.', () => {
    const { tasks, getByText, getAllByTestId } = renderKanbanBoard()

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
