import React from 'react'
import { build, incrementingId, fake, oneOf } from 'test-data-bot'
import { within, render } from 'react-testing-library'
import KanbanBoard from '../../../src/components/KanbanBoard'

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

it('displays a list of added tasks.', () => {
  const { tasks, getAllByTestId } = renderKanbanBoard()
  const listElement = getAllByTestId('kanban-list')[0]

  const titleElement = within(listElement).getByTestId('kanban-list-title')
  expect(titleElement).toHaveTextContent(/added/i)

  const taskElements = within(listElement)
    .queryAllByTestId('task-name')
    .map(card => card.textContent)

  const expected = tasks
    .filter(({ state }) => state === 'added')
    .map(({ name }) => name)
  
  expect(taskElements).toEqual(expected)
})

it('displays a list of planned tasks.', () => {
  const { tasks, getAllByTestId } = renderKanbanBoard()
  const listElement = getAllByTestId('kanban-list')[1]

  const titleElement = within(listElement).getByTestId('kanban-list-title')
  expect(titleElement).toHaveTextContent(/planned/i)

  const taskElements = within(listElement)
    .queryAllByTestId('task-name')
    .map(card => card.textContent)

  const expected = tasks
    .filter(({ state }) => state === 'planned')
    .map(({ name }) => name)
  
  expect(taskElements).toEqual(expected)
})

it('displays a list of in progress tasks.', () => {
  const { tasks, getAllByTestId } = renderKanbanBoard()
  const listElement = getAllByTestId('kanban-list')[2]

  const titleElement = within(listElement).getByTestId('kanban-list-title')
  expect(titleElement).toHaveTextContent(/in progress/i)

  const taskElements = within(listElement)
    .queryAllByTestId('task-name')
    .map(card => card.textContent)

  const expected = tasks
    .filter(({ state }) => state === 'in-progress')
    .map(({ name }) => name)
  
  expect(taskElements).toEqual(expected)
})

it('displays a list of blocked tasks.', () => {
  const { tasks, getAllByTestId } = renderKanbanBoard()
  const listElement = getAllByTestId('kanban-list')[3]

  const titleElement = within(listElement).getByTestId('kanban-list-title')
  expect(titleElement).toHaveTextContent(/blocked/i)

  const taskElements = within(listElement)
    .queryAllByTestId('task-name')
    .map(card => card.textContent)

  const expected = tasks
    .filter(({ state }) => state === 'blocked')
    .map(({ name }) => name)
  
  expect(taskElements).toEqual(expected)
})

it('displays a list of completed tasks.', () => {
  const { tasks, getAllByTestId } = renderKanbanBoard()
  const listElement = getAllByTestId('kanban-list')[4]

  const titleElement = within(listElement).getByTestId('kanban-list-title')
  expect(titleElement).toHaveTextContent(/complete/i)

  const taskElements = within(listElement)
    .queryAllByTestId('task-name')
    .map(card => card.textContent)

  const expected = tasks
    .filter(({ state }) => state === 'complete')
    .map(({ name }) => name)
  
  expect(taskElements).toEqual(expected)
})
