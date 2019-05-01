import React from 'react'
import { shallow } from 'enzyme'
import TaskCard from '../../src/components/TaskCard'

describe('TaskCard', () => {
  test('renders task name from prop', () => {
    const task = {
      name: 'Test Task'
    }
    const root = shallow(
      <TaskCard task={task}/>
    )
    const nameElement = root.find('[data-test="task-name"]')
    expect(nameElement.text()).toEqual(task.name)
  })

  test('renders project name from prop', () => {
    const task = {
      name: 'Test Task',
      project: {
        name: 'Test Project'
      }
    }
    const root = shallow(
      <TaskCard task={task}/>
    )
    const projectElement = root.find('[data-test="task-project"]')
    expect(projectElement.text()).toEqual(task.project.name)
  })

  test('does not render project field if not set on task', () => {
    const task = {
      name: 'Test Task'
    }
    const root = shallow(
      <TaskCard task={task}/>
    )
    const projectElement = root.find('[data-test="task-project"]')
    expect(projectElement.exists()).toBe(false)
  })

  test('does not render project field if flag is set', () => {
    const task = {
      name: 'Test Task',
      project: {
        name: 'Test Project'
      }
    }
    const root = shallow(
      <TaskCard task={task} hideProject={true}/>
    )
    const projectElement = root.find('[data-test="task-project"]')
    expect(projectElement.exists()).toBe(false)
  })
})