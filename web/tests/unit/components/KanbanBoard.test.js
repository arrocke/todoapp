import React from 'react'
import { shallow } from 'enzyme'
import KanbanBoard from '../../../src/components/KanbanBoard'
import TaskList from '../../../src/components/TaskList'

describe('KanbanBoard', () => {
  let tasks

  beforeEach(() => {
    tasks = [
      {
        taskId: 1,
        state: 'backlog'
      },
      {
        taskId: 2,
        state: 'complete'
      },
      {
        taskId: 3,
        state: 'in-progress'
      },
      {
        taskId: 4,
        state: 'planned'
      },
      {
        taskId: 5,
        state: 'blocked'
      },
      {
        taskId: 6,
        state: 'in-progress'
      },
      {
        taskId: 7,
        state: 'planned'
      }
    ]
  })

  it('renders empty lists with no props', () => {
    const root = shallow(
      <KanbanBoard />
    )
    const listElements = root.find(TaskList)
    expect(listElements).toHaveLength(5)
  })

  it('renders list titles', () => {
    const root = shallow(
      <KanbanBoard />
    )
    const titles = root.find('[data-test="kanban-list-title"]')
    expect(titles).toHaveLength(5)
    expect(titles.at(0).text()).toEqual('Backlog')
    expect(titles.at(1).text()).toEqual('Planned')
    expect(titles.at(2).text()).toEqual('In Progress')
    expect(titles.at(3).text()).toEqual('Blocked')
    expect(titles.at(4).text()).toEqual('Complete')
  })

  it('renders backlog list from tasks with the backlog state', () => {
    const root = shallow(
      <KanbanBoard tasks={tasks} />
    )
    const list = root.find(TaskList).at(0)
    const filteredTasks = tasks.filter(({ state }) => state === 'backlog')
    expect(list.prop('tasks')).toEqual(filteredTasks)
  })

  it('renders planned list from tasks with the planned state', () => {
    const root = shallow(
      <KanbanBoard tasks={tasks} />
    )
    const list = root.find(TaskList).at(1)
    const filteredTasks = tasks.filter(({ state }) => state === 'planned')
    expect(list.prop('tasks')).toEqual(filteredTasks)
  })

  it('renders in progress list from tasks with the in-progress state', () => {
    const root = shallow(
      <KanbanBoard tasks={tasks} />
    )
    const list = root.find(TaskList).at(2)
    const filteredTasks = tasks.filter(({ state }) => state === 'in-progress')
    expect(list.prop('tasks')).toEqual(filteredTasks)
  })

  it('renders blocked list from tasks with the blocked state', () => {
    const root = shallow(
      <KanbanBoard tasks={tasks} />
    )
    const list = root.find(TaskList).at(3)
    const filteredTasks = tasks.filter(({ state }) => state === 'blocked')
    expect(list.prop('tasks')).toEqual(filteredTasks)
  })

  it('renders complete list from tasks with the complete state', () => {
    const root = shallow(
      <KanbanBoard tasks={tasks} />
    )
    const list = root.find(TaskList).at(4)
    const filteredTasks = tasks.filter(({ state }) => state === 'complete')
    expect(list.prop('tasks')).toEqual(filteredTasks)
  })

  it('passes hideProject to each TaskList', () => {
    const root = shallow(
      <KanbanBoard tasks={tasks} hideProject={true} />
    )
    const lists = root.find(TaskList)
    expect(lists).toHaveLength(5)
    for (let i = 0; i < 5; i++) {
      expect(lists.at(i).prop('hideProject')).toEqual(true)
    }
  })

  it('passes className prop to root element', () => {
    const root = shallow(
      <KanbanBoard tasks={tasks} className="mt-2"/>
    )
    expect(root.hasClass('mt-2')).toBe(true)
  })
})
