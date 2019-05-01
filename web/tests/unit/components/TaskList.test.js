import React from 'react'
import { shallow } from 'enzyme'
import TaskList from '../../../src/components/TaskList'
import TaskCard from '../../../src/components/TaskCard'

describe('TaskList', () => {
  let tasks

  beforeEach(() => {
    tasks = [
      {
        taskId: 1,
        name: 'Task One'
      },
      {
        taskId: 2,
        name: 'Task Two'
      },
      {
        taskId: 3,
        name: 'Task Three'
      }
    ]
  })

  test('renders empty list with no props', () => {
    const root = shallow(
      <TaskList />
    )
    const listElements = root.find('li')
    expect(listElements).toHaveLength(0)
  })

  test('renders a TaskCard for each task', () => {
    const root = shallow(
      <TaskList tasks={tasks} />
    )
    const listElements = root.find(TaskCard)
    expect(listElements).toHaveLength(tasks.length)
    for (let i in tasks) {
      expect(listElements.at(i).prop('task')).toEqual(tasks[i])
    }
  })

  test('sets key for each TaskCard', () => {
    const root = shallow(
      <TaskList tasks={tasks} />
    )
    const listElements = root.find('li')
    expect(listElements).toHaveLength(tasks.length)
    for (let i in tasks) {
      expect(listElements.at(i).key()).toEqual(tasks[i].taskId.toString())
    }
  })

  test('passes hideProject to each TaskCard', () => {
    const root = shallow(
      <TaskList tasks={tasks} hideProject={true} />
    )
    const listElements = root.find(TaskCard)
    expect(listElements).toHaveLength(tasks.length)
    for (let i in tasks) {
      expect(listElements.at(i).prop('hideProject')).toEqual(true)
    }
  })
})