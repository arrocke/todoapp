import React from 'react'
import { within, render } from 'react-testing-library'
import KanbanBoard from '../../../src/components/KanbanBoard'

it('displays a list for each task state', () => {
  const { getAllByTestId } = render(<KanbanBoard />)
  const listTitles = getAllByTestId('kanban-list-title')
    .map(el => el.textContent)
  const expected = ['Added', 'Planned', 'In Progress', 'Blocked', 'Complete']
  expect(listTitles).toEqual(expected)
})

it('displays tasks in the correct list', () => {
  const tasks = [
    {
      id: '1',
      name: 'Task One',
      state: 'added'
    },
    {
      id: '2',
      name: 'Task Two',
      state: 'planned'
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
    }
  ]
  const { getAllByTestId } = render(<KanbanBoard tasks={tasks} />)

  const list = getAllByTestId('kanban-list')

  expect(within(list[0]).findByText(tasks[0].name)).not.toBeUndefined()
  expect(within(list[1]).findByText(tasks[1].name)).not.toBeUndefined()
  expect(within(list[2]).findByText(tasks[2].name)).not.toBeUndefined()
  expect(within(list[3]).findByText(tasks[3].name)).not.toBeUndefined()
  expect(within(list[4]).findByText(tasks[4].name)).not.toBeUndefined()
})